import Image from "next/image";
import { ui, type Shot } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A real screenshot (or a marked illustration) inside a well, shown at a fixed ratio and cropped
 * from the top. Product colours stay inside the well.
 */
export function Screenshot({
  shot,
  sizes,
  className,
  onBand = false,
  position = "top",
}: {
  shot: Shot;
  sizes: string;
  className?: string;
  onBand?: boolean;
  position?: "top" | "center";
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", onBand ? "border border-band-line bg-band-well" : "bg-sunken", className)}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        className={cn("object-cover", position === "top" ? "object-left-top" : "object-center")}
      />
      {shot.illustration && (
        <span className="absolute right-2 bottom-2 rounded-sm bg-ink-band/80 px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-on-band uppercase">
          {ui.illustration}
        </span>
      )}
    </div>
  );
}
