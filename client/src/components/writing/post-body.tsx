import type { Block } from "@/content/posts";
import { MarkerList } from "@/components/ui/primitives";

/** Renders a post's structured blocks with the article measure and rhythm from the case study. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[17px] leading-[1.7] sm:text-lg">
      {blocks.map((block, i) => {
        if ("h2" in block)
          return (
            <h2 key={i} className="mt-10 mb-0 text-[24px] leading-[1.25] font-semibold tracking-[-0.02em] sm:mt-12 sm:text-[28px]">
              {block.h2}
            </h2>
          );
        if ("ul" in block) return <MarkerList key={i} items={block.ul} className="mt-4 gap-3" />;
        if ("code" in block)
          return (
            <pre key={i} className="mt-4 overflow-x-auto rounded-md bg-sunken p-4 font-mono text-sm leading-[22px]">
              <code>{block.code}</code>
            </pre>
          );
        return (
          <p key={i} className="mt-4 mb-0">
            {block.p}
          </p>
        );
      })}
    </div>
  );
}
