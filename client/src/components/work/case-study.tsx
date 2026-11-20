import Link from "next/link";
import { caseStudyUi as t, type CaseStudy as Data } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, Label, MarkerList, ShotWell, Stat } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { Toc } from "./toc";

const h2 = "m-0 text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[32px]";
const sectionGap = "mt-11 sm:mt-14";

export function CaseStudy({ cs }: { cs: Data }) {
  const s = t.sections;
  const toc = [
    { id: "problem", label: s.problem.title, short: s.problem.short },
    { id: "constraints", label: s.constraints.title, short: s.constraints.short },
    { id: "how", label: s.how.title, short: s.how.short },
    { id: "decision", label: s.decision.toc, short: s.decision.short },
    { id: "result", label: s.result.toc, short: s.result.short },
  ];

  return (
    <>
      <Container as="section" className="pt-5 pb-7 sm:pt-12 sm:pb-10">
        <p className="m-0 text-sm text-ink-muted">
          <Link href={t.breadcrumbRoot.href} className="inline-flex min-h-11 items-center text-ink-muted sm:hidden">
            {t.backToWork}
          </Link>
          <span className="hidden sm:inline">
            <Link href={t.breadcrumbRoot.href} className="text-ink-muted underline underline-offset-3 hover:text-ink">
              {t.breadcrumbRoot.label}
            </Link>{" "}
            / {cs.title}
          </span>
        </p>
        <Label className="mt-4 sm:mt-8">{cs.eyebrow}</Label>
        <h1 className="mt-2 text-5xl leading-none font-semibold tracking-[-0.04em] sm:mt-3 sm:text-[clamp(44px,6vw,80px)]">{cs.title}</h1>
        <p className="mt-3.5 max-w-[36ch] text-lg leading-[1.5] text-ink-muted sm:mt-5 sm:text-[22px]">{cs.oneLiner}</p>
        <dl className="m-0 mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4 sm:mt-10 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-6 sm:pt-6">
          {(Object.keys(t.metaLabels) as (keyof typeof t.metaLabels)[]).map((key) => (
            <div key={key}>
              <dt className="font-mono text-xs leading-4 font-medium tracking-[0.06em] text-ink-faint uppercase">{t.metaLabels[key]}</dt>
              <dd className="m-0 mt-1.5 flex items-center gap-2 text-[15px] sm:text-base">
                {key === "status" && <span aria-hidden="true" className="size-2 rounded-full bg-acacia" />}
                {cs.meta[key]}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container as="section" aria-label="Showcase and results">
        <div className="flex flex-wrap justify-center gap-6 rounded-[20px] bg-ink-band p-5 sm:rounded-xl sm:p-10">
          <ShotWell label={cs.showcase.dashboard} onBand className="hidden aspect-[16/10] flex-[2_1_480px] sm:flex" />
          <ShotWell label={cs.showcase.phone} onBand className="aspect-[9/16] w-[200px] rounded-[22px] sm:max-h-[420px] sm:w-auto sm:flex-[1_1_200px] sm:rounded-xl" />
        </div>
        <ul className="m-0 mt-3 grid list-none gap-2.5 p-0 sm:mt-6 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-4">
          {cs.results.map((r) => (
            <li key={r.cap} className="flex items-center gap-4 rounded-[14px] border border-line bg-surface p-4 sm:block sm:rounded-lg sm:p-6">
              <Stat num={r.num} cap={r.cap} />
            </li>
          ))}
        </ul>
      </Container>

      <Container as="section" className="flex flex-col gap-6 pt-8 sm:flex-row sm:flex-wrap sm:gap-16 sm:pt-24">
        <div className="sm:flex-[0_1_220px]">
          <Toc items={toc} label={t.tocLabel} />
        </div>
        <article className="max-w-[720px] min-w-0 text-[17px] leading-[1.65] sm:flex-[999_1_560px] sm:text-lg sm:leading-[1.7]">
          <h2 id="problem" className={h2}>
            {s.problem.title}
          </h2>
          <p className="mt-3 sm:mt-4">{cs.problem}</p>

          <h2 id="constraints" className={cn(h2, sectionGap)}>
            {s.constraints.title}
          </h2>
          <MarkerList items={cs.constraints} className="mt-3 gap-3 sm:mt-4" />

          <h2 id="how" className={cn(h2, sectionGap)}>
            {s.how.title}
          </h2>
          <p className="mt-3 sm:mt-4">{cs.flowIntro}</p>
          <ol className="m-0 mt-4 grid list-none p-0 sm:mt-6 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:gap-3 sm:text-[15px] sm:leading-[1.4]">
            {cs.flow.map((step, i) => {
              const hot = i === cs.flowHighlight;
              const n = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={step}
                  className={cn(
                    "flex gap-3.5 sm:grid sm:content-start sm:gap-1.5 sm:rounded-md sm:border sm:p-4",
                    hot ? "sm:border-jacaranda-mist sm:bg-jacaranda-mist sm:text-jacaranda-deep" : "sm:border-line sm:bg-surface",
                  )}
                >
                  {/* Phone: vertical numbered timeline. */}
                  <span className="flex flex-col items-center sm:hidden">
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full font-mono text-xs font-medium",
                        hot ? "bg-jacaranda text-on-jacaranda" : "bg-sunken text-ink",
                      )}
                    >
                      {n}
                    </span>
                    {i < cs.flow.length - 1 && <span aria-hidden="true" className="min-h-5 w-0.5 flex-1 bg-line" />}
                  </span>
                  <span className={cn("hidden font-mono text-xs tracking-[0.06em] sm:block", hot ? "text-jacaranda-deep" : "text-ink-faint")}>{n}</span>
                  <span className="pt-1 pb-5 text-base font-medium sm:p-0 sm:text-[15px] sm:font-semibold">{step}</span>
                </li>
              );
            })}
          </ol>
          <ShotWell label={cs.diagram} className="mt-4 hidden aspect-[16/7] sm:flex" />

          <h2 id="decision" className={cn(h2, "mt-9 sm:mt-14")}>
            {s.decision.title}
          </h2>
          <div className="mt-3 grid gap-2.5 text-[15px] leading-[1.55] sm:mt-4 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-4 sm:text-base sm:leading-[1.6]">
            <div className="rounded-[14px] border border-line bg-surface p-4 sm:rounded-lg sm:p-5">
              <Label className="text-acacia">{t.chose}</Label>
              <p className="mt-1.5 sm:mt-2">{cs.decision.chose}</p>
            </div>
            <div className="rounded-[14px] border border-dashed border-line bg-surface p-4 sm:rounded-lg sm:p-5">
              <Label className="text-ink-faint">{t.rejected}</Label>
              <p className="mt-1.5 text-ink-muted sm:mt-2">{cs.decision.rejected}</p>
            </div>
          </div>

          <h2 id="result" className={cn(h2, sectionGap)}>
            {s.result.title}
          </h2>
          <p className="mt-3 sm:mt-4">{cs.result}</p>
          <div className="mt-4 rounded-[14px] bg-ochre-soft p-[18px] sm:mt-6 sm:rounded-lg sm:p-6">
            <Label>{t.change}</Label>
            <p className="mt-1.5 text-base sm:mt-2 sm:text-[17px]">{cs.change}</p>
          </div>
        </article>
      </Container>

      <Container as="section" className="grid gap-3 pt-12 pb-8 sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] sm:gap-4 sm:pt-28 sm:pb-30">
        <Link
          href={cs.cta.href}
          className="hidden gap-2.5 rounded-xl bg-jacaranda p-8 text-on-jacaranda no-underline hover:bg-jacaranda-deep sm:grid"
        >
          <Label as="span" className="text-on-jacaranda opacity-85">
            {cs.cta.eyebrow}
          </Label>
          <span className="text-[28px] leading-[1.2] font-semibold tracking-[-0.02em]">{cs.cta.title}</span>
          <span className="font-semibold">{cs.cta.link}</span>
        </Link>
        <NextCard href={cs.next.href} label={cs.next.label} />
      </Container>
    </>
  );
}

