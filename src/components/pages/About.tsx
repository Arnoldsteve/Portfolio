import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const About = () => {
  return (
    <section
      id="about"
      className="container mx-auto  px-4 sm:px-12 py-4 sm:py-24"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-12 gap-y-10">
        <div className="hidden md:flex md:w-1/3 justify-center">
          <div className="w-72 h-72 lg:w-80 lg:h-80 relative">
            <Image
              src="/profile-pic2.png"
              alt="Steve Arnold Otieno"
              fill
              className="rounded-lg object-cover shadow-xs"
            />
          </div>
        </div>

        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-4xl font-bold tracking-tight">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <h3 className="text-2xl font-semibold mt-2">
            Full Stack Software Engineer!
          </h3>
          <p className="mt-4 max-w-2xl text-muted-foreground text-justify">
            Results-driven Full Stack Engineer with expertise in Node.js, PHP
            and Python ecosystems. I have successfully built and deployed
            high-impact, scalable applications, including a booking engine that
            increased conversion rates by 30% and a secure multi-tenant invoice
            system that reduced vulnerabilities by 95%.
          </p>
          <div className="mt-6">
            <Button
              asChild
              variant={"outline"}
              size="lg"
              className="cursor-pointer w-full border-cyan-400 hover:bg-cyan-400 hover:shadow-cyan-400/40 transition-all text-blaxk"
            >
              <Link href={`/about`}>Read More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
