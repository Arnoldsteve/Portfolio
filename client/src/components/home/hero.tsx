import { ArrowRight } from "lucide-react";
import { hero, person, ui } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { AvailabilityPill, Container, Label } from "@/components/ui/primitives";
import { Screenshot } from "@/components/ui/screenshot";

function CurrentlyText() {
  return (
    <>
      <Label as="span" className="text-ink-faint">
        {ui.currently}
      </Label>
      <span className="text-[15px] font-semibold sm:text-base">{hero.currently.title}</span>
      <span className="text-[13px] text-ink-muted sm:text-sm">{hero.currently.sub}</span>
    </>
  );
}

export function Hero() {
  return (
    <Container as="section" className="flex flex-wrap items-center gap-14 pt-7 sm:pt-16 sm:pb-14">
      <div className="min-w-0 flex-[999_1_560px]">
        <AvailabilityPill>
          {person.availability}
          <span className="hidden sm:inline">
            {" "}
            · {person.city}, {person.timezone}
          </span>
        </AvailabilityPill>
        <h1 className="mt-5 max-w-[15ch] text-[40px] leading-[1.04] font-semibold tracking-[-0.035em] sm:mt-7 sm:text-[clamp(44px,5.6vw,76px)] sm:leading-[1.02]">
          {hero.headline}
        </h1>
        <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.55] text-ink-muted sm:mt-7 sm:text-xl">{hero.lead}</p>

        {/* Phone: the "Currently" card becomes a row with a small round photo. */}
        <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-line bg-surface p-3 sm:hidden">
          <Screenshot shot={hero.portrait} sizes="52px" position="center" className="size-13 shrink-0 rounded-full" />
          <div className="grid gap-0.5">
            <CurrentlyText />
          </div>
        </div>

        <div className="mt-5 grid gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
          <ButtonLink href={hero.primaryCta.href} variant="primary" block className="sm:inline-flex sm:w-auto">
            {hero.primaryCta.label}
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} block className="sm:inline-flex sm:w-auto">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>

      <div className="relative hidden max-w-[420px] min-w-0 flex-[1_1_340px] sm:block">
        <Screenshot shot={hero.portrait} sizes="420px" position="center" className="aspect-[4/5] rounded-xl" />
        <div className="absolute bottom-8 -left-6 grid gap-1 rounded-lg border border-line bg-surface px-[18px] py-4 shadow-lift">
          <CurrentlyText />
        </div>
      </div>
    </Container>
  );
}
