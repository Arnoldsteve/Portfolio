import { statusLabels, type Status } from "@/content/site";
import { cn } from "@/lib/utils";

const tones: Record<Status, string> = {
  live: "bg-acacia-soft text-acacia",
  pilot: "bg-ochre-soft text-ochre-text",
  concept: "bg-sunken text-ink-muted",
  satechs: "bg-navy-soft text-navy",
  unknown: "bg-ochre-soft text-pending",
};

const base = "inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-xs leading-none font-medium uppercase tracking-[0.04em]";

/** Project status: exactly one of Live, Pilot, Concept (or Via SaTechs). */
export function StatusBadge({ status, onBand = false }: { status: Status; onBand?: boolean }) {
  return <span className={cn(base, onBand ? "bg-band-well text-on-band" : tones[status])}>{statusLabels[status]}</span>;
}

/** Plain tag, e.g. the contact form's "Goes to SaTechs" / "Comes to Steve". */
export function Tag({ tone, children }: { tone: "navy" | "jacaranda"; children: React.ReactNode }) {
  const toneClass = tone === "navy" ? "bg-navy-soft text-navy" : "bg-jacaranda-mist text-jacaranda-deep";
  return <span className={cn(base, toneClass)}>{children}</span>;
}
