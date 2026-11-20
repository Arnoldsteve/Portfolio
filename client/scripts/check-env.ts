// Fails production builds (VERCEL_ENV=production) when env vars the site needs at runtime are missing,
// so a broken contact form can't ship silently. Preview and local builds only warn.
import required from "../src/lib/required-env.json" with { type: "json" };

const missing = Object.values(required).flat().filter((name) => !process.env[name]);

if (missing.length === 0) {
  console.log("check-env: all required env vars are set.");
} else {
  const isProduction = process.env.VERCEL_ENV === "production";
  console[isProduction ? "error" : "log"](`check-env: missing ${missing.join(", ")} (see .env.example).`);
  if (isProduction) process.exit(1);
}
