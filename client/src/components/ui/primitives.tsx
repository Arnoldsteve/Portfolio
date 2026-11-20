import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page-width wrapper: max 1200px, 20px gutters on phone, 32px from 640px. */
export function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}: { as?: ElementType; className?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-5 sm:px-8", className)} {...props}>
      {children}
    </Tag>
  );
}

/** Mono uppercase eyebrow. Defaults to ochre-text (section eyebrows); pass a colour class to override. */
export function Label({ as: Tag = "p", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return (
    <Tag className={cn("m-0 font-mono text-xs leading-4 font-medium uppercase tracking-[0.06em] text-ochre-text", className)}>
      {children}
    </Tag>
  );
}

/** Eyebrow + h2. */
export function SectionHeader({ eyebrow, title, className }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Label>{eyebrow}</Label>}
      <h2 className="mt-2 text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] sm:mt-3 sm:text-[40px] lg:text-5xl lg:leading-[1.08] lg:tracking-[-0.03em]">
        {title}
      </h2>
    </div>
  );
}

/** A proof number with its 3px ochre underline bar. Never used without a caption. */
export function Stat({ num, cap, compact = false }: { num: string; cap: string; compact?: boolean }) {
  return (
    <>
      <p
        className={cn(
          "m-0 inline-block border-b-3 border-ochre font-semibold tracking-[-0.02em]",
          compact ? "pb-1.5 text-[26px] leading-[30px]" : "pb-1.5 text-[26px] leading-[30px] sm:pb-2 sm:text-4xl sm:leading-10",
        )}
      >
        {num}
      </p>
      <p className="mt-2 mb-0 text-[13px] leading-[18px] text-ink-muted sm:mt-3 sm:text-sm sm:leading-5">{cap}</p>
    </>
  );
}

/** Availability pill: acacia dot with halo. */
export function AvailabilityPill({ children }: { children: ReactNode }) {
  return (
    <p className="m-0 inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-[7px] text-[13px] leading-5 text-ink-muted sm:gap-2.5 sm:px-3.5 sm:py-2 sm:text-sm">
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-acacia shadow-[0_0_0_4px_var(--acacia-soft)]" />
      {children}
    </p>
  );
}

/** List with small ochre square markers (proof). */
export function MarkerList({ items, className, onBand = false }: { items: string[]; className?: string; onBand?: boolean }) {
  return (
    <ul className={cn("m-0 grid list-none gap-2.5 p-0", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className={cn("mt-[0.6em] h-1.5 flex-[0_0_6px] rounded-xs", onBand ? "bg-on-band-ochre" : "bg-ochre")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A mono label above a value (meta rows, aside facts). */
export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-ink-faint">{label}</Label>
      <div className="mt-1.5 text-base">{children}</div>
    </div>
  );
}
