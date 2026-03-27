"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const About = () => {
  return (
    <section
      id="about"
      className="container mx-auto px-4 sm:px-12 py-16 sm:py-24"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-16 gap-y-10">
        
        {/* Image Side */}
        <div className="hidden md:flex md:w-5/12 justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-2xl transform rotate-3 scale-105" />
          <div className="w-72 h-80 lg:w-96 lg:h-[450px] relative rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/profile-pic2.png" // Ensure this image exists, or use profile-pic.png
              alt="Steve Arnold Otieno"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-7/12 text-center md:text-left space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              About <span className="text-cyan-600">Me</span>
            </h2>
            <h3 className="text-xl font-semibold mt-2 text-slate-700">
              Full-Stack Software Engineer & Solutions Architect
            </h3>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed">
            I am a dedicated engineer who believes that a great digital product must be as reliable as it is beautiful. 
            I don't just build websites; I architect end-to-end solutions designed to solve real business problems and drive 
            growth for brands both in Kenya and globally.
          </p>

          <p className="text-lg text-slate-600 leading-relaxed">
            With a background in Computer Science and a commitment to engineering excellence, I bring a global standard to every project. 
            Whether I am crafting a high-speed corporate website or engineering a secure custom application, 
            I focus on delivering performance, security, and long-term scalability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
             {[
                "Full-Stack Web Development",
                "E-commerce & Payment Systems",
                "Custom Software Solutions",
                "Secure & Scalable Cloud Architecture"
             ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                    <span>{item}</span>
                </div>
             ))}
          </div>

          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-slate-900 text-white hover:bg-slate-800 px-8"
            >
              <Link href={`/about`} className="flex items-center gap-2">
                Read My Story <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};