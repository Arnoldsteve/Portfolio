import "server-only";
import { person } from "@/content/site";
import type { Booked, BookingInput } from "@/lib/booking-schema";

/** Thin server-side client for Cal.com's public API v2 (no API key needed for public event types). */
const API = "https://api.cal.com/v2";
const username = new URL(person.links.booking).pathname.replace(/^\/+|\/+$/g, "");

/** Free start times per day (YYYY-MM-DD in `timeZone`), as ISO strings with offset. */
export async function fetchSlots(call: string, start: string, end: string, timeZone: string): Promise<Record<string, string[]>> {
  const url = new URL(`${API}/slots`);
  url.search = new URLSearchParams({ eventTypeSlug: call, username, start, end, timeZone }).toString();
  const res = await fetch(url, { headers: { "cal-api-version": "2024-09-04" }, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`cal slots ${res.status}`);
  const json = (await res.json()) as { data?: Record<string, { start: string }[]> };
  return Object.fromEntries(Object.entries(json.data ?? {}).map(([day, slots]) => [day, slots.map((s) => s.start)]));
}

export type CreateResult = { ok: true; booked: Booked } | { ok: false; status: number; message: string };

export async function createBooking(input: BookingInput): Promise<CreateResult> {
  const res = await fetch(`${API}/bookings`, {
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
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.status !== "success") {
    return { ok: false, status: res.status, message: String(json?.error?.message ?? json?.message ?? res.statusText) };
  }
  const d = json.data ?? {};
  const link = [d.meetingUrl, d.location].find((v) => typeof v === "string" && v.startsWith("https://"));
  return { ok: true, booked: { uid: d.uid, start: d.start, ...(link ? { meetingUrl: link } : {}) } };
}
