import type { ReactNode } from "react";

/**
 * Phone-only action bar (<640px). Rendered as the last element of a page, it sticks to the
 * viewport bottom while scrolling and takes its own space at the end, so it never hides content.
 */
export function StickyCta({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 flex gap-2.5 border-t border-line bg-paper px-5 pt-3 pb-5 sm:hidden">{children}</div>
  );
}
