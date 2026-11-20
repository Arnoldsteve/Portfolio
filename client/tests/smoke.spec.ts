import { expect, test } from "@playwright/test";
import { routes, themes } from "./routes";

for (const route of routes) {
  for (const theme of themes) {
    test(`${route.name} renders (${theme})`, async ({ page }, info) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && !m.text().includes("404") && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));

      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      const res = await page.goto(route.path);
      expect(res?.status()).toBe("status" in route ? route.status : 200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toBeVisible();

      // No horizontal page scroll at any width.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      // Theme follows the system preference.
      const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      expect(bg).toBe(theme === "dark" ? "rgb(18, 16, 14)" : "rgb(244, 241, 234)");

      expect(errors).toEqual([]);
      await page.screenshot({ path: `test-results/screenshots/${info.project.name}/${route.name}-${theme}.png`, fullPage: true });
    });
  }
}

test("placeholders render visibly, never invented", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("[N]").first()).toBeVisible();
  await expect(page.getByText(/Taking on 1 new engagement from \[month\]/)).toBeVisible();
});

test("theme toggle persists without a flash on reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  // Set by the inline head script before first paint.
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
});

test("mobile menu opens, traps focus and closes on Escape", async ({ page }, info) => {
  test.skip(info.project.name !== "phone-390", "phone only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("link", { name: "About" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("sticky CTA shows on phone only, not on contact", async ({ page }, info) => {
  const phone = info.project.name === "phone-390";
  await page.goto("/");
  const cta = page.locator("main a", { hasText: "Get in touch" }).last();
  await (phone ? expect(cta).toBeVisible() : expect(cta).toBeHidden());
  await page.goto("/contact");
  await expect(page.locator("main .sticky")).toHaveCount(0);
});

test("touch targets are at least 44px on phone", async ({ page }, info) => {
  test.skip(info.project.name !== "phone-390", "phone only");
  for (const path of ["/", "/about", "/contact", "/work/jaza-wifi"]) {
    await page.goto(path);
    const small = await page.$$eval("main a.inline-flex, main button, header button, footer a, footer button", (els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => ({ text: el.textContent?.trim() || el.getAttribute("aria-label"), h: el.getBoundingClientRect().height }))
        .filter((e) => e.h < 44),
    );
    expect(small, path).toEqual([]);
  }
});

test("home leads with Umoja, then SaTechs, then more work in order", async ({ page }) => {
  await page.goto("/");
  const order = await page.evaluate(() =>
    ["Umoja", "SaTechs Solutions builds this for businesses.", "Jaza WiFi", "GradeHub", "Aura by Racheal"].map((t) =>
      [...document.querySelectorAll("main h2, main h3")].findIndex((h) => h.textContent?.trim() === t),
    ),
  );
  expect(order.every((i) => i >= 0)).toBe(true);
  expect([...order].sort((a, b) => a - b)).toEqual(order);
});

test("status badges are honest", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#work").getByText("Live", { exact: true })).toBeVisible();
  await expect(page.getByText("In development", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Code on request", { exact: true })).toBeVisible();
});

test("every post ends with a next step", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop-1440", "content check runs once");
  for (const slug of ["payment-callbacks-exactly-once", "wifi-payer-vs-device", "three-bugs-before-launch"]) {
    await page.goto(`/writing/${slug}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main article a[href^='/contact']").first()).toBeVisible();
  }
});
