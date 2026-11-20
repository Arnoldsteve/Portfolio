import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("route preselects from ?route= and the form adapts", async ({ page }) => {
    await page.goto("/contact?route=hire");
    await expect(page.getByRole("radio", { name: /I'm hiring/ })).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("heading", { name: "Tell me about the role" })).toBeVisible();
    await expect(page.getByText("Comes to Steve")).toBeVisible();

    await page.getByRole("radio", { name: /I need something built/ }).click();
    await expect(page.getByRole("heading", { name: "Tell SaTechs what you need" })).toBeVisible();
    await expect(page.getByLabel("What do you need?")).toBeVisible();
  });

  test("arrow keys move between routes", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("radio", { name: /I need something built/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: /I'm hiring/ })).toBeFocused();
    await expect(page.getByRole("radio", { name: /I'm hiring/ })).toHaveAttribute("aria-checked", "true");
  });

  test("shows inline validation errors and keeps input", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Wanjiku");
    await page.getByRole("button", { name: "Send to SaTechs" }).click();
    await expect(page.getByText("Please add an email address or a WhatsApp number.")).toBeVisible();
    await expect(page.getByText(/Please add a few lines/)).toBeVisible();
    await expect(page.getByLabel("Email or WhatsApp")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Name")).toHaveValue("Wanjiku");
  });

  test("happy path shows the success state", async ({ page }) => {
    let sent: Record<string, string> = {};
    await page.route("/api/contact", async (route) => {
      sent = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto("/contact?route=partner");
    await page.getByLabel("Name").fill("Wanjiku Kamau");
    await page.getByLabel("Email or WhatsApp").fill("wanjiku@example.com");
    await page.getByLabel("Topic").selectOption("Investment");
    await page.getByLabel("What you have in mind").fill("Interested in Jaza WiFi for three plots.");
    await page.getByRole("button", { name: "Send — I reply within a day" }).click();

    await expect(page.getByText("Thanks — you'll hear back within one working day.")).toBeVisible();
    await expect(page.getByText("I'll reply with a few times for a call.")).toBeVisible();
    expect(sent).toMatchObject({ route: "partner", topic: "Investment", contact: "wanjiku@example.com" });

    await page.getByRole("button", { name: "Send another" }).click();
    await expect(page.getByRole("heading", { name: "Let's see if it fits" })).toBeVisible();
  });

  test("server error shows inline message and keeps input", async ({ page }) => {
    await page.route("/api/contact", (route) => route.fulfill({ status: 500, json: { error: "send_failed" } }));
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Wanjiku Kamau");
    await page.getByLabel("Email or WhatsApp").fill("+254 712 345 678");
    await page.getByLabel("A few lines about the project").fill("We need M-Pesa checkout on our shop.");
    await page.getByRole("button", { name: "Send to SaTechs" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("Something went wrong");
    await expect(page.getByLabel("Name")).toHaveValue("Wanjiku Kamau");
  });
});

test.describe("POST /api/contact", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop-1440", "API checks run once"));

  const valid = { route: "build", name: "W K", contact: "w@example.com", topic: "A website", message: "Ten chars or more here." };

  test("rejects invalid input with field errors", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, contact: "nope", topic: "Not an option" } });
    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(Object.keys(json.fields).sort()).toEqual(["contact", "topic"]);
  });

  test("honeypot submissions get a silent 200", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, website: "spam.example" } });
    expect(res.status()).toBe(200);
  });

  test("rate-limits repeated posts from one IP", async ({ request }) => {
    const headers = { "x-forwarded-for": "203.0.113.77" };
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      statuses.push((await request.post("/api/contact", { headers, data: { ...valid, contact: "bad" } })).status());
    }
    expect(statuses).toContain(429);
  });
});

