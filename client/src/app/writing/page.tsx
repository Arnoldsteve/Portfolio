import type { Metadata } from "next";
import { seo, writingSection } from "@/content/site";
import { posts } from "@/content/posts";
import { PostLink } from "@/components/home/writing";
import { Container, Label } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: { absolute: seo.writing.title },
  description: seo.writing.description,
  alternates: { canonical: "/writing" },
  openGraph: { title: seo.writing.title, description: seo.writing.description, url: "/writing" },
};

export default function WritingPage() {
  return (
    <Container as="section" className="pt-7 pb-16 sm:pt-14 sm:pb-30">
      <Label>{writingSection.eyebrow}</Label>
      <h1 className="mt-2 max-w-[20ch] text-[38px] leading-[1.05] font-semibold tracking-[-0.035em] sm:mt-3 sm:text-[clamp(40px,5vw,64px)]">
        {writingSection.pageHeading}
      </h1>
      <p className="mt-3 max-w-[56ch] text-[17px] leading-[1.6] text-ink-muted sm:mt-5 sm:text-[19px]">{writingSection.pageText}</p>
      <ul className="m-0 mt-8 grid max-w-[880px] list-none gap-8 p-0 sm:mt-12 sm:gap-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostLink post={post} withDescription />
          </li>
        ))}
      </ul>
    </Container>
  );
}
