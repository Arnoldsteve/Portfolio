import Link from "next/link";
import { person } from "@/content/site";
import { SiteNav } from "./site-nav";

export function Header() {
  return (
    <header className="border-b border-line sm:border-b-0">
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[-0.02em] text-ink no-underline sm:text-lg">
          {person.name}
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
