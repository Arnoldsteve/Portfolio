"use client";

import { useEffect, useMemo, useReducer, useRef, useState, type FormEvent } from "react";
import { booking as b, person } from "@/content/site";
import { bookingInput, MAX_AHEAD_DAYS, type Booked, type CallId } from "@/lib/booking-schema";
import { addDays, daysBetween, todayIn } from "@/lib/dates";
import { HONEYPOT } from "@/lib/honeypot";
import { choiceClass, FormError } from "@/components/ui/form";
import { ButtonLink } from "@/components/ui/button";
import { Container, Label, MarkerList } from "@/components/ui/primitives";
import { useRadioGroup } from "@/components/ui/use-radio-group";
import { cn } from "@/lib/utils";
import { bookingReducer, initialBooking } from "./booking-state";
import { BookedCard, DayPicker, DetailsForm, TimePicker, dayParts, timeLabel } from "./booking-parts";

const callIds = b.calls.map((c) => c.id) as CallId[];
const WINDOW = 14; // days shown at once

const failureNotice: Record<string, string> = { taken: b.errors.taken, unknown: b.errors.unknown, rate_limited: b.errors.rateLimited };

/**
 * Native booking, in the site's design: call → day → time → details → booked.
 * Cal.com runs behind it through /api/booking (slots and booking), so visitors never leave the page.
 */
export function Booking() {
  const [s, dispatch] = useReducer(bookingReducer, callIds[0], initialBooking);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  // Time zone and "today" are only known in the browser.
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    dispatch({ type: "init", tz, today: todayIn(tz) });
  }, []);

  // Only ask Cal for times once the section is near the screen. Arriving at /contact#book scrolls it
  // into view, which triggers this too.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setActive(true), { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Load the visible window. Aborting stale requests means a slow answer can never overwrite a newer one.
  useEffect(() => {
    if (!active || !s.tz || !s.from) return;
    const controller = new AbortController();
    dispatch({ type: "slotsLoading" });
    const qs = new URLSearchParams({ call: s.call, start: s.from, end: addDays(s.from, WINDOW - 1), tz: s.tz });
    fetch(`/api/booking/slots?${qs}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json: { days: Record<string, string[]> }) => dispatch({ type: "slotsLoaded", days: json.days }))
      .catch(() => controller.signal.aborted || dispatch({ type: "slotsFailed" }));
    return () => controller.abort();
  }, [active, s.call, s.from, s.tz, s.reload]);

  const radioProps = useRadioGroup(callIds, (call) => dispatch({ type: "pickCall", call }));
  const dates = useMemo(() => (s.from ? Array.from({ length: WINDOW }, (_, i) => addDays(s.from!, i)) : []), [s.from]);
  const call = b.calls.find((c) => c.id === s.call)!;
  const canEarlier = Boolean(s.today && s.from && s.from > s.today);
  const canLater = Boolean(s.today && s.from && daysBetween(s.today, addDays(s.from, 2 * WINDOW - 1)) <= MAX_AHEAD_DAYS);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!s.time || !s.tz) return;
    const form = new FormData(e.currentTarget);
    // The spam trap is not validated here; only the server judges it.
    const parsed = bookingInput.safeParse({ ...Object.fromEntries(form), call: s.call, start: s.time, timeZone: s.tz });
    if (!parsed.success) {
      const errors: { name?: string; email?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email") errors[key] ??= issue.message;
      }
      // Anything else invalid is our bug, not the visitor's: say so instead of doing nothing.
      return Object.keys(errors).length ? dispatch({ type: "invalid", errors }) : dispatch({ type: "failed", notice: b.errors.failed });
    }
    dispatch({ type: "submitting" });
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT]: form.get(HONEYPOT) ?? "" }),
      });
      if (res.ok) return dispatch({ type: "booked", booked: { ...((await res.json()) as Booked), email: parsed.data.email } });
      const { error } = await res.json().catch(() => ({ error: "failed" }));
      dispatch({ type: "failed", notice: failureNotice[error] ?? b.errors.failed, dropTime: error === "taken", reload: error === "taken" });
    } catch {
      // No answer at all: the booking may exist, so don't invite a blind retry.
      dispatch({ type: "failed", notice: b.errors.unknown });
    }
  }

  const summary = s.time && s.tz && s.date ? `${call.title} · ${call.minutes} ${b.minutes} · ${dayParts(s.date).long}, ${timeLabel(s.time, s.tz)}` : "";

  return (
    <Container as="section" ref={sectionRef} id="book" aria-labelledby="book-heading" className="pt-14 sm:pt-24">
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

          {s.status !== "booked" && (
            <div role="radiogroup" aria-label={b.pickLabel} className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {b.calls.map((c, i) => {
                const on = c.id === s.call;
                return (
                  <button
                    key={c.id}
                    {...radioProps(i)}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => dispatch({ type: "pickCall", call: c.id })}
                    className={choiceClass(on, "grid content-start gap-1.5 p-4 sm:gap-2 sm:p-6", "surface")}
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

        <div className="mt-6 border-t border-line pt-6 sm:mt-8 sm:pt-8">
          {s.status === "booked" && s.booked && s.tz ? (
            <BookedCard booked={s.booked} fallbackStart={s.time} tz={s.tz} callTitle={call.title} onAnother={() => dispatch({ type: "reset" })} />
          ) : s.slotsError ? (
            <div className="grid justify-items-start gap-3">
              <p role="alert" className="m-0 text-ink-muted">
                {b.errors.slots}
              </p>
              <ButtonLink href={`${person.links.booking}/${s.call}`} variant="primary">
                {b.external}
              </ButtonLink>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              {s.notice && !s.time && <FormError className="rounded-md border border-danger px-4 py-3 lg:col-span-2">{s.notice}</FormError>}
              <DayPicker
                dates={dates}
                days={s.days}
                date={s.date}
                canEarlier={canEarlier}
                canLater={canLater}
                onPick={(date) => dispatch({ type: "pickDate", date })}
                onEarlier={() => s.from && dispatch({ type: "page", from: addDays(s.from, -WINDOW) })}
                onLater={() => s.from && dispatch({ type: "page", from: addDays(s.from, WINDOW) })}
              />
              <TimePicker
                date={s.date}
                times={(s.date && s.days?.[s.date]) || []}
                time={s.time}
                tz={s.tz}
                loading={active && !s.days}
                onPick={(time) => dispatch({ type: "pickTime", time })}
              />
              {s.time && (
                <DetailsForm
                  summary={summary}
                  errors={s.errors}
                  notice={s.notice}
                  submitting={s.status === "submitting"}
                  onChangeTime={() => dispatch({ type: "pickTime", time: null })}
                  onSubmit={onSubmit}
                />
              )}
            </div>
          )}
        </div>

        <a
          href={`${person.links.booking}/${s.call}`}
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
