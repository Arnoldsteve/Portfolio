// src/components/ServiceDetails.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Service } from "@/types/service";

export const ServiceDetails = ({ service }: { service: Service }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
            className="bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-500 hover:shadow-md hover:shadow-cyan-400/40 transition-all"
        >
            Read More
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-slate-900 border-border/50 sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2x1 flex items-center gap-x-2">
            {service.icon} {service.title}
          </DialogTitle>
          <DialogDescription className="pt-4 text-left">
            {service.detailedDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="font-bold mb-2">Key Offerings:</h3>
          <ul className="space-y-2">
            {service.keyPoints.map((point, i) => (
              <li key={i} className="flex items-center gap-x-2 text-muted-foreground">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};