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
  test.beforeEach(async ({ page }) => {
    // Don't hit Cal.com from tests.
    await page.route("https://cal.com/**", (route) => route.fulfill({ body: "<html><body>calendar</body></html>", contentType: "text/html" }));
  });

  test("Cal.com loads inline only after asking", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("#book iframe")).toHaveCount(0);
    await page.getByRole("button", { name: "Pick a time" }).click();
    await expect(page.locator("#book iframe")).toHaveAttribute("src", /^https:\/\/cal\.com\/steve-arnold\?embed=true&theme=(light|dark)$/);
  });

  test("Book a call from About opens the calendar on the contact page", async ({ page }, info) => {
    test.skip(info.project.name === "phone-390", "About's desktop button; phone uses the sticky bar");
    await page.goto("/about");
    await page.getByRole("link", { name: "Book a call" }).first().click();
    await expect(page).toHaveURL(/\/contact#book$/);
    await expect(page.locator("#book iframe")).toBeVisible();
  });
});
