"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
    [images.length]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % images.length),
    [images.length]
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
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            {images.length} {images.length === 1 ? "Screenshot" : "Screenshots"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((imgSrc, index) => (
            <button
              key={index}
              onClick={() => openAt(index)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-300/60 hover:-translate-y-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {/* Index badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <Monitor className="h-3 w-3 text-cyan-400" />
                <span className="text-xs font-mono text-white/70 tabular-nums">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
                  <Maximize2 className="h-3.5 w-3.5 text-white" />
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
            </button>
          ))}
        </div>
      </section>

      {/* ─── LIGHTBOX ──────────────────────────────────────────────────── */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          {/* Overlay: true full-screen backdrop */}
          <Dialog.Overlay
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(5, 5, 10, 0.96)",
              backdropFilter: "blur(20px) saturate(160%)",
            }}
          />

          {/* Content: raw primitive — no shadcn wrapper, no translate(-50%,-50%) */}
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center outline-none"
            aria-describedby={undefined}
          >
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
              <div className="flex items-center gap-3">
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

              <Dialog.Close className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            {/* ── MAIN STAGE ── */}
            <div className="relative flex items-center justify-center w-full h-full px-16 py-20">
              {/* Prev */}
              {images.length > 1 && (
                <button
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute left-4 z-10 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* Browser chrome wrapper */}
              <div className="relative w-full max-w-5xl">
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
              </div>

              {/* Next */}
              {images.length > 1 && (
                <button
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute right-4 z-10 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* ── BOTTOM STRIP ── */}
            <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-3 pb-5 pt-12 bg-gradient-to-t from-black/60 to-transparent z-10">
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  {images.map((imgSrc, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to screenshot ${i + 1}`}
                      className={`relative overflow-hidden rounded-lg transition-all duration-300 border-2 focus:outline-none ${
                        i === activeIndex
                          ? "w-[72px] h-11 border-cyan-500 opacity-100 scale-110 shadow-lg shadow-cyan-500/30"
                          : "w-14 h-9 border-white/10 opacity-30 hover:opacity-60 hover:border-white/25"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-white/20 text-[11px] font-mono select-none">
                {images.length > 1 && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">←</kbd>
                      <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">→</kbd>
                      <span>navigate</span>
                    </div>
                    <span className="opacity-40">·</span>
                  </>
                )}
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">esc</kbd>
                  <span>close</span>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}