test.describe("booking", () => {
  // Two free days, built relative to "today" so the test never goes stale.
  const day = (offset: number) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);
  let booked: Record<string, string> | null = null;

  test.beforeEach(async ({ page }) => {
    booked = null;
    await page.route("**/api/booking/slots?*", (route) => {
      const call = new URL(route.request().url()).searchParams.get("call");
      route.fulfill({
        json: { days: { [day(1)]: [`${day(1)}T07:00:00.000Z`, `${day(1)}T07:30:00.000Z`], [day(2)]: call === "30min" ? [`${day(2)}T09:00:00.000Z`] : [] } },
      });
    });
    await page.route("**/api/booking", async (route) => {
      booked = route.request().postDataJSON();
      await route.fulfill({ json: { uid: "abc", start: booked!.start, meetingUrl: "https://app.cal.com/video/abc" } });
    });
  });

  test("call → day → time → details → booked, all on the page", async ({ page }) => {
    await page.goto("/contact#book");
    await expect(page.getByRole("radio", { name: /Quick intro/ })).toHaveAttribute("aria-checked", "true");

    // First free day is chosen automatically; days with no times are disabled.
    const times = page.locator("#book").getByRole("button", { pressed: false }).filter({ hasText: /\d:\d\d/ });
    await expect(times).toHaveCount(2);
    await times.first().click();

    const form = page.locator("#book form");
    await form.getByRole("button", { name: "Confirm booking" }).click();
    await expect(form.getByText("Please add your name.")).toBeVisible();

    await form.getByLabel("Name").fill("Wanjiku Kamau");
    await form.getByLabel("Email").fill("wanjiku@example.com");
    await form.getByLabel(/What would you like to cover/).fill("Payment flow review");
    await form.getByRole("button", { name: "Confirm booking" }).click();

    await expect(page.getByText("You’re booked.")).toBeVisible();
    await expect(page.getByText("wanjiku@example.com")).toBeVisible();
    await expect(page.getByRole("link", { name: "Join link" })).toHaveAttribute("href", "https://app.cal.com/video/abc");
    expect(booked).toMatchObject({ call: "15min", name: "Wanjiku Kamau", email: "wanjiku@example.com", notes: "Payment flow review" });
    expect(booked!.timeZone).toBeTruthy();
  });

  test("switching call reloads its free times", async ({ page }) => {
    await page.goto("/contact#book");
    await page.getByRole("radio", { name: /Quick intro/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: /Deep dive/ })).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("#book").getByRole("link", { name: /Book on Cal.com instead/ })).toHaveAttribute("href", "https://cal.com/steve-arnold/30min");
  });

  test("a slot taken meanwhile shows a clear message and keeps the visitor in flow", async ({ page }) => {
    await page.route("**/api/booking", (route) => route.fulfill({ status: 409, json: { error: "taken" } }));
    await page.goto("/contact#book");
    await page.locator("#book").getByRole("button").filter({ hasText: /\d:\d\d/ }).first().click();
    const form = page.locator("#book form");
    await form.getByLabel("Name").fill("W K");
    await form.getByLabel("Email").fill("w@example.com");
    await form.getByRole("button", { name: "Confirm booking" }).click();
    await expect(page.getByText("That time was just taken. Please pick another.")).toBeVisible();
  });

  test("teaser and About's Book a call land on the booking section", async ({ page }, info) => {
    test.skip(info.project.name === "phone-390", "desktop buttons; phone uses the sticky bar");
    await page.goto("/contact");
    await page.getByRole("link", { name: /See available times/ }).click();
    await expect(page).toHaveURL(/#book$/);
    await expect(page.getByRole("heading", { name: "Pick a call, a day and a time." })).toBeInViewport();
    await page.goto("/about");
    await page.getByRole("link", { name: "Book a call" }).first().click();
    await expect(page).toHaveURL(/\/contact#book$/);
  });
});

test.describe("booking API (never reaches Cal)", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop-1440", "API checks run once"));

  test("rejects bad input", async ({ request }) => {
    expect((await request.get("/api/booking/slots?call=99min&start=x&end=y&tz=Nowhere")).status()).toBe(400);
    const res = await request.post("/api/booking", {
      headers: { "x-forwarded-for": "203.0.113.90" },
      data: { call: "15min", start: "not-a-date", timeZone: "Africa/Nairobi", name: "", email: "nope" },
    });
    expect(res.status()).toBe(400);
  });

  test("honeypot gets a silent 200", async ({ request }) => {
    const res = await request.post("/api/booking", {
      headers: { "x-forwarded-for": "203.0.113.91" },
      data: { call: "15min", start: "2030-01-07T07:00:00.000Z", timeZone: "Africa/Nairobi", name: "Bot", email: "bot@example.com", website: "spam" },
    });
    expect(res.status()).toBe(200);
  });
});
