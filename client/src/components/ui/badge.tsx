import { statusLabels, type Status } from "@/content/site";
import { cn } from "@/lib/utils";

// acacia means "live" and nothing else; every other status stays neutral or ochre (pending).
const tones: Record<Status, string> = {
  live: "bg-acacia-soft text-acacia",
  pilot: "bg-ochre-soft text-ochre-text",
  building: "bg-sunken text-ink-muted",
  code: "bg-sunken text-ink-muted",
  concept: "bg-sunken text-ink-muted",
};

const base = "inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-xs leading-none font-medium uppercase tracking-[0.04em]";

/** Project status: exactly one per project. */
export function StatusBadge({ status, onBand = false }: { status: Status; onBand?: boolean }) {
  return (
    <span className={cn(base, onBand ? "bg-band-well text-on-band" : tones[status])}>
      {status === "live" && <span aria-hidden="true" className={cn("size-1.5 rounded-full", onBand ? "bg-acacia-soft" : "bg-acacia")} />}
      {statusLabels[status]}
    </span>
  );
}

/** Plain tag, e.g. the contact form's "Goes to SaTechs" / "Comes to Steve". */
export function Tag({ tone, children }: { tone: "navy" | "jacaranda"; children: React.ReactNode }) {
  const toneClass = tone === "navy" ? "bg-navy-soft text-navy" : "bg-jacaranda-mist text-jacaranda-deep";
  return <span className={cn(base, toneClass)}>{children}</span>;
}
