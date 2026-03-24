"use client";

import { SOCIAL_LINKS } from "@/constants/social-links";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SocialDockProps {
  included?: ("linkedin" | "github" | "gitlab" | "whatsapp")[];
  className?: string;
  showLabel?: boolean;
}

export const SocialDock = ({
  included,
  className,
  showLabel = true,
}: SocialDockProps) => {
  // Filter links if 'included' prop is provided, otherwise show all
  const linksToDisplay = included
    ? SOCIAL_LINKS.filter((link) => included.includes(link.id as any))
    : SOCIAL_LINKS;

  return (
    <div
      className={cn(
        "flex items-center justify-center sm:justify-start w-full sm:w-fit gap-5 bg-slate-50/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:bg-white/80",
        className,
      )}
    >
      {showLabel && (
        <>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
            Connect
          </span>
          <div className="h-4 w-[1px] bg-slate-200" />
        </>
      )}

      <div className="flex gap-5">
        {linksToDisplay.map((link) => (
          <Tooltip key={link.id}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-slate-400 transition-all duration-300 transform hover:scale-125",
                  link.hoverColor,
                )}
              >
                {link.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={12}
              className=" text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300"
            >
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
