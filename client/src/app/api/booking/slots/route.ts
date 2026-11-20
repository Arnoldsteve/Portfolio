import { NextResponse, type NextRequest } from "next/server";
import { slotsQuery } from "@/lib/booking-schema";
import { fetchSlots } from "@/lib/cal";
import { limited } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  if (limited("slots", req)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const parsed = slotsQuery.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) return NextResponse.json({ error: "invalid_query" }, { status: 400 });

  const { call, start, end, tz } = parsed.data;
  try {
    const days = await fetchSlots(call, start, end, tz);
    return NextResponse.json({ days }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } });
  } catch (error) {
    console.error("booking: slots failed", error);
    return NextResponse.json({ error: "slots_failed" }, { status: 502 });
  }
}
