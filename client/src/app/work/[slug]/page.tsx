import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, flagship, projects, seo } from "@/content/site";
import { CaseStudy, ComingSoon } from "@/components/work/case-study";
import { StickyCta } from "@/components/layout/sticky-cta";
import { ButtonLink } from "@/components/ui/button";

type Params = { params: Promise<{ slug: string }> };

const allWork = [{ slug: flagship.slug, name: flagship.name, kind: flagship.kind }, ...projects];

export const dynamicParams = false;

export function generateStaticParams() {
  return allWork.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = allWork.find((w) => w.slug === slug);
  if (!work) return {};
  const { title } = seo.caseStudy(work.name);
  const description = seo.caseStudyDescriptions[slug];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description, url: `/work/${slug}` },
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const work = allWork.find((w) => w.slug === slug);
  if (!work) notFound();

  const cs = caseStudies[slug];
  if (!cs) return <ComingSoon name={work.name} eyebrow={work.kind} />;

  return (
    <>
      <CaseStudy cs={cs} />
      <StickyCta>
        <ButtonLink href={cs.cta.href} variant="primary" block>
          {cs.cta.title}
        </ButtonLink>
      </StickyCta>
    </>
  );
}
