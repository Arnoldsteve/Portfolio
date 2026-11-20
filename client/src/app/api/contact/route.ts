import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactRoutes } from "@/content/site";
import { contactSchema, fieldErrors, isEmail } from "@/lib/contact-schema";
import { clientIp, takeToken } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  if (!takeToken(clientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot is a bot: pretend success so it learns nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "validation", fields: fieldErrors(parsed.error) }, { status: 400 });
  }

  const { route, name, contact, topic, message } = parsed.data;
  const recipient = contactRoutes[route].recipient;
  const to = recipient === "satechs" ? process.env.CONTACT_TO_SATECHS : process.env.CONTACT_TO_STEVE;
  const from = process.env.CONTACT_FROM;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    console.error("contact: missing RESEND_API_KEY, CONTACT_FROM or CONTACT_TO_* env vars");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    subject: `[${route}] ${topic} — ${name}`,
    text: [`Route: ${contactRoutes[route].title}`, `Name: ${name}`, `Contact: ${contact}`, `Topic: ${topic}`, "", message].join("\n"),
    ...(isEmail(contact) ? { replyTo: contact } : {}),
  });

  if (error) {
    console.error("contact: resend failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
