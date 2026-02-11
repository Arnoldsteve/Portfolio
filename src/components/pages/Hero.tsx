"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Gitlab, Linkedin, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://linkedin.com/in/steve-arnold-otieno",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    href: "https://github.com/Arnoldsteve",
    icon: <Github className="h-5 w-5" />,
  },
  {
    href: "https://gitlab.com/Arnoldsteve",
    icon: <Gitlab className="h-5 w-5" />,
  },
  {
    href: "https://wa.me/254796335895",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export const Hero = () => {
  return (
    <section id="home" className="relative pt-10 pb-20 lg:pt-32 overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/2 translate-y-[-20%]">
        <div className="h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-800 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cyan-600 mr-2"></span>
              Available for Hire
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
              Building Secure, <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                Modern Web Platforms at Scale
              </span>
            </h1>
            
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I am a <strong>Full-Stack Software Engineer</strong> dedicated to transforming business goals into high-performing digital products. From high-converting corporate websites to complex custom applications, I build secure, scalable, and world-class solutions for a global market.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#projects">
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 w-full sm:w-auto h-12 px-8">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link 
                href="/Steve_Arnold_SE_Resume.pdf" 
                target="_blank"
                download
              >
                <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50 w-full sm:w-auto h-12 px-8">
                  Download CV <Download className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
               <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Connect:</span>
               <div className="flex gap-4">
                 {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-600 transition-colors transform hover:scale-110"
                    >
                      {link.icon}
                    </a>
                 ))}
               </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex-shrink-0">
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
             <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/profile-pic.png"
                  alt="Steve Arnold Otieno"
                  fill
                  className="object-cover"
                  priority
                />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};