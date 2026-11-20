"use client";

import { useEffect, useState } from "react";
import { contactPage as c, person } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/primitives";

/**
 * "Book a call" card. Cal.com loads inline only when the visitor asks for it (click, or arriving
 * at /contact#book), so the page stays fast and nobody is sent off-site to book.
 */
export function Booking() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#book") setOpen(true);
  }, []);

  const theme = () => {
    const set = document.documentElement.dataset.theme;
    if (set === "light" || set === "dark") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  return (
    <div id="book" className="grid gap-3.5 rounded-lg bg-ink-band p-[18px] text-on-band sm:p-7">
      <Label as="span" className="text-on-band-ochre">
        {c.talkEyebrow}
      </Label>
      <span className="text-lg leading-[1.25] font-semibold sm:text-[22px]">{c.talkHeading}</span>
      {open ? (
        <iframe
          title={c.talkHeading}
          src={`${person.links.booking}?embed=true&theme=${theme()}`}
          loading="lazy"
          className="h-[640px] w-full rounded-md border-0 bg-surface"
        />
      ) : (
        <>
          <span className="text-[15px] leading-[1.55] text-on-band-muted">{c.talkText}</span>
          <Button variant="onBand" block onClick={() => setOpen(true)}>
            {c.talkCta}
          </Button>
        </>
      )}
    </div>
  );
}
