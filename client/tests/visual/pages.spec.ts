import { expect, test } from "../fixtures";

/**
 * Visual regression: full-page screenshots compared with approved baselines (per platform, so the
 * macOS and Linux baselines live side by side). Update after an intended design change with
 * `pnpm test:visual --update-snapshots`. The booking dates change daily, so they are masked.
 */
const pages = [
  { path: "/", name: "home" },
  { path: "/work/umoja", name: "work-umoja" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
];

for (const p of pages) {
  for (const theme of ["light", "dark"] as const) {
    test(`${p.name} (${theme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.goto(p.path);
      // Lazy images below the fold make full-page shots race; load them all and wait first.
      await page.evaluate(async () => {
        await document.fonts.ready;
        const images = [...document.images];
        images.forEach((img) => (img.loading = "eager"));
        await Promise.all(images.map((img) => (img.complete ? null : new Promise((done) => img.addEventListener("load", done, { once: true })))));
      });
      await expect(page).toHaveScreenshot(`${p.name}-${theme}.png`, {
        fullPage: true,
        animations: "disabled",
        mask: [page.locator("#book ul")],
        maxDiffPixelRatio: 0.01,
      });
    });
  }
}
