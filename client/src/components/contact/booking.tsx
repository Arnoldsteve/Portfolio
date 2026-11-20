"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { booking as b, person } from "@/content/site";
import { bookingInput, type Booked, type CallId } from "@/lib/booking-schema";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container, Label, MarkerList } from "@/components/ui/primitives";
import { useRadioGroup } from "@/components/ui/use-radio-group";
import { cn } from "@/lib/utils";

const callIds = b.calls.map((c) => c.id) as CallId[];
const WINDOW = 14; // days shown at once

type Status = "idle" | "submitting" | "booked";

// Dates are YYYY-MM-DD in the visitor's time zone; arithmetic is done at UTC noon to dodge DST.
const dateIn = (instant: Date, tz: string) => new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(instant);
const todayIn = (tz: string) => dateIn(new Date(), tz);
const addDays = (date: string, n: number) => new Date(Date.parse(`${date}T12:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
const dayParts = (date: string) => {
  const d = new Date(`${date}T12:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString(undefined, { ...o, timeZone: "UTC" });
  return { weekday: f({ weekday: "short" }), day: f({ day: "numeric" }), month: f({ month: "short" }), long: f({ weekday: "long", day: "numeric", month: "long" }) };
};
const timeLabel = (iso: string, tz: string) => new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", timeZone: tz });

const inputClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-3 text-base text-ink placeholder:text-ink-faint hover:border-ink-faint aria-[invalid=true]:border-pending";

/**
 * Native booking, in the site's design: call → day → time → details → booked.
 * Cal.com runs behind it through /api/booking (slots and booking), so visitors never leave the page.
 */
export function Booking() {
  const [call, setCall] = useState<CallId>(callIds[0]);
  const [tz, setTz] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [days, setDays] = useState<Record<string, string[]> | null>(null);
  const [slotsError, setSlotsError] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [formError, setFormError] = useState("");
  const [booked, setBooked] = useState<(Booked & { email: string }) | null>(null);

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTz(zone);
    setFrom(todayIn(zone));
  }, []);

  const load = useCallback(async () => {
    if (!tz || !from) return;
    setDays(null);
    setSlotsError(false);
    try {
      const qs = new URLSearchParams({ call, start: from, end: addDays(from, WINDOW - 1), tz });
      const res = await fetch(`/api/booking/slots?${qs}`);
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as { days: Record<string, string[]> };
      setDays(json.days);
      // Keep the chosen day if it still has times, otherwise jump to the first free day.
      setDate((current) => (current && json.days[current]?.length ? current : (Object.keys(json.days).sort().find((d) => json.days[d].length) ?? null)));
    } catch {
      setSlotsError(true);
    }
  }, [call, from, tz]);

  useEffect(() => {
    load();
  }, [load]);

  const pickCall = (id: CallId) => {
    if (id === call) return;
    setCall(id);
    setTime(null);
  };
  const radioProps = useRadioGroup(callIds, pickCall);

  const dates = useMemo(() => (from ? Array.from({ length: WINDOW }, (_, i) => addDays(from, i)) : []), [from]);
  const selectedCall = b.calls.find((c) => c.id === call)!;
  const times = (date && days?.[date]) || [];
  const canGoEarlier = tz && from && from > todayIn(tz);
  const anyFree = days && Object.values(days).some((t) => t.length);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!time || !tz) return;
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = bookingInput.safeParse({ ...form, call, start: time, timeZone: tz });
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email") next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setFormError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (res.ok) {
        setBooked({ ...((await res.json()) as Booked), email: parsed.data.email });
        setStatus("booked");
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (json.error === "taken") {
        setFormError(b.errors.taken);
        setTime(null);
        load();
      } else {
        setFormError(b.errors.failed);
      }
    } catch {
      setFormError(b.errors.failed);
    }
    setStatus("idle");
  }

  const reset = () => {
    setBooked(null);
    setTime(null);
    setStatus("idle");
    load();
  };

  const fieldProps = (name: "name" | "email") => ({
    name,
    id: `b-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `b-${name}-error` : name === "email" ? "b-email-hint" : undefined,
  });

  return (
    <Container as="section" id="book" aria-labelledby="book-heading" className="pt-14 sm:pt-24">
      <div className="rounded-xl border border-line bg-surface p-4 sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10">
          <div>
            <Label>{b.eyebrow}</Label>
            <h2 id="book-heading" className="mt-2 text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] sm:mt-3 sm:text-[32px]">
              {b.heading}
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted sm:text-base">{b.text}</p>
            <MarkerList items={b.points} className="mt-4 hidden text-[15px] text-ink-muted sm:grid" />
          </div>

          {status !== "booked" && (
            <div role="radiogroup" aria-label={b.pickLabel} className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {b.calls.map((c, i) => {
                const on = c.id === call;
                return (
                  <button
                    key={c.id}
                    {...radioProps(i)}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => pickCall(c.id)}
                    className={cn(
                      "grid cursor-pointer content-start gap-1.5 rounded-lg p-4 text-left text-ink sm:gap-2 sm:p-6",
                      on ? "border-2 border-jacaranda bg-jacaranda-mist p-[15px] sm:p-[23px]" : "border border-line bg-paper hover:border-ink-faint",
                    )}
                  >
                    <span className={cn("font-mono text-[28px] leading-none font-medium sm:text-[40px]", on ? "text-jacaranda-deep" : "text-ink")}>
                      {c.minutes}
                      <span className="ml-1 text-xs tracking-[0.06em] uppercase">{b.minutes}</span>
                    </span>
                    <span className="mt-1 font-semibold sm:text-lg">{c.title}</span>
                    <span className={cn("text-[13px] leading-[1.5] sm:text-[15px]", on ? "text-ink" : "text-ink-muted")}>{c.text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-line pt-6 sm:mt-8 sm:pt-8" aria-live="polite">
          {status === "booked" && booked && tz ? (
            <div className="grid justify-items-start gap-3">
              <Label as="span" className="text-acacia">
                {b.bookedLabel}
              </Label>
              <p className="m-0 text-[22px] leading-[1.25] font-semibold tracking-[-0.02em] sm:text-[28px]">
                {b.bookedHeading} {selectedCall.title} · {dayParts(dateIn(new Date(booked.start), tz)).long},{" "}
                {timeLabel(booked.start, tz)}
              </p>
              <p className="m-0 text-ink-muted">
                {b.bookedText} <strong className="font-semibold text-ink">{booked.email}</strong>.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {booked.meetingUrl && (
                  <ButtonLink href={booked.meetingUrl} variant="primary">
                    {b.joinCall}
                  </ButtonLink>
                )}
                <Button onClick={reset}>{b.bookAnother}</Button>
              </div>
            </div>
          ) : slotsError ? (
            <div className="grid justify-items-start gap-3">
              <p className="m-0 text-ink-muted">{b.errors.slots}</p>
              <ButtonLink href={`${person.links.booking}/${call}`} variant="primary">
                {b.external}
              </ButtonLink>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              {formError && !time && (
                <p role="alert" className="m-0 rounded-md border border-ochre bg-ochre-soft px-4 py-3 text-[15px] text-ink lg:col-span-2">
                  {formError}
                </p>
              )}
              {/* Day */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Label as="h3" className="text-ink-faint">
                    {b.dayLabel}
                  </Label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label={b.earlier}
                      disabled={!canGoEarlier}
                      onClick={() => from && setFrom(addDays(from, -WINDOW))}
                      className="flex size-11 items-center justify-center rounded-md border border-line bg-paper text-ink hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={b.later}
                      disabled={!from}
                      onClick={() => from && setFrom(addDays(from, WINDOW))}
                      className="flex size-11 items-center justify-center rounded-md border border-line bg-paper text-ink hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <ul className="m-0 mt-3 grid list-none grid-cols-4 gap-2 p-0 sm:grid-cols-7">
                  {dates.map((d) => {
                    const free = days?.[d]?.length ?? 0;
                    const on = d === date;
                    const p = dayParts(d);
                    return (
                      <li key={d}>
                        <button
                          type="button"
                          disabled={!days || !free}
                          aria-pressed={on}
                          onClick={() => {
                            setDate(d);
                            setTime(null);
                          }}
                          className={cn(
                            "grid min-h-16 w-full place-content-center justify-items-center rounded-md border text-center leading-tight",
                            on
                              ? "border-jacaranda bg-jacaranda text-on-jacaranda"
                              : free
                                ? "cursor-pointer border-line bg-paper text-ink hover:border-jacaranda"
                                : "cursor-not-allowed border-transparent text-ink-faint",
                            !days && "animate-pulse bg-sunken",
                          )}
                        >
                          <span className="font-mono text-[11px] tracking-[0.06em] uppercase">{p.weekday} </span>
                          <span className="text-lg font-semibold">{p.day} </span>
                          <span className="text-[11px]">{p.month}</span>
                          {days && !free && <span className="sr-only"> — {b.noTimes}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {days && !anyFree && <p className="mt-3 text-sm text-ink-muted">{b.noDays}</p>}
              </div>

              {/* Time */}
              <div>
                <Label as="h3" className="text-ink-faint">
                  {b.timeLabel}
                </Label>
                <p className="mt-1 text-sm text-ink-muted">
                  {date ? dayParts(date).long : " "}
                  {tz && (
                    <span className="text-ink-faint">
                      {" "}
                      · {b.timesIn} {tz.replace(/_/g, " ")}
                    </span>
                  )}
                </p>
                {!days ? (
                  <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                    <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                    {b.loading}
                  </p>
                ) : date && times.length === 0 ? (
                  <p className="mt-4 text-sm text-ink-muted">{b.noTimes}</p>
                ) : (
                  <ul className="m-0 mt-3 grid max-h-[268px] list-none grid-cols-3 gap-2 overflow-y-auto p-0 sm:grid-cols-4">
                    {times.map((t) => {
                      const on = t === time;
                      return (
                        <li key={t}>
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              setTime(t);
                              setFormError("");
                            }}
                            className={cn(
                              "min-h-11 w-full cursor-pointer rounded-md border text-[15px] font-semibold",
                              on ? "border-jacaranda bg-jacaranda text-on-jacaranda" : "border-line bg-paper text-ink hover:border-jacaranda",
                            )}
                          >
                            {tz && timeLabel(t, tz)}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Details: appear once a time is chosen */}
              {time && tz && (
                <form noValidate onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-line bg-paper p-4 sm:p-6 lg:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="m-0 font-semibold">
                      {selectedCall.title} · {selectedCall.minutes} {b.minutes} ·{" "}
                      <span className="text-jacaranda">
                        {date && dayParts(date).long}, {timeLabel(time, tz)}
                      </span>
                    </p>
                    <button type="button" onClick={() => setTime(null)} className="min-h-11 text-sm font-semibold text-jacaranda underline-offset-3 hover:underline">
                      {b.change}
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label htmlFor="b-name" className="grid content-start gap-1.5 text-sm font-medium">
                      {b.nameLabel}
                      <input {...fieldProps("name")} type="text" autoComplete="name" className={inputClass} />
                      {errors.name && (
                        <span id="b-name-error" className="font-normal text-pending">
                          {errors.name}
                        </span>
                      )}
                    </label>
                    <label htmlFor="b-email" className="grid content-start gap-1.5 text-sm font-medium">
                      {b.emailLabel}
                      <input {...fieldProps("email")} type="email" autoComplete="email" className={inputClass} />
                      {errors.email ? (
                        <span id="b-email-error" className="font-normal text-pending">
                          {errors.email}
                        </span>
                      ) : (
                        <span id="b-email-hint" className="font-normal text-ink-faint">
                          {b.emailHint}
                        </span>
                      )}
                    </label>
                  </div>
                  <label htmlFor="b-notes" className="grid content-start gap-1.5 text-sm font-medium">
                    {b.notesLabel}
                    <textarea id="b-notes" name="notes" rows={3} placeholder={b.notesPlaceholder} className={cn(inputClass, "resize-y")} />
                  </label>
                  <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  {formError && (
                    <p role="alert" className="m-0 text-[15px] text-pending">
                      {formError}
                    </p>
                  )}
                  <Button type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto sm:justify-self-start">
                    {status === "submitting" && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
                    {status === "submitting" ? b.confirming : b.confirm}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>

        <a
          href={`${person.links.booking}/${call}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 ml-auto flex min-h-11 w-fit items-center text-sm font-semibold text-ink-muted underline-offset-3 hover:text-jacaranda hover:underline"
        >
          {b.external}
        </a>
      </div>
    </Container>
  );
}
