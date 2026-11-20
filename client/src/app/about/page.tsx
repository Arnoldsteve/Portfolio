import type { Metadata } from "next";
import { about, education, experience, habits, languages, person, seo, stack, ui } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, Fact, Label, SectionHeader, ShotWell } from "@/components/ui/primitives";
import { StickyCta } from "@/components/layout/sticky-cta";
import { cn, linkOr } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: seo.about.title },
  description: seo.about.description,
  alternates: { canonical: "/about" },
  openGraph: { title: seo.about.title, description: seo.about.description, url: "/about" },
};

const bookHref = linkOr(person.links.booking, ui.bookCall.href);
const card = "rounded-[14px] border border-line bg-surface p-[18px] sm:rounded-lg sm:p-6";

export default function AboutPage() {
  return (
    <>
      <Container as="section" className="flex flex-wrap items-end gap-6 pt-6 sm:gap-14 sm:pt-14">
        <ShotWell label={about.portrait} className="aspect-square w-full rounded-[20px] sm:max-w-[420px] sm:flex-[1_1_320px] sm:rounded-xl" />
        <div className="min-w-0 flex-[999_1_520px]">
          <Label>{about.eyebrow}</Label>
          <h1 className="mt-2 text-[38px] leading-[1.05] font-semibold tracking-[-0.035em] sm:mt-3 sm:text-[clamp(40px,5vw,64px)]">
            {about.heading}
          </h1>
          <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.65] text-ink sm:mt-6 sm:text-[19px]">{about.bio}</p>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
            <ButtonLink href={person.links.cv} variant="primary" block className="sm:inline-flex sm:w-auto">
              {ui.downloadCvPdf}
            </ButtonLink>
            <ButtonLink href={bookHref} className="hidden sm:inline-flex">
              {ui.bookCall.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <Container as="section" className="pt-14 sm:pt-28">
        <SectionHeader eyebrow={about.habitsEyebrow} title={about.habitsHeading} />
        <ol className="m-0 mt-4 grid list-none gap-2.5 p-0 sm:mt-8 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-4">
          {habits.map((h, i) => (
            <li key={h.title} className={cn(card, "flex gap-3.5 sm:grid sm:content-start sm:gap-2.5")}>
              <span className="pt-0.5 font-mono text-xs text-jacaranda sm:pt-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="grid gap-1 sm:gap-2.5">
                <span className="text-[17px] font-semibold sm:text-[19px]">{h.title}</span>
                <span className="text-sm leading-[1.55] text-ink-muted sm:text-[15px] sm:leading-[1.6]">{h.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Container>

      <Container as="section" id="experience" className="flex flex-wrap gap-8 pt-14 sm:gap-14 sm:pt-28">
        <div className="min-w-0 flex-[999_1_560px]">
          <SectionHeader eyebrow={about.experienceEyebrow} title={about.experienceHeading} />
          <ol className="m-0 mt-4 list-none p-0 sm:mt-8">
            {experience.map((job) => (
              <li key={job.org} className="flex flex-wrap gap-1.5 border-t border-line py-5 sm:gap-6 sm:py-7">
                <Label as="span" className={cn("basis-full sm:basis-[180px]", job.current ? "text-jacaranda" : "text-ink-faint")}>
                  {job.dates}
                </Label>
                <div className="grid min-w-0 flex-[1_1_360px] gap-1.5 sm:gap-2">
                  <span className="text-[19px] font-semibold sm:text-[21px]">{job.org}</span>
                  <span className="text-sm text-ink-muted sm:text-[15px]">
                    {job.role} · {job.context}
                  </span>
                  <ul className="mt-1 pl-[18px] text-[15px] leading-[1.6] sm:mt-1.5 sm:pl-5 sm:text-base sm:leading-[1.65]">
                    {job.points.map((p) => (
                      <li key={p} className="list-disc">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="grid flex-[1_1_300px] content-start gap-3 sm:gap-4">
          <div className={card}>
            <Label className="text-ink-faint">{about.stackLabel}</Label>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0 sm:mt-3.5 sm:gap-2">
              {stack.map((s) => (
                <li key={s} className="rounded-sm bg-sunken px-2 py-[5px] font-mono text-xs sm:px-2.5 sm:py-1.5 sm:text-[13px]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className={cn(card, "grid gap-3.5")}>
            <Fact label={about.educationLabel}>
              {education.degree}
              <br />
              {education.school}, {education.years}
            </Fact>
            <Fact label={about.languagesLabel}>{languages.join(" · ")}</Fact>
            <Fact label={about.basedInLabel}>
              {person.location} · {person.timezone}
            </Fact>
          </div>
        </aside>
      </Container>

      <Container as="section" className="pt-10 pb-8 sm:pt-28 sm:pb-30">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[20px] bg-ink-band p-6 text-on-band sm:rounded-xl sm:p-12">
          <div className="flex-[1_1_420px]">
            <Label className="text-on-band-ochre">{about.hiringEyebrow}</Label>
            <h2 className="mt-3 text-2xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-4xl sm:leading-[1.15]">{about.hiringHeading}</h2>
          </div>
          <div className="hidden flex-wrap gap-3 sm:flex">
            <ButtonLink href={bookHref} variant="onBand">
              {ui.bookCall.label}
            </ButtonLink>
            <ButtonLink href={person.links.cv} variant="outlineBand">
              {ui.downloadCv}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <StickyCta>
        <ButtonLink href={bookHref} variant="primary" className="flex-1">
          {ui.bookCall.label}
        </ButtonLink>
        <ButtonLink href={person.links.cv} className="flex-1">
          {ui.downloadCv}
        </ButtonLink>
      </StickyCta>
    </>
  );
}
