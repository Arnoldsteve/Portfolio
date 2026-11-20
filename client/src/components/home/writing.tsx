import Link from "next/link";
import { ui, writingSection } from "@/content/site";
import { formatDate, posts, readingMinutes, type Post } from "@/content/posts";
import { Container, SectionHeader } from "@/components/ui/primitives";

/** One post link: 2px ink rule, mono meta, title. Used on home and /writing. */
export function PostLink({ post, withDescription = false }: { post: Post; withDescription?: boolean }) {
  return (
    <Link href={`/writing/${post.slug}`} className="group block border-t-2 border-ink pt-3 text-ink no-underline sm:pt-4.5">
      <span className="font-mono text-xs text-ink-faint uppercase">
        {post.tag} · {formatDate(post.date)} · {readingMinutes(post)} {ui.minutes}
      </span>
      <span className="mt-1.5 block text-[17px] leading-[1.35] font-semibold group-hover:text-jacaranda sm:mt-2.5 sm:text-xl">{post.title}</span>
      {withDescription && <span className="mt-2 block text-[15px] leading-[1.6] text-ink-muted sm:text-base">{post.description}</span>}
    </Link>
  );
}

export function Writing() {
  return (
    <Container as="section" id="writing" className="pt-16 sm:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow={writingSection.eyebrow} title={writingSection.heading} />
        <Link href="/writing" className="inline-flex min-h-11 items-center font-semibold text-jacaranda underline-offset-3 hover:underline">
          {writingSection.all}
        </Link>
      </div>
      <ul className="m-0 mt-4 grid list-none gap-4.5 p-0 sm:mt-8 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:gap-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostLink post={post} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
