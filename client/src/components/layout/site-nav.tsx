"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, person, ui } from "@/content/site";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Desktop/tablet: inline links + one primary button.
 * Phone (<640px): a 44px menu button opening a full-screen modal <dialog>
 * (native focus trap + Esc to close).
 */
export function SiteNav() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Close the sheet after navigating.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const isCurrent = (match?: string) => Boolean(match && pathname.startsWith(match));

  const links = (large: boolean) =>
    nav.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isCurrent(item.match) ? "page" : undefined}
        onClick={() => dialogRef.current?.close()}
        className={cn(
          "no-underline hover:text-ink",
          large ? "flex min-h-14 items-center border-b border-line text-[28px] font-semibold tracking-[-0.02em]" : "text-[15px]",
          isCurrent(item.match) ? "font-semibold text-ink" : large ? "text-ink" : "text-ink-muted",
        )}
      >
        {item.label}
      </Link>
    ));

  return (
    <>
      <nav aria-label={ui.mainNav} className="hidden items-center gap-7 sm:flex">
        {links(false)}
        <Link href={ui.getInTouch.href} className={buttonClasses({ variant: "primary", size: "sm" })}>
          {ui.getInTouch.label}
        </Link>
      </nav>

      <button
        type="button"
        aria-label={ui.openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        className="flex size-11 items-center justify-center rounded-md border border-line bg-surface text-ink sm:hidden"
      >
        <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label={ui.mainNav}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-ink-band/40 sm:hidden"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="text-[17px] font-bold tracking-[-0.02em]">{person.name}</span>
          <button
            type="button"
            aria-label={ui.closeMenu}
            onClick={() => dialogRef.current?.close()}
            className="flex size-11 items-center justify-center rounded-md border border-line bg-surface text-ink"
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={ui.mainNav} className="grid px-5 pt-4">
          {links(true)}
          <Link
            href={ui.getInTouch.href}
            onClick={() => dialogRef.current?.close()}
            className={cn(buttonClasses({ variant: "primary", block: true }), "mt-8")}
          >
            {ui.getInTouch.label}
          </Link>
        </nav>
      </dialog>
    </>
  );
}
