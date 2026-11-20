import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { person, seo, ui } from "@/content/site";
import { Hero } from "@/components/home/hero";
import { Proof } from "@/components/home/proof";
import { Flagship, MoreWork } from "@/components/home/work";
import { Qa } from "@/components/home/qa";
import { SatechsBand } from "@/components/home/satechs-band";
import { Writing } from "@/components/home/writing";
import { ContactRoutes } from "@/components/home/contact-routes";
import { StickyCta } from "@/components/layout/sticky-cta";
import { ButtonLink } from "@/components/ui/button";
import { linkOr } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
  alternates: { canonical: "/" },
  openGraph: { title: seo.home.title, description: seo.home.description, url: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Flagship />
      <SatechsBand />
      <MoreWork />
      <Qa />
      <Writing />
      <ContactRoutes />
      <StickyCta>
        <ButtonLink href={ui.getInTouch.href} variant="primary" block className="flex-1">
          {ui.getInTouch.label}
        </ButtonLink>
        <ButtonLink href={linkOr(person.links.whatsapp, "/contact")} aria-label={ui.whatsapp} className="w-12 shrink-0 px-0">
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
        </ButtonLink>
      </StickyCta>
    </>
  );
}
