"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Gitlab, Linkedin } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-12 sm:py-24">
      {/* Left Column - Text Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <p className="text-lg">Hello, it&apos;s me</p>
        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl my-2">
          Steve Arnold
        </h1>
        <h2 className="text-xl lg:text-2xl font-semibold">
          And I&apos;m a{" "}
          <span className="text-black-700"> Software Engineer</span>
          {/* <TypeAnimation
            sequence={[
              "Full Stack Engineer",
              2000,
              "Backend Developer",
              2000,
              "PHP Expert",
              2000,
              "Node.js Specialist",
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="text-cyan-400"
            repeat={Infinity}
          /> */}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Results-driven engineer building scalable and high-impact web
          applications in the JavaScript, PHP and Python ecosystems.
        </p>

        <div className="mt-6 flex flex-row h-full justify-between">
          <div className="mt-6 flex justify-center md:justify-start gap-x-4">
            <Button variant={"outline"}>
              <a
                href="https://linkedin.com/in/steve-arnold-otieno"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 hover:text-cyan-400 transition-colors" />
              </a>
            </Button>
            <Button variant={"outline"}>
              <a
                href="https://github.com/Arnoldsteve"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 hover:text-cyan-400 transition-colors" />
              </a>
            </Button>
            <Button variant={"outline"}>
              <a
                href="https://gitlab.com/Arnoldsteve"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Gitlab className="h-4 w-4 hover:text-cyan-400 transition-colors" />
              </a>
            </Button>
          </div>

          <div className="mt-6">
            <Link
              href="/SteveOtieno_SoftwareEngineer_Resume.pdf"
              target="_blank"
              download
            >
              <Button
                // size="sm"
                className="cursor-pointer bg-cyan-400 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black"
              >
                Download CV
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
          <Image
            src="/profile-pic.png"
            alt="Steve Arnold Otieno"
            fill
            className="rounded-full object-cover shadow-xs"
          />
        </div>
      </div>
    </section>
  );
};
