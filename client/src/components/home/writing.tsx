import { posts, ui, writingSection } from "@/content/site";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { isPlaceholder } from "@/lib/utils";

export function Writing() {
  return (
    <Container as="section" id="writing" className="pt-16 sm:pt-28">
      <SectionHeader eyebrow={writingSection.eyebrow} title={writingSection.heading} />
      <ul className="m-0 mt-4 grid list-none gap-[18px] p-0 sm:mt-8 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:gap-6">
        {posts.map((post) => {
          const body = (
            <>
              <span className="font-mono text-xs text-ink-faint uppercase">
                {post.date} · {post.minutes} {ui.minutes}
              </span>
              <span className="mt-1.5 block text-[17px] leading-[1.35] font-semibold sm:mt-2.5 sm:text-xl">{post.title}</span>
            </>
          );
          const cls = "block border-t-2 border-ink pt-3 text-ink no-underline sm:pt-[18px]";
          return (
            <li key={post.title}>
              {/* A post without a URL yet renders as text, not a dead link. */}
              {isPlaceholder(post.href) ? (
                <div className={cls}>{body}</div>
              ) : (
                <a href={post.href} className={`${cls} hover:text-jacaranda`}>
                  {body}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
