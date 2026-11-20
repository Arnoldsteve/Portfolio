import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, seo } from "@/content/site";
import { CaseStudy } from "@/components/work/case-study";
import { StickyCta } from "@/components/layout/sticky-cta";
import { ButtonLink } from "@/components/ui/button";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = caseStudies[(await params).slug];
  if (!cs) return {};
  const title = seo.caseStudy(cs.title);
  return {
    title: { absolute: title },
    description: cs.seoDescription,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { title, description: cs.seoDescription, url: `/work/${cs.slug}`, type: "article" },
  };
}

export default async function WorkPage({ params }: Params) {
  const cs = caseStudies[(await params).slug];
  if (!cs) notFound();

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
