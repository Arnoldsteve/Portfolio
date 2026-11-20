import type { ReactNode } from "react";
import { HONEYPOT } from "@/lib/honeypot";
import { cn } from "@/lib/utils";

/** Text input / select / textarea style. 16px text so iOS doesn't zoom; danger border when invalid. */
export const inputClass =
  "w-full rounded-md border border-line bg-surface px-3.5 py-3 text-base text-ink placeholder:text-ink-faint hover:border-ink-faint aria-[invalid=true]:border-danger";

/** Label wrapping a field; `content-start` keeps fields aligned when a hint or error shows. */
export const labelClass = "grid content-start gap-1.5 text-sm font-medium sm:gap-2";

/**
 * Selectable card used by radio groups (contact route, call length). Selected = 1px border + 1px inset
 * ring (2px total) so padding never shifts. `ground` is the surface the card sits on.
 */
export function choiceClass(on: boolean, className?: string, ground: "paper" | "surface" = "paper") {
  return cn(
    "cursor-pointer rounded-lg border text-left text-ink",
    className,
    on
      ? "border-jacaranda bg-jacaranda-mist ring-1 ring-jacaranda ring-inset"
      : cn("border-line hover:border-ink-faint", ground === "paper" ? "bg-surface" : "bg-paper"),
  );
}

export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <span id={id} className="text-sm font-normal text-danger">
      {children}
    </span>
  );
}

/** Form-level error. `role="alert"` so screen readers announce it. */
export function FormError({ children, className }: { children?: ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className={cn("m-0 text-[15px] text-danger", className)}>
      {children}
    </p>
  );
}

/** Off-screen spam trap: hidden from people, keyboard and screen readers. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
