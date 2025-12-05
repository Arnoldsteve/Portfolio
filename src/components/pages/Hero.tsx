"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Gitlab, Linkedin } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://linkedin.com/in/steve-arnold-otieno",
    icon: (
      <Linkedin className="h-4 w-4 hover:text-cyan-400 transition-colors" />
    ),
  },
  {
    href: "https://github.com/Arnoldsteve",
    icon: <Github className="h-4 w-4 hover:text-cyan-400 transition-colors" />,
  },
  {
    href: "https://gitlab.com/Arnoldsteve",
    icon: <Gitlab className="h-4 w-4 hover:text-cyan-400 transition-colors" />,
  },
  {
    href: "https://wa.me/254796335895",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 hover:text-cyan-400 transition-colors"
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
    <section
      id="home"
      className="container mx-auto items-center justify-between px-4 sm:px-12 pt-4 pb-20 sm:py-24"
    >
      <div className="w-full md:text-left justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 ">
          <div className="p-0">
            <p className="text-base">Hello, it&apos;s me</p>
            <h1 className="text-2xl font-bold tracking-tight lg:text-4xl my-2">
              Steve Arnold
            </h1>
            <h2 className="text-xl lg:text-3xl font-semibold">
              And I&apos;m a{" "}
              <span className="text-black-700">Software Engineer</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-justify">
              Results-driven Full Stack Engineer crafting scalable, high-impact
              web applications using JavaScript, PHP, and Python.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-40 h-40 lg:w-52 lg:h-52 relative">
              <Image
                src="/profile-pic.png"
                alt="Steve Arnold Otieno"
                fill
                className="rounded-full object-cover shadow-xs"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-row h-full gap-2">
          <div className="mt-6 hidden">
            <Link
              href="/SteveOtieno_SoftwareEngineer_Resume.pdf"
              target="_blank"
              download
            >
              <Button className="bg-cyan-400 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black">
                Download CV
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex justify-center md:justify-start gap-x-2">
            {socialLinks.map((link, index) => (
              <Button
                asChild
                key={index}
                variant="outline"
                className="border border-cyan-400  hover:bg-cyan-500 transition-all"
              >
                <a
                  href={link.href}
                  // className="text-cyan-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
