import Image from "next/image";
import { Button } from "@/components/ui/button";

export const About = () => {
  return (
    // We add an id="about" so the navbar link can jump to this section
    <section id="about" className="container mx-auto px-4 py-12 sm:py-24 bg-accent/20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-12 gap-y-10">
        
        {/* Left Column - Image */}
         <div className="hidden md:flex md:w-1/3 justify-center">
          <div className="w-72 h-72 lg:w-80 lg:h-80 relative">
            <Image
              src="/profile-pic2.png"
              alt="Steve Arnold Otieno"
              fill
              className="rounded-lg object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-4xl font-bold tracking-tight">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <h3 className="text-2xl font-semibold mt-2">
            Full Stack Software Engineer!
          </h3>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Results-driven Full Stack Engineer with expertise in the Node.js and PHP ecosystems. 
            Demonstrated success in building and deploying high-impact, scalable applications, 
            including a booking engine that increased conversion rates by 30% and a secure 
            multi-tenant invoice system that reduced vulnerabilities by 95%.
          </p>
           <div className="mt-6">
            <a href="#projects">
              <Button size="lg">Read More</Button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};