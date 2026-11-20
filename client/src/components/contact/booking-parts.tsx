"use client";

import type { FormEvent } from "react";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { booking as b } from "@/content/site";
import { Button, ButtonLink } from "@/components/ui/button";
import { FieldError, FormError, Honeypot, inputClass, labelClass } from "@/components/ui/form";
import { Label } from "@/components/ui/primitives";
import { dateIn, isValidInstant } from "@/lib/dates";
import { cn } from "@/lib/utils";
import type { BookingState } from "./booking-state";

/** Locale-aware labels for a YYYY-MM-DD date (formatted at UTC noon so it never shifts). */
export function dayParts(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString(undefined, { ...o, timeZone: "UTC" });
  return { weekday: f({ weekday: "short" }), day: f({ day: "numeric" }), month: f({ month: "short" }), long: f({ weekday: "long", day: "numeric", month: "long" }) };
}

export const timeLabel = (iso: string, tz: string) => new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", timeZone: tz });

const pagerClass =
  "flex size-11 items-center justify-center rounded-md border border-line bg-paper text-ink hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-40";

export function DayPicker({
  dates,
  days,
  date,
  canEarlier,
  canLater,
  onPick,
  onEarlier,
  onLater,
}: {
  dates: string[];
  days: BookingState["days"];
  date: string | null;
  canEarlier: boolean;
  canLater: boolean;
  onPick: (d: string) => void;
  onEarlier: () => void;
  onLater: () => void;
}) {
  const anyFree = days && Object.values(days).some((t) => t.length);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Label as="h3" className="text-ink-faint">
          {b.dayLabel}
        </Label>
        <div className="flex gap-1">
          <button type="button" aria-label={b.earlier} disabled={!canEarlier} onClick={onEarlier} className={pagerClass}>
            <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" aria-label={b.later} title={canLater ? undefined : b.laterLimit} disabled={!canLater} onClick={onLater} className={pagerClass}>
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
                onClick={() => onPick(d)}
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
                <span className="font-mono text-xs tracking-[0.06em] uppercase">{p.weekday} </span>
                <span className="text-lg font-semibold">{p.day} </span>
                <span className="text-xs">{p.month}</span>
                {days && !free && <span className="sr-only"> — {b.noTimes}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {days && !anyFree && <p className="mt-3 text-sm text-ink-muted">{canLater ? b.noDays : b.laterLimit}</p>}
    </div>
  );
}

export function TimePicker({
  date,
  times,
  time,
  tz,
  loading,
  onPick,
}: {
  date: string | null;
  times: string[];
  time: string | null;
  tz: string | null;
  loading: boolean;
  onPick: (t: string) => void;
}) {
  return (
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
      {loading ? (
        <p role="status" className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
          <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          {b.loading}
        </p>
      ) : date && times.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">{b.noTimes}</p>
      ) : (
        <ul className="m-0 mt-3 grid max-h-67 list-none grid-cols-3 gap-2 overflow-y-auto p-0 sm:grid-cols-4">
          {times.map((t) => {
            const on = t === time;
            return (
              <li key={t}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onPick(t)}
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
  );
}

export function DetailsForm({
  summary,
  errors,
  notice,
  submitting,
  onChangeTime,
  onSubmit,
}: {
  summary: string;
  errors: BookingState["errors"];
  notice: string;
  submitting: boolean;
  onChangeTime: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const fieldProps = (name: "name" | "email") => ({
    name,
    id: `b-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `b-${name}-error` : name === "email" ? "b-email-hint" : undefined,
  });
  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-line bg-paper p-4 sm:p-6 lg:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 font-semibold text-jacaranda">{summary}</p>
        <button type="button" onClick={onChangeTime} className="min-h-11 text-sm font-semibold text-jacaranda underline-offset-3 hover:underline">
          {b.change}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="b-name" className={labelClass}>
          {b.nameLabel}
          <input {...fieldProps("name")} type="text" autoComplete="name" className={inputClass} />
          <FieldError id="b-name-error">{errors.name}</FieldError>
        </label>
        <label htmlFor="b-email" className={labelClass}>
          {b.emailLabel}
          <input {...fieldProps("email")} type="email" autoComplete="email" className={inputClass} />
          {errors.email ? (
            <FieldError id="b-email-error">{errors.email}</FieldError>
          ) : (
            <span id="b-email-hint" className="font-normal text-ink-faint">
              {b.emailHint}
            </span>
          )}
        </label>
      </div>
      <label htmlFor="b-notes" className={labelClass}>
        {b.notesLabel}
        <textarea id="b-notes" name="notes" rows={3} placeholder={b.notesPlaceholder} className={cn(inputClass, "resize-y")} />
      </label>
      <Honeypot />
      <FormError>{notice}</FormError>
      <Button type="submit" variant="primary" disabled={submitting} className="w-full sm:w-auto sm:justify-self-start">
        {submitting && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
        {submitting ? b.confirming : b.confirm}
      </Button>
    </form>
  );
}

export function BookedCard({
  booked,
  fallbackStart,
  tz,
  callTitle,
  onAnother,
}: {
  booked: NonNullable<BookingState["booked"]>;
  fallbackStart: string | null;
  tz: string;
  callTitle: string;
  onAnother: () => void;
}) {
  // Never trust the response blindly: an unparseable start falls back to the time the visitor picked.
  const start = isValidInstant(booked.start) ? booked.start : fallbackStart;
  return (
    <div role="status" className="grid justify-items-start gap-3">
      <Label as="span" className="text-acacia">
        {b.bookedLabel}
      </Label>
      <p className="m-0 text-[22px] leading-[1.25] font-semibold tracking-[-0.02em] sm:text-[28px]">
        {b.bookedHeading} {callTitle}
        {start && (
          <>
            {" · "}
            {dayParts(dateIn(new Date(start), tz)).long}, {timeLabel(start, tz)}
          </>
        )}
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
        <Button onClick={onAnother}>{b.bookAnother}</Button>
      </div>
    </div>
  );
}
