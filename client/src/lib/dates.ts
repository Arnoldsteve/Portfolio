/**
 * Calendar-date helpers for booking. A "date" is YYYY-MM-DD in some time zone; arithmetic runs at
 * UTC noon so daylight-saving changes can never shift a day.
 */

const DAY_MS = 86_400_000;

/** The calendar date of `instant` in time zone `tz`. Throws RangeError for an invalid instant. */
export function dateIn(instant: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(instant);
}

export function todayIn(tz: string): string {
  return dateIn(new Date(), tz);
}

export function addDays(date: string, n: number): string {
  return new Date(Date.parse(`${date}T12:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from `a` to `b` (negative if b is earlier). */
export function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / DAY_MS);
}

export function isValidInstant(iso: string): boolean {
  return !Number.isNaN(Date.parse(iso));
}
