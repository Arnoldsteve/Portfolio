import Link from "next/link";
import { flagship, projects, ui, workSection } from "@/content/site";
import { StatusBadge } from "@/components/ui/badge";
import { Container, Label, MarkerList, SectionHeader } from "@/components/ui/primitives";
import { Screenshot } from "@/components/ui/screenshot";
import { isExternal } from "@/lib/utils";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The lead project (Umoja): ink band, screenshot well, proof bullets, case study + live link. */
export function Flagship() {
  return (
    <Container as="section" id="work" className="pt-16 sm:pt-28">
      <SectionHeader eyebrow={workSection.eyebrow} title={workSection.heading} className="[&_h2]:max-w-[22ch]" />
      <article className="mt-6 flex flex-wrap gap-3.5 rounded-xl bg-ink-band p-5 text-on-band sm:mt-10 sm:gap-10 sm:p-10">
        {/* Phone: screenshot first. */}
        <Screenshot
          shot={flagship.shot}
          onBand
          sizes="(min-width: 1024px) 620px, 100vw"
          className="order-first aspect-[16/10] min-w-0 flex-[1_1_100%] rounded-md sm:order-last sm:flex-[1.2_1_400px] sm:rounded-lg"
        />
        <div className="grid min-w-0 flex-[1_1_340px] content-start gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Label as="span" className="text-on-band-ochre">
              {flagship.kind}
            </Label>
            <StatusBadge status={flagship.status} onBand />
          </div>
          <h3 className="m-0 text-[30px] leading-[1.05] font-semibold tracking-[-0.025em] sm:text-[44px]">{flagship.name}</h3>
          <p className="m-0 text-[15px] leading-[1.6] text-on-band-muted sm:text-lg">{flagship.summary}</p>
          <MarkerList items={flagship.bullets} onBand className="text-[15px] sm:text-base" />
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
            <Link href={`/work/${flagship.slug}`} className="inline-flex min-h-11 items-center font-semibold text-on-band-jacaranda underline-offset-3 hover:underline">
              {ui.readCaseStudy}
            </Link>
            <a href={flagship.liveUrl} {...external} className="inline-flex min-h-11 items-center font-semibold text-on-band underline-offset-3 hover:underline">
              {ui.visitLive}
            </a>
          </div>
        </div>
      </article>
    </Container>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const className =
    "flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface text-ink no-underline transition-[translate,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lift";
  const body = (
    <>
      {project.shot && (
        <Screenshot
          shot={project.shot}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/9] rounded-none sm:aspect-[16/10]"
        />
      )}
      <div className="grid flex-1 gap-2 p-4.5 sm:gap-3 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label as="span" className="text-ink-faint">
            {project.kind}
          </Label>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="m-0 text-[21px] leading-[30px] font-semibold tracking-[-0.015em] sm:text-2xl">{project.name}</h3>
        <p className="m-0 text-[15px] leading-[1.55] text-ink-muted sm:text-base sm:leading-[25px]">{project.desc}</p>
        <p className="m-0 border-t border-line pt-3 text-sm leading-[21px] sm:text-[15px] sm:leading-[22px]">
          <strong className="font-semibold text-ochre-text">{ui.hardPart}</strong> {project.hard}
        </p>
        <span className="mt-auto pt-1 text-[15px] font-semibold text-jacaranda">{project.cta}</span>
      </div>
    </>
  );
  return isExternal(project.href) ? (
    <a href={project.href} {...external} className={className}>
      {body}
    </a>
  ) : (
    <Link href={project.href} className={className}>
      {body}
    </Link>
  );
}

/** Jaza WiFi, GradeHub, Aura — after the SaTechs band. */
export function MoreWork() {
  return (
    <Container as="section" aria-labelledby="more-work" className="pt-16 sm:pt-28">
      <h2 id="more-work" className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
        {workSection.moreHeading}
      </h2>
      <ul className="m-0 mt-4 grid list-none gap-4 p-0 sm:mt-6 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-6">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
