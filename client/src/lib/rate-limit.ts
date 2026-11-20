/**
 * Simple in-memory token bucket per key (IP). Per server instance, so it is best-effort on
 * serverless; good enough to stop a single client spamming the form.
 */
const CAPACITY = 5;
const REFILL_MS = 60_000; // one token per minute
const MAX_KEYS = 5_000;

const buckets = new Map<string, { tokens: number; updated: number }>();

export function takeToken(key: string, now = Date.now()): boolean {
  const bucket = buckets.get(key) ?? { tokens: CAPACITY, updated: now };
  const refilled = Math.min(CAPACITY, bucket.tokens + (now - bucket.updated) / REFILL_MS);
  const allowed = refilled >= 1;
  buckets.set(key, { tokens: allowed ? refilled - 1 : refilled, updated: now });

  if (buckets.size > MAX_KEYS) {
    // Drop the oldest entry so memory stays bounded.
    buckets.delete(buckets.keys().next().value!);
  }
  return allowed;
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
