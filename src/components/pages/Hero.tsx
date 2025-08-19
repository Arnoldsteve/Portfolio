'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Gitlab, Linkedin } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-12 sm:py-24">
      {/* Left Column - Text Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <p className="text-lg">Hello, it's me</p>
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl my-2">
          Steve Arnold
        </h1>
        <h2 className="text-3xl lg:text-4xl font-semibold">
          And I'm a{" "}
          <TypeAnimation
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
          />
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Results-driven engineer building scalable and high-impact web
          applications in the Node.js and PHP ecosystems.
        </p>
        
        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center md:justify-start gap-x-4">
          <a href="https://linkedin.com/your-profile" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-8 w-8 hover:text-cyan-400 transition-colors" />
          </a>
          <a href="https://github.com/Arnoldsteve" target="_blank" rel="noopener noreferrer">
            <Github className="h-8 w-8 hover:text-cyan-400 transition-colors" />
          </a>
          <a href="https://gitlab.com/your-profile" target="_blank" rel="noopener noreferrer">
            <Gitlab className="h-8 w-8 hover:text-cyan-400 transition-colors" />
          </a>
        </div>

        {/* Action Button */}
        <div className="mt-8">
            <Button size="lg">Download CV</Button>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
          <Image
            src="/profile-pic.png" 
            alt="Steve Arnold Otieno"
            fill
            className="rounded-full object-cover border-4 border-cyan-400 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};