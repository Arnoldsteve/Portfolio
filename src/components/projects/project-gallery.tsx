"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Monitor,
  ExternalLink,
} from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  projectTitle?: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, next, prev]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeIndex]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* ─── GALLERY SECTION ───────────────────────────────────────────── */}
      <section className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-cyan-500 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              System Architecture Gallery
            </h2>
          </div>
          {/* shadcn Badge — count pill */}
          <Badge variant="secondary" className="uppercase tracking-widest text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
            {images.length} {images.length === 1 ? "Screenshot" : "Screenshots"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((imgSrc, index) => (
            /* shadcn Button — ghost, full card clickable area */
            <Button
              key={index}
              variant="ghost"
              onClick={() => openAt(index)}
              className="group relative h-auto w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-0 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-300/60 hover:-translate-y-1 hover:bg-slate-900 text-left focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {/* shadcn Badge — index pill */}
              <Badge
                variant="outline"
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border-white/10 text-white/70 rounded-full font-mono text-xs px-2.5 py-1"
              >
                <Monitor className="h-3 w-3 text-cyan-400" />
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </Badge>

              {/* Expand icon — plain div, no nested button */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <div className="h-8 w-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white">
                  <Maximize2 className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={imgSrc}
                  alt={`Screenshot ${index + 1}${projectTitle ? ` — ${projectTitle}` : ""}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Bottom reveal */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent pt-10 pb-4 px-4">
                <div className="flex items-center gap-2 text-white">
                  <ZoomIn className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-medium">View Full Resolution</span>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </section>

      {/* ─── LIGHTBOX ──────────────────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            !fixed !inset-0 !left-0 !top-0
            !translate-x-0 !translate-y-0
            !w-screen !h-screen !max-w-none !max-h-none
            !rounded-none !border-none !p-0 !shadow-none
            flex flex-col items-center justify-center
            overflow-hidden outline-none
            [&>button]:hidden
          "
          style={{
            background: "rgba(5, 5, 10, 0.92)",
            backdropFilter: "blur(20px) saturate(160%)",
          }}
        >
          <DialogTitle className="sr-only">
            {projectTitle
              ? `${projectTitle} — Screenshot ${activeIndex + 1} of ${images.length}`
              : `Screenshot ${activeIndex + 1} of ${images.length}`}
          </DialogTitle>

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 48%, rgba(6,182,212,0.12) 0%, transparent 70%)",
            }}
          />

          {/* ── TOP BAR ── */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>
              <div className="h-3.5 w-px bg-white/10" />
              <span className="text-xs font-mono text-white/25 tracking-widest uppercase select-none">
                {projectTitle ?? "Preview"} — {activeIndex + 1} of {images.length}
              </span>
            </div>

            {/* shadcn Button — close */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* ── MAIN STAGE ── */}
          <div className="relative flex items-center justify-center w-full h-full px-3 py-16 sm:px-10 md:px-16 md:py-20">
            {/* Browser chrome wrapper — prev/next overlap it */}
            <div className="relative w-full max-w-full md:max-w-5xl">
              {/* shadcn Button — prev */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:h-12 md:w-12 rounded-xl border border-white/10 bg-black/40 hover:bg-white/10 text-white/60 hover:text-white hover:scale-110 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              {/* Chrome bar */}
              <div className="flex items-center gap-3 bg-[#18181f] border border-white/[0.06] border-b-0 rounded-t-xl px-4 py-2.5">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 bg-[#1c1c23] rounded-md h-6 flex items-center px-3 min-w-0">
                  <span className="text-[11px] text-white/20 font-mono truncate select-none">
                    app.{projectTitle?.toLowerCase().replace(/\s+/g, "") ?? "project"}.io
                  </span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-white/10 shrink-0" />
              </div>

              {/* Screenshot */}
              <div
                className="relative w-full rounded-b-xl border border-white/[0.06] border-t-0 overflow-hidden bg-slate-900"
                style={{ aspectRatio: "16/10" }}
              >
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                )}
                <Image
                  key={activeIndex}
                  src={images[activeIndex]}
                  alt={`Screenshot ${activeIndex + 1}${projectTitle ? ` — ${projectTitle}` : ""}`}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  quality={100}
                  priority
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
              {/* shadcn Button — next */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-8 w-8 md:h-12 md:w-12 rounded-xl border border-white/10 bg-black/40 hover:bg-white/10 text-white/60 hover:text-white hover:scale-110 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* ── BOTTOM STRIP ── */}
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-3 pb-5 pt-12 bg-gradient-to-t from-black/60 to-transparent z-10">
            {/* Thumbnail strip — shadcn Button outline per thumb */}
            {images.length > 1 && (
              <div className="flex items-center gap-2">
                {images.map((imgSrc, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    className={`relative overflow-hidden rounded-lg p-0 transition-all duration-300 border-2 ${
                      i === activeIndex
                        ? "w-[72px] h-11 border-cyan-500 opacity-100 scale-110 shadow-lg shadow-cyan-500/30 hover:border-cyan-500"
                        : "w-14 h-9 border-white/10 opacity-30 hover:opacity-60 hover:border-white/25 bg-transparent"
                    }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </Button>
                ))}
              </div>
            )}

            {/* Keyboard hints — shadcn Badge outline */}
            <div className="hidden sm:flex items-center gap-3">
              {images.length > 1 && (
                <>
                  <Badge variant="outline" className="gap-1.5 border-white/10 bg-white/5 text-white/20 font-mono text-[11px] rounded-md">
                    <span>←</span>
                    <span>→</span>
                    <span className="ml-1">navigate</span>
                  </Badge>
                  <span className="text-white/10 text-xs">·</span>
                </>
              )}
              <Badge variant="outline" className="border-white/10 bg-white/5 text-white/20 font-mono text-[11px] rounded-md">
                esc · close
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}