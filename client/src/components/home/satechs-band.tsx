import { person, satechsBand } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, Label } from "@/components/ui/primitives";
import { linkOr } from "@/lib/utils";

export function SatechsBand() {
  // Until the SaTechs site URL is filled in, both buttons route to the "build" contact form.
  const href = linkOr(person.links.satechs, "/contact?route=build");
  return (
    <Container as="section" className="pt-16 sm:pt-28">
      <div className="flex flex-wrap items-center gap-3 rounded-[20px] bg-navy-fill p-6 text-on-navy sm:gap-8 sm:rounded-xl sm:p-12">
        <div className="min-w-0 flex-[999_1_460px]">
          <Label className="text-on-navy-accent">{satechsBand.eyebrow}</Label>
          <h2 className="mt-3 text-2xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-4xl sm:leading-[1.15]">{satechsBand.heading}</h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.55] text-on-navy-muted sm:text-[17px] sm:leading-[1.6]">{satechsBand.text}</p>
        </div>
        <div className="mt-1 grid flex-[1_1_240px] gap-3 sm:mt-0">
          <ButtonLink href={href} variant="onNavy" block>
            {satechsBand.primary}
          </ButtonLink>
          <ButtonLink href={href} variant="outlineNavy" block className="hidden sm:flex">
            {satechsBand.secondary}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
