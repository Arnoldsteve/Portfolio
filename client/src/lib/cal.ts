import "server-only";
import { person } from "@/content/site";
import type { Booked, BookingInput } from "@/lib/booking-schema";
import { addDays, dateIn } from "@/lib/dates";

/** Thin server-side client for Cal.com's public API v2 (no API key needed for public event types). */
const API = "https://api.cal.com/v2";
const TIMEOUT_MS = 8_000;
const username = person.calUsername;

/** Free start times per day (YYYY-MM-DD in `timeZone`), as ISO strings with offset. */
export async function fetchSlots(call: string, start: string, end: string, timeZone: string, fresh = false): Promise<Record<string, string[]>> {
  const url = new URL(`${API}/slots`);
  url.search = new URLSearchParams({ eventTypeSlug: call, username, start, end, timeZone }).toString();
  const res = await fetch(url, {
    headers: { "cal-api-version": "2024-09-04" },
    ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`cal slots ${res.status}`);
  const json = (await res.json()) as { data?: Record<string, { start: string }[]> };
  return Object.fromEntries(Object.entries(json.data ?? {}).map(([day, slots]) => [day, slots.map((s) => s.start)]));
}

/**
 * `unknown` = no answer from Cal (timeout or network): the booking may or may not exist, so the
 * visitor is told to check their email rather than to retry blindly.
 */
export type CreateResult =
  | { kind: "ok"; booked: Booked }
  | { kind: "taken" }
  | { kind: "failed"; status: number; message: string }
  | { kind: "unknown" };

/**
 * Duplicate guard: the same person booking the same call and time within 10 minutes gets the first
 * result back instead of a second booking (e.g. a double click, or a retry after a slow response).
 * Per server instance, like the rate limiter.
 */
const recent = new Map<string, { at: number; result: Promise<CreateResult> }>();
const RECENT_MS = 10 * 60_000;

export function createBooking(input: BookingInput): Promise<CreateResult> {
  const key = `${input.call}|${new Date(input.start).toISOString()}|${input.email.toLowerCase()}`;
  const now = Date.now();
  for (const [k, v] of recent) if (now - v.at > RECENT_MS) recent.delete(k);
  const hit = recent.get(key);
  if (hit) return hit.result;

  const result = postBooking(input).then((r) => {
    if (r.kind !== "ok" && r.kind !== "unknown") recent.delete(key); // a clean failure may be retried
    return r;
  });
  recent.set(key, { at: now, result });
  return result;
}

async function postBooking(input: BookingInput): Promise<CreateResult> {
  let res: Response;
  try {
    res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: { "cal-api-version": "2024-08-13", "Content-Type": "application/json" },
      body: JSON.stringify({
        eventTypeSlug: input.call,
        username,
        start: new Date(input.start).toISOString(),
        attendee: { name: input.name, email: input.email, timeZone: input.timeZone, language: "en" },
        ...(input.notes ? { bookingFieldsResponses: { notes: input.notes } } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { kind: "unknown" };
  }

  const json = await res.json().catch(() => ({}));
  if (res.ok && json.status === "success") {
    const d = json.data ?? {};
    const link = [d.meetingUrl, d.location].find((v) => typeof v === "string" && v.startsWith("https://"));
    return { kind: "ok", booked: { uid: d.uid, start: d.start ?? input.start, ...(link ? { meetingUrl: link } : {}) } };
  }

  // Decide "taken" from Cal's real availability, not from its error wording.
  if (res.status >= 400 && res.status < 500 && !(await stillFree(input))) return { kind: "taken" };
  return { kind: "failed", status: res.status, message: String(json?.error?.message ?? json?.message ?? res.statusText) };
}

async function stillFree(input: BookingInput): Promise<boolean> {
  try {
    const day = dateIn(new Date(input.start), input.timeZone);
    const days = await fetchSlots(input.call, day, addDays(day, 1), input.timeZone, true);
    const wanted = Date.parse(input.start);
    return Object.values(days).some((starts) => starts.some((s) => Date.parse(s) === wanted));
  } catch {
    return true; // can't tell: report a plain failure rather than a false "taken"
  }
}
