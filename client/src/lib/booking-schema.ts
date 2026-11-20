import { z } from "zod";
import { booking } from "@/content/site";
import { daysBetween, todayIn } from "@/lib/dates";

export const callIds = booking.calls.map((c) => c.id) as [string, ...string[]];
export type CallId = (typeof booking.calls)[number]["id"];

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** Booking window: how many days one slots request may span, and how far ahead anyone can book. */
export const MAX_RANGE_DAYS = 31;
export const MAX_AHEAD_DAYS = 90;

/** GET /api/booking/slots query: a forward range of at most MAX_RANGE_DAYS, within MAX_AHEAD_DAYS. */
export const slotsQuery = z
  .object({
    call: z.enum(callIds),
    start: z.string().regex(DATE),
    end: z.string().regex(DATE),
    tz: z.string().max(64).refine(isTimeZone),
  })
  .refine((q) => {
    // Zod still runs this after a field check fails; an invalid zone is already reported there.
    if (!isTimeZone(q.tz)) return true;
    const span = daysBetween(q.start, q.end);
    const today = todayIn(q.tz);
    return span >= 0 && span < MAX_RANGE_DAYS && daysBetween(today, q.start) >= -1 && daysBetween(today, q.end) <= MAX_AHEAD_DAYS;
  }, "range");

/** POST /api/booking body; also checked in the browser before sending. The spam trap is server-side only (lib/honeypot). */
export const bookingInput = z.object({
  call: z.enum(callIds),
  start: z.iso.datetime({ offset: true }),
  timeZone: z.string().max(64).refine(isTimeZone),
  name: z.string().trim().min(1, booking.errors.name).max(120, booking.errors.name).regex(/^[^\r\n]*$/, booking.errors.name),
  email: z.email(booking.errors.email),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingInput>;

/** What the booking API returns on success. */
export type Booked = { uid: string; start: string; meetingUrl?: string };
