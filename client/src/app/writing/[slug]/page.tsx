import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { person, seo, siteUrl, ui, writingSection } from "@/content/site";
import { formatDate, posts, readingMinutes } from "@/content/posts";
import { PostBody } from "@/components/writing/post-body";
import { StickyCta } from "@/components/layout/sticky-cta";
import { ButtonLink } from "@/components/ui/button";
import { Container, Label } from "@/components/ui/primitives";

type Params = { params: Promise<{ slug: string }> };

const findPost = (slug: string) => posts.find((p) => p.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) return {};
  const title = seo.post(post.title);
  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { title, description: post.description, url: `/writing/${post.slug}`, type: "article" },
  };
}

export default async function PostPage({ params }: Params) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  const next = posts[(posts.indexOf(post) + 1) % posts.length];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${siteUrl}/writing/${post.slug}`,
    author: { "@id": `${siteUrl}/#person`, name: person.name },
    datePublished: post.date,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container as="article" className="pt-5 pb-12 sm:pt-12 sm:pb-20">
        <div className="mx-auto max-w-[720px]">
          <Link href="/writing" className="inline-flex min-h-11 items-center text-sm text-ink-muted underline-offset-3 hover:text-ink hover:underline">
            {writingSection.back}
          </Link>
          <Label className="mt-4 sm:mt-6">{post.tag}</Label>
          <h1 className="mt-2 text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] sm:mt-3 sm:text-5xl sm:leading-[1.08]">{post.title}</h1>
          <p className="mt-4 text-lg leading-[1.55] text-ink-muted sm:text-xl">{post.description}</p>
          <p className="mt-4 border-b border-line pb-6 font-mono text-xs text-ink-faint uppercase">
            {person.name} · {formatDate(post.date)} · {readingMinutes(post)} {ui.minutes}
          </p>
          <PostBody blocks={post.body} />

          {/* No dead ends: every post ends with one next step. */}
          <div className="mt-12 grid gap-4 rounded-xl bg-ink-band p-6 text-on-band sm:mt-16 sm:p-10">
            <p className="m-0 text-[22px] leading-[1.25] font-semibold tracking-[-0.02em] sm:text-[28px]">{post.cta.text}</p>
            <ButtonLink href={post.cta.href} variant="onBand" className="justify-self-start">
              {post.cta.label}
            </ButtonLink>
          </div>
          {next !== post && (
            <Link href={`/writing/${next.slug}`} className="mt-6 grid gap-1.5 rounded-lg border border-line bg-surface p-5 text-ink no-underline hover:border-ink-faint sm:p-6">
              <Label as="span" className="text-ink-faint">
                {writingSection.next}
              </Label>
              <span className="text-lg font-semibold sm:text-xl">{next.title}</span>
            </Link>
          )}
        </div>
      </Container>
      <StickyCta>
        <ButtonLink href={post.cta.href} variant="primary" block>
          {post.cta.label}
        </ButtonLink>
      </StickyCta>
    </>
  );
}