export function NextCard({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="grid gap-1.5 rounded-lg border border-line bg-surface p-5 text-ink no-underline hover:border-ink-faint sm:gap-2.5 sm:rounded-xl sm:p-8"
    >
      <Label as="span" className="text-ink-faint">
        {t.nextLabel}
      </Label>
      <span className="text-[22px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[28px]">{label}</span>
      <span className="font-semibold text-jacaranda">{t.readIt}</span>
    </Link>
  );
}

export function ComingSoon({ name, eyebrow }: { name: string; eyebrow: string }) {
  return (
    <Container as="section" className="pt-5 pb-16 sm:pt-12 sm:pb-30">
      <p className="m-0 text-sm text-ink-muted">
        <Link href={t.breadcrumbRoot.href} className="inline-flex min-h-11 items-center text-ink-muted underline-offset-3 hover:underline">
          {t.backToWork}
        </Link>
      </p>
      <Label className="mt-4 sm:mt-8">{eyebrow}</Label>
      <h1 className="mt-2 text-5xl leading-none font-semibold tracking-[-0.04em] sm:mt-3 sm:text-[clamp(44px,6vw,80px)]">{name}</h1>
      <p className="mt-5 text-[22px] font-semibold">{t.comingSoon}</p>
      <p className="mt-2 max-w-measure text-lg leading-[1.6] text-ink-muted">{t.comingSoonText}</p>
      <ButtonLink href={t.comingSoonHref} variant="primary" className="mt-8">
        {t.comingSoonCta}
      </ButtonLink>
    </Container>
  );
}
