import { test as base, expect, type TestInfo } from "@playwright/test";

/** Free days relative to "today", so tests never go stale. */
export const day = (offset: number) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);

/** Deterministic free times for both calls: day+1 has two, day+2 only for the 60-minute call. */
export function fakeSlots(call: string | null) {
  return { days: { [day(1)]: [`${day(1)}T07:00:00.000Z`, `${day(1)}T07:30:00.000Z`], [day(2)]: call === "60-min-meeting" ? [`${day(2)}T09:00:00.000Z`] : [] } };
}

/**
 * Every page gets the booking slots endpoint stubbed, so no test depends on live Cal.com.
 * A test can still register its own route; the most recently registered route wins.
 */
export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.route("**/api/booking/slots?*", (route) => route.fulfill({ json: fakeSlots(new URL(route.request().url()).searchParams.get("call")) }));
    await provide(page);
  },
});

export { expect };

/** Phone-sized project (< 640px), whichever browser engine it runs on. */
export const isPhone = (info: TestInfo) => (info.project.use.viewport?.width ?? 1280) < 640;
