import { person, satechsBand } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, Label } from "@/components/ui/primitives";

export function SatechsBand() {
  return (
    <Container as="section" aria-label={person.company} className="pt-8 sm:pt-12">
      <div className="flex flex-wrap items-center gap-3 rounded-[20px] bg-navy-fill p-6 text-on-navy sm:gap-8 sm:rounded-xl sm:p-12">
        <div className="min-w-0 flex-[999_1_460px]">
          <Label className="text-on-navy-accent">{satechsBand.eyebrow}</Label>
          <h2 className="mt-3 text-2xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-4xl sm:leading-[1.15]">{satechsBand.heading}</h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.55] text-on-navy-muted sm:text-[17px] sm:leading-[1.6]">{satechsBand.text}</p>
        </div>
        <div className="mt-1 grid flex-[1_1_240px] gap-3 sm:mt-0">
          {/* The quote request stays on this site (routed to SaTechs); the second button visits the studio. */}
          <ButtonLink href="/contact?route=build" variant="onNavy" block>
            {satechsBand.primary}
          </ButtonLink>
          <ButtonLink href={person.links.satechs} variant="outlineNavy" block>
            {satechsBand.secondary}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
