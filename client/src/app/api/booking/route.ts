import { NextResponse, type NextRequest } from "next/server";
import { bookingInput } from "@/lib/booking-schema";
import { createBooking } from "@/lib/cal";
import { clientIp, takeToken } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  if (!takeToken(`booking:${clientIp(req)}`)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const parsed = bookingInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    // A filled honeypot is a bot: pretend success so it learns nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return NextResponse.json({ uid: "ok", start: "" });
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const result = await createBooking(parsed.data);
  if (result.ok) return NextResponse.json(result.booked);

  console.error("booking: cal rejected", result.status, result.message);
  // Cal answers 400/409 when the slot is no longer free.
  const taken = result.status === 409 || /no available users|not available|already/i.test(result.message);
  return NextResponse.json({ error: taken ? "taken" : "failed" }, { status: taken ? 409 : 502 });
}
