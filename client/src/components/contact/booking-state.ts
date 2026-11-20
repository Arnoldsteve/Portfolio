import type { Booked, CallId } from "@/lib/booking-schema";

/** Everything the booking flow knows, in one place. */
export type BookingState = {
  call: CallId;
  tz: string | null;
  today: string | null;
  from: string | null; // first date in the visible window
  days: Record<string, string[]> | null; // null = loading
  slotsError: boolean;
  date: string | null;
  time: string | null;
  status: "idle" | "submitting" | "booked";
  errors: { name?: string; email?: string };
  notice: string; // form-level message that must survive the form closing (e.g. "slot taken")
  booked: (Booked & { email: string }) | null;
  reload: number; // bump to refetch the same window
};

export type BookingAction =
  | { type: "init"; tz: string; today: string }
  | { type: "pickCall"; call: CallId }
  | { type: "page"; from: string }
  | { type: "slotsLoading" }
  | { type: "slotsLoaded"; days: Record<string, string[]> }
  | { type: "slotsFailed" }
  | { type: "pickDate"; date: string }
  | { type: "pickTime"; time: string | null }
  | { type: "invalid"; errors: BookingState["errors"] }
  | { type: "submitting" }
  | { type: "booked"; booked: NonNullable<BookingState["booked"]> }
  | { type: "failed"; notice: string; dropTime?: boolean; reload?: boolean }
  | { type: "reset" };

export const initialBooking = (call: CallId): BookingState => ({
  call,
  tz: null,
  today: null,
  from: null,
  days: null,
  slotsError: false,
  date: null,
  time: null,
  status: "idle",
  errors: {},
  notice: "",
  booked: null,
  reload: 0,
});

const firstFreeDay = (days: Record<string, string[]>) => Object.keys(days).sort().find((d) => days[d].length) ?? null;

export function bookingReducer(s: BookingState, a: BookingAction): BookingState {
  switch (a.type) {
    case "init":
      return { ...s, tz: a.tz, today: a.today, from: a.today };
    case "pickCall":
      return a.call === s.call ? s : { ...s, call: a.call, time: null, notice: "" };
    case "page":
      return { ...s, from: a.from, time: null, notice: "" };
    case "slotsLoading":
      return { ...s, days: null, slotsError: false };
    case "slotsLoaded":
      // Keep the chosen day if it still has times, otherwise jump to the first free day.
      return { ...s, days: a.days, date: s.date && a.days[s.date]?.length ? s.date : firstFreeDay(a.days) };
    case "slotsFailed":
      return { ...s, slotsError: true };
    case "pickDate":
      return { ...s, date: a.date, time: null, notice: "" };
    case "pickTime":
      return { ...s, time: a.time, notice: "", errors: {} };
    case "invalid":
      return { ...s, errors: a.errors };
    case "submitting":
      return { ...s, status: "submitting", errors: {}, notice: "" };
    case "booked":
      return { ...s, status: "booked", booked: a.booked };
    case "failed":
      return { ...s, status: "idle", notice: a.notice, time: a.dropTime ? null : s.time, reload: a.reload ? s.reload + 1 : s.reload };
    case "reset":
      return { ...s, status: "idle", booked: null, time: null, notice: "", reload: s.reload + 1 };
  }
}
