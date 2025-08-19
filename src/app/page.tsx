import { About } from "@/components/pages/About";
import { Contact } from "@/components/pages/Contact";
import { Hero } from "@/components/pages/Hero";
import { Projects } from "@/components/pages/Projects";
import { Services } from "@/components/pages/Services";
import { Skills } from "@/components/pages/Skills";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Hero />
      <About />
      <Skills/>
      <Services />
      <Projects/>
      <Contact />
    </main>
  );
}