import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const e2eIgnore = ["**/unit/**", "**/visual/**", "**/live/**"];

/**
 * Projects:
 * - e2e in three engines: Chromium at 1440/834/390, WebKit on an iPhone, Firefox on desktop.
 * - unit: pure logic, no browser.
 * - visual (VISUAL=1): screenshot comparison against approved baselines.
 * - live (LIVE=1): real Cal.com booking and real email — run by hand, see tests/live.
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  projects: [
    { name: "desktop-1440", testIgnore: e2eIgnore, use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "tablet-834", testIgnore: e2eIgnore, use: { ...devices["Desktop Chrome"], viewport: { width: 834, height: 1112 } } },
    { name: "phone-390", testIgnore: e2eIgnore, use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "webkit-iphone", testIgnore: e2eIgnore, use: { ...devices["iPhone 13"] } },
    { name: "firefox-desktop", testIgnore: e2eIgnore, use: { ...devices["Desktop Firefox"], viewport: { width: 1280, height: 900 } } },
    { name: "unit", testMatch: "**/unit/**/*.spec.ts" },
    ...(process.env.VISUAL
      ? [
          { name: "visual-desktop", testMatch: "**/visual/**/*.spec.ts", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
          { name: "visual-phone", testMatch: "**/visual/**/*.spec.ts", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
        ]
      : []),
    ...(process.env.LIVE ? [{ name: "live", testMatch: "**/live/**/*.spec.ts" }] : []),
  ],
  webServer: {
    command: `pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
