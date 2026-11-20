import type { Metadata } from "next";
import { notFound as copy } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, Label } from "@/components/ui/primitives";

export const metadata: Metadata = { title: copy.heading, robots: { index: false } };

export default function NotFound() {
  return (
    <Container as="section" className="pt-16 pb-24 sm:pt-28 sm:pb-30">
      <Label>{copy.eyebrow}</Label>
      <h1 className="mt-3 text-[40px] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-[clamp(44px,5.6vw,76px)]">{copy.heading}</h1>
      <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.55] text-ink-muted sm:text-xl">{copy.text}</p>
      <ButtonLink href={copy.cta.href} variant="primary" className="mt-8">
        {copy.cta.label}
      </ButtonLink>
    </Container>
  );
}
