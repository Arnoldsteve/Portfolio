"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // window.scrollY is more modern than pageYOffset
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-2xl border border-white/10 transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          sideOffset={15}
          className="bg-slate-900 ring-4 ring-slate-900/30 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-right-2 duration-300"
        >
          <p>Back to Top</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};