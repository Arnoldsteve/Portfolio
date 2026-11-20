import { expect, test } from "@playwright/test";

/**
 * LIVE checks against the real Cal.com account and Resend. They create a real calendar event and send
 * a real email, so they only run when asked:  LIVE=1 pnpm test:live
 * Afterwards, cancel the test booking in Cal.com (Bookings → Upcoming) — the uid is printed below.
 */
test.describe.configure({ mode: "serial" });

test("books the first free 30-minute slot through /api/booking", async ({ request }) => {
  const tz = "Africa/Nairobi";
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(new Date());
  const end = new Date(Date.parse(`${today}T12:00:00Z`) + 13 * 864e5).toISOString().slice(0, 10);

  const slots = await request.get(`/api/booking/slots?call=30min&start=${today}&end=${end}&tz=${tz}`);
  expect(slots.ok(), await slots.text()).toBe(true);
  const { days } = (await slots.json()) as { days: Record<string, string[]> };
  const start = Object.values(days).flat()[0];
  expect(start, "no free 30-minute slot in the next two weeks").toBeTruthy();

  const res = await request.post("/api/booking", {
    data: { call: "30min", start, timeZone: tz, name: "Portfolio live test", email: process.env.LIVE_TEST_EMAIL ?? "stevearnold9e@gmail.com", notes: "Automated live test — please cancel." },
  });
  const body = await res.json();
  console.log("live booking response:", res.status(), JSON.stringify(body));
  expect(res.status(), JSON.stringify(body)).toBe(200);
  expect(body.uid).toBeTruthy();
});

test("sends a real contact email through /api/contact", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { route: "hire", name: "Portfolio live test", contact: process.env.LIVE_TEST_EMAIL ?? "stevearnold9e@gmail.com", topic: "Something else", message: "Automated live test of the contact form." },
  });
  expect(res.status(), await res.text()).toBe(200);
});
