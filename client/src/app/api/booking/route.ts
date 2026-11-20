import { NextResponse, type NextRequest } from "next/server";
import { bookingInput } from "@/lib/booking-schema";
import { createBooking } from "@/lib/cal";
import { isValidInstant } from "@/lib/dates";
import { isTrapped } from "@/lib/honeypot";
import { limited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  if (limited("booking", req)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  if (isTrapped(body)) {
    // A bot: pretend success with a well-formed answer so it learns nothing.
    const start = typeof body?.start === "string" && isValidInstant(body.start) ? body.start : new Date().toISOString();
    return NextResponse.json({ uid: "ok", start });
  }

  const parsed = bookingInput.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "validation" }, { status: 400 });

  const result = await createBooking(parsed.data);
  switch (result.kind) {
    case "ok":
      return NextResponse.json(result.booked);
    case "taken":
      return NextResponse.json({ error: "taken" }, { status: 409 });
    case "unknown":
      console.error("booking: no answer from Cal (timeout or network)");
      return NextResponse.json({ error: "unknown" }, { status: 504 });
    case "failed":
      console.error("booking: cal rejected", result.status, result.message);
      return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
