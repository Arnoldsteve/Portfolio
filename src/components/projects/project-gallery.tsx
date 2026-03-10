"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn, X, Monitor } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="mt-16 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-cyan-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            System Architecture Gallery
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          {images.length} Screenshots
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((imgSrc, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-cyan-200 hover:-translate-y-1">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={imgSrc}
                    alt={`System Screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Refined Hover UI */}
                <div className="absolute inset-0 bg-slate-900/0 transition-all duration-300 group-hover:bg-slate-900/40 flex items-center justify-center">
                  <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2.5 border border-white/20 text-white shadow-2xl">
                      <ZoomIn className="h-4 w-4" />
                      <span className="text-sm font-medium">View Full Scale</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            {/* THE REFINED LIGHTBOX DESIGN */}
            <DialogContent className="max-w-6xl w-[90vw] p-0 bg-transparent border-none shadow-none focus:ring-0 outline-none">
              <div className="relative flex flex-col items-center justify-center gap-6 group">
                
                {/* The Image Wrapper with internal padding for 'Breathing Room' */}
                <div className="relative w-full h-auto max-h-[80vh] rounded-2xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] border border-white/5 bg-slate-950/20 backdrop-blur-sm p-2 md:p-4">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={imgSrc}
                      alt="Project Screenshot Full View"
                      fill
                      className="object-contain rounded-lg"
                      quality={100}
                      priority
                    />
                  </div>
                </div>

                {/* Floating Navigation / Info Pill */}
                <div className="flex items-center gap-5 px-6 py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/10 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <div className="flex items-center gap-2 text-cyan-400">
                      <Monitor className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-tighter">Preview</span>
                   </div>
                   <div className="h-4 w-[1px] bg-white/20" />
                   <span className="text-sm font-light text-white/80">GradeHub Enterprise Module</span>
                   <DialogPrimitive.Close className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all">
                     <X className="h-5 w-5" />
                   </DialogPrimitive.Close>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}