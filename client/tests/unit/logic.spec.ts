import { expect, test } from "@playwright/test";
import { contactRoutes, booking } from "@/content/site";
import { posts, readingMinutes } from "@/content/posts";
import { addDays, dateIn, daysBetween, isValidInstant } from "@/lib/dates";
import { takeToken } from "@/lib/rate-limit";
import { bookingInput, MAX_AHEAD_DAYS, MAX_RANGE_DAYS, slotsQuery } from "@/lib/booking-schema";
import { contactSchema } from "@/lib/contact-schema";
import { HONEYPOT, isTrapped } from "@/lib/honeypot";
import { edgePoint } from "@/components/work/diagram";
import { bookingReducer, initialBooking } from "@/components/contact/booking-state";

test.describe("dates", () => {
  test("adds days across month and year ends", () => {
    expect(addDays("2026-11-30", 1)).toBe("2026-12-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  test("daylight-saving changes never shift a calendar day", () => {
    // US clocks change on 8 Mar 2026 and 1 Nov 2026; Europe on 29 Mar and 25 Oct.
    for (const d of ["2026-03-07", "2026-03-28", "2026-10-24", "2026-10-31"]) {
      expect(daysBetween(d, addDays(d, 1))).toBe(1);
    }
  });

  test("the calendar date of an instant depends on the time zone", () => {
    const lateUtc = new Date("2026-11-20T22:30:00Z");
    expect(dateIn(lateUtc, "Africa/Nairobi")).toBe("2026-11-21");
    expect(dateIn(lateUtc, "America/Los_Angeles")).toBe("2026-11-20");
  });

  test("detects unparseable instants", () => {
    expect(isValidInstant("2026-11-20T09:00:00+03:00")).toBe(true);
    expect(isValidInstant("")).toBe(false);
  });
});

test.describe("rate limit", () => {
  test("allows a burst up to capacity, then refills over time", () => {
    const key = `unit-${Math.random()}`;
    const limit = { capacity: 3, refillPerMinute: 1 };
    const t0 = 1_000_000;
    expect([1, 2, 3].map(() => takeToken(key, limit, t0))).toEqual([true, true, true]);
    expect(takeToken(key, limit, t0)).toBe(false);
    expect(takeToken(key, limit, t0 + 30_000)).toBe(false); // half a token
    expect(takeToken(key, limit, t0 + 61_000)).toBe(true);
  });
});

test.describe("slots query", () => {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" }).format(new Date());
  const q = (start: string, end: string, extra = {}) => ({ call: "30min", start, end, tz: "Africa/Nairobi", ...extra });

  test("accepts a forward range inside the window", () => {
    expect(slotsQuery.safeParse(q(today, addDays(today, 13))).success).toBe(true);
  });
  test("rejects reversed, too-long and too-far ranges, and bad zones", () => {
    expect(slotsQuery.safeParse(q(addDays(today, 5), today)).success).toBe(false);
    expect(slotsQuery.safeParse(q(today, addDays(today, MAX_RANGE_DAYS))).success).toBe(false);
    expect(slotsQuery.safeParse(q(addDays(today, MAX_AHEAD_DAYS - 5), addDays(today, MAX_AHEAD_DAYS + 1))).success).toBe(false);
    expect(slotsQuery.safeParse(q(today, today, { tz: "Mars/Olympus" })).success).toBe(false);
    expect(slotsQuery.safeParse(q(today, today, { call: "15min" })).success).toBe(false);
  });
});

test.describe("form schemas", () => {
  const base = { call: "30min", start: "2026-11-23T07:00:00.000Z", timeZone: "Africa/Nairobi", name: "Wanjiku", email: "w@example.com" };

  test("booking: names are single-line, emails must be valid", () => {
    expect(bookingInput.safeParse(base).success).toBe(true);
    expect(bookingInput.safeParse({ ...base, name: "W\nBcc: x" }).success).toBe(false);
    expect(bookingInput.safeParse({ ...base, email: "nope" }).success).toBe(false);
  });

  test("contact: topic must belong to the route; email or WhatsApp accepted", () => {
    const msg = { route: "build", name: "W K", topic: contactRoutes.build.options[0], message: "Ten chars or more." };
    expect(contactSchema.safeParse({ ...msg, contact: "+254 712 345 678" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...msg, contact: "w@example.com" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...msg, contact: "call me" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...msg, contact: "w@example.com", topic: contactRoutes.hire.options[0] }).success).toBe(false);
  });

  test("spam trap only trips on a filled field", () => {
    expect(isTrapped({ [HONEYPOT]: "x" })).toBe(true);
    expect(isTrapped({ [HONEYPOT]: "   " })).toBe(false);
    expect(isTrapped({ website: "https://example.com" })).toBe(false); // the old, autofill-prone name
    expect(isTrapped(null)).toBe(false);
  });
});

test.describe("content helpers", () => {
  test("every post has a reading time of at least a minute", () => {
    for (const p of posts) expect(readingMinutes(p)).toBeGreaterThanOrEqual(1);
  });

  test("diagram arrows leave boxes at their edges", () => {
    expect(edgePoint(100, 50, 10, 0, 40, 20)).toEqual({ x: 120, y: 50 });
    expect(edgePoint(100, 50, 0, -10, 40, 20)).toEqual({ x: 100, y: 40 });
  });
});

test.describe("booking state", () => {
  const ready = { ...initialBooking("30min"), tz: "Africa/Nairobi", today: "2026-11-20", from: "2026-11-20" };

  test("keeps the chosen day if it still has times, else jumps to the first free day", () => {
    const withDate = { ...ready, date: "2026-11-21" };
    expect(bookingReducer(withDate, { type: "slotsLoaded", days: { "2026-11-21": ["x"] } }).date).toBe("2026-11-21");
    expect(bookingReducer(withDate, { type: "slotsLoaded", days: { "2026-11-21": [], "2026-11-24": ["y"] } }).date).toBe("2026-11-24");
  });

  test("a taken slot drops the time, keeps the notice and reloads", () => {
    const s = bookingReducer({ ...ready, time: "t", status: "submitting" }, { type: "failed", notice: booking.errors.taken, dropTime: true, reload: true });
    expect(s).toMatchObject({ time: null, notice: booking.errors.taken, status: "idle", reload: 1 });
  });

  test("an unknown outcome keeps the time so the visitor isn't pushed to rebook", () => {
    const s = bookingReducer({ ...ready, time: "t", status: "submitting" }, { type: "failed", notice: booking.errors.unknown });
    expect(s.time).toBe("t");
  });
});
