/**
 * Spam trap shared by the contact form and booking. The field name avoids anything browsers or
 * password managers autofill (e.g. "website", "url", "company"), so real visitors never trip it.
 * Only the server checks it: the browser never blocks a submit because of it.
 */
export const HONEYPOT = "hp_check";

/** True when a request body has the trap filled (a bot). */
export function isTrapped(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[HONEYPOT];
  return typeof value === "string" && value.trim().length > 0;
}
