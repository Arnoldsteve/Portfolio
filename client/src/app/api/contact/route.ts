import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactRoutes } from "@/content/site";
import { contactSchema, fieldErrors, isEmail } from "@/lib/contact-schema";
import { isTrapped } from "@/lib/honeypot";
import { limited } from "@/lib/rate-limit";
import required from "@/lib/required-env.json";

const TIMEOUT_MS = 8_000;

export async function POST(req: NextRequest) {
  if (limited("contact", req)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  if (body === null) return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  // A bot: pretend success so it learns nothing.
  if (isTrapped(body)) return NextResponse.json({ ok: true });

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "validation", fields: fieldErrors(parsed.error) }, { status: 400 });

  const missing = required.contact.filter((name) => !process.env[name]);
  if (missing.length) {
    // The build fails in production when these are missing (scripts/check-env.ts); this is the runtime backstop.
    console.error(`contact: not configured, missing ${missing.join(", ")}`);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const { route, name, contact, topic, message } = parsed.data;
  const to = contactRoutes[route].recipient === "satechs" ? process.env.CONTACT_TO_SATECHS! : process.env.CONTACT_TO_STEVE!;

  const send = new Resend(process.env.RESEND_API_KEY).emails.send({
    from: process.env.CONTACT_FROM!,
    to,
    subject: `[${route}] ${topic} — ${name}`,
    text: [`Route: ${contactRoutes[route].title}`, `Name: ${name}`, `Contact: ${contact}`, `Topic: ${topic}`, "", message].join("\n"),
    ...(isEmail(contact) ? { replyTo: contact } : {}),
  });
  const timeout = new Promise<{ error: Error }>((resolve) => setTimeout(() => resolve({ error: new Error("timeout") }), TIMEOUT_MS));

  const { error } = await Promise.race([send, timeout]);
  if (error) {
    console.error("contact: send failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
