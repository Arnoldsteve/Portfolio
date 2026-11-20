"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; short: string };

/** "On this page": highlights the section in view (IntersectionObserver). Desktop rail; phone pills. */
export function Toc({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <nav aria-label={label} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "flex min-h-11 shrink-0 items-center rounded-pill border px-3.5 text-sm no-underline",
              active === item.id ? "border-jacaranda bg-jacaranda font-semibold text-on-jacaranda" : "border-line bg-surface text-ink",
            )}
          >
            {item.short}
          </a>
        ))}
      </nav>

      <nav aria-label={label} className="sticky top-6 hidden content-start gap-3 text-[15px] sm:grid">
        <span className="font-mono text-xs leading-4 font-medium tracking-[0.06em] text-ink-faint uppercase">{label}</span>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "border-l-2 py-1 pl-3 no-underline",
              active === item.id ? "border-jacaranda font-semibold text-jacaranda" : "border-line text-ink-muted hover:text-ink",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
