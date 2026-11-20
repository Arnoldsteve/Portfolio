/**
 * In-memory token bucket per key. It lives in one server instance, so on Vercel it is a speed bump,
 * not a guarantee: limits reset on cold starts and aren't shared between instances. For a hard limit,
 * move the buckets to a shared store (Vercel KV / Upstash) or add a Vercel Firewall rate-limit rule.
 */
type Bucket = { tokens: number; updated: number };
export type Limit = { capacity: number; refillPerMinute: number };

export const limits = {
  contact: { capacity: 5, refillPerMinute: 1 },
  booking: { capacity: 5, refillPerMinute: 1 },
  slots: { capacity: 30, refillPerMinute: 30 },
} satisfies Record<string, Limit>;

const MAX_KEYS = 5_000;
const buckets = new Map<string, Bucket>();

export function takeToken(key: string, limit: Limit = limits.contact, now = Date.now()): boolean {
  const bucket = buckets.get(key) ?? { tokens: limit.capacity, updated: now };
  const refilled = Math.min(limit.capacity, bucket.tokens + ((now - bucket.updated) / 60_000) * limit.refillPerMinute);
  const allowed = refilled >= 1;
  buckets.delete(key); // re-insert so the Map stays in least-recently-used order
  buckets.set(key, { tokens: allowed ? refilled - 1 : refilled, updated: now });
  if (buckets.size > MAX_KEYS) buckets.delete(buckets.keys().next().value!);
  return allowed;
}

/**
 * Client IP. Vercel sets `x-real-ip` / `x-vercel-forwarded-for` itself (visitors can't spoof them);
 * `x-forwarded-for` is the fallback for local runs and other hosts.
 */
export function clientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Convenience: `limited("slots", req)` → true when the caller should get a 429. */
export function limited(name: keyof typeof limits, req: Request): boolean {
  return !takeToken(`${name}:${clientIp(req)}`, limits[name]);
}
