import { z } from "zod";
import { booking } from "@/content/site";

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

/** GET /api/booking/slots query. */
export const slotsQuery = z.object({
  call: z.enum(callIds),
  start: z.string().regex(DATE),
  end: z.string().regex(DATE),
  tz: z.string().max(64).refine(isTimeZone),
});

/** POST /api/booking body; also checked in the browser before sending. */
export const bookingInput = z.object({
  call: z.enum(callIds),
  start: z.iso.datetime({ offset: true }),
  timeZone: z.string().max(64).refine(isTimeZone),
  name: z.string().trim().min(1, booking.errors.name).max(120, booking.errors.name),
  email: z.email(booking.errors.email),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  // Honeypot: hidden from people, filled by bots.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingInput>;

/** What the booking API returns on success. */
export type Booked = { uid: string; start: string; meetingUrl?: string };
