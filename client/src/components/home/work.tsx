import Link from "next/link";
import { flagship, projects, ui, workSection } from "@/content/site";
import { StatusBadge } from "@/components/ui/badge";
import { Container, Label, MarkerList, SectionHeader, ShotWell } from "@/components/ui/primitives";

function FlagshipCard() {
  const href = `/work/${flagship.slug}`;
  return (
    <article className="mt-6 flex flex-wrap gap-3.5 rounded-[20px] bg-ink-band p-5 text-on-band sm:mt-10 sm:gap-10 sm:rounded-xl sm:p-10">
      {/* Phone: screenshot first. */}
      <ShotWell
        label={flagship.shot}
        onBand
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
        <MarkerList items={flagship.bullets} onBand className="hidden sm:grid" />
        <Link href={href} className="mt-2 font-semibold text-on-band-jacaranda underline-offset-3 hover:underline">
          {ui.readBuildStory}
        </Link>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface text-ink no-underline transition-[translate,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div
        className="flex aspect-[16/9] items-end bg-sunken p-3 sm:aspect-[16/10] sm:p-4"
        // Product tint is content (the product's own colour), not a brand token.
        style={project.productTint ? { background: project.productTint } : undefined}
      >
        <span className="rounded-sm bg-surface/90 px-2 py-1 text-xs text-ink sm:px-2.5 sm:py-1.5 sm:text-[13px]">{project.shot}</span>
      </div>
      <div className="grid flex-1 gap-2 p-[18px] sm:gap-3 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <Label as="span" className="text-ink-faint">
            {project.kind}
          </Label>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="m-0 text-[21px] leading-[30px] font-semibold tracking-[-0.015em] sm:text-2xl">{project.name}</h3>
        <p className="m-0 hidden text-base leading-[25px] text-ink-muted sm:block">{project.desc}</p>
        <p className="m-0 text-sm leading-[21px] sm:border-t sm:border-line sm:pt-3 sm:text-[15px] sm:leading-[22px]">
          <strong className="font-semibold text-ochre-text">{ui.hardPart}</strong> {project.hard}
        </p>
        <span className="mt-auto hidden text-[15px] font-semibold text-jacaranda sm:block">{ui.readCaseStudy}</span>
      </div>
    </Link>
  );
}

export function Work() {
  return (
    <Container as="section" id="work" className="pt-16 sm:pt-28">
      <SectionHeader eyebrow={workSection.eyebrow} title={workSection.heading} className="max-w-[20ch]" />
      <FlagshipCard />
      <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Container>
  );
}
