import Link from "next/link";
import { contactRoutes, contactRoutesSection, type RouteId } from "@/content/site";
import { Container } from "@/components/ui/primitives";

export function ContactRoutes() {
  return (
    <Container as="section" className="pt-16 pb-8 sm:pt-28 sm:pb-30">
      <h2 className="text-[30px] font-semibold tracking-[-0.025em] sm:text-5xl sm:tracking-[-0.03em]">{contactRoutesSection.heading}</h2>
      <p className="mt-2 text-[15px] text-ink-muted sm:mt-3 sm:text-[19px]">{contactRoutesSection.text}</p>
      <ul className="m-0 mt-4 grid list-none gap-2.5 p-0 sm:mt-8 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] sm:gap-4">
        {(Object.keys(contactRoutes) as RouteId[]).map((id) => {
          const r = contactRoutes[id];
          return (
            <li key={id}>
              <Link
                href={`/contact?route=${id}`}
                className="flex h-full items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 text-ink no-underline hover:border-ink-faint sm:grid sm:content-start sm:gap-2 sm:p-6"
              >
                <span className="grid gap-0.5 sm:gap-2">
                  <span className="font-semibold sm:text-[19px]">{r.title}</span>
                  <span className="text-[13px] text-ink-muted sm:hidden">{r.short}</span>
                  <span className="hidden text-[15px] leading-[1.5] text-ink-muted sm:block">{r.text}</span>
                </span>
                <span className="font-semibold text-jacaranda sm:text-[15px]">
                  <span className="hidden sm:inline">{r.dest}</span>
                  <span aria-hidden="true" className="sm:hidden">
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
