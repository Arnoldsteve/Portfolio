import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Download,
  Mail,
  Linkedin,
  Github,
  Globe,
  MapPin,
  Phone,
  Calendar,
  Award,
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Gitlab,
} from "lucide-react";

export default function AboutPage() {
  const skills = {
    languages: [
      "JavaScript",
      "TypeScript",
      "PHP",
      "Python",
      "Java",
      "C#",
      "Go",
    ],
    frontend: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Mantine Core",
      "Bootstrap",
    ],
    backend: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Laravel",
      "Django",
      "FastAPI",
    ],
    databases: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Supabase",
      "Prisma",
    ],
    devops: [
      "Docker",
      "Git",
      "GitHub Actions",
      "GitLab CI/CD",
      "AWS",
      "Heroku",
    ],
  };

  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Conversion Increase", value: "30%" },
    { label: "Security Improvement", value: "95%" },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-4 sm:py-0 max-w-7xl mx-auto overflow-x-hidden">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center pt-8">
        {/* Left - Image */}
        <div className="relative  aspect-[10/10] rounded-lg overflow-hidden border-2 border-cyan-400/20 shadow-none">
          <Image
            src="/profile-pic2.png"
            alt="Steve Arnold Otieno"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold mb-2">
              Steve Arnold Otieno
            </h1>
            <p className="text-xl text-cyan-400 font-semibold mb-4">
              Full Stack Software Engineer
            </p>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Mombasa, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+254 796 335 895</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 py-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-cyan-400/10 rounded-lg border border-cyan-400/20"
              >
                <div className="text-2xl font-bold text-cyan-400">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-cyan-400 hover:bg-cyan-500 text-background font-bold"
              >
                <Mail className="mr-2" size={18} />
                Get in Touch
              </Button>
            </Link>
            {/* <Link
                  href={"/SteveOtieno_SoftwareEngineer_Resume.pdf"}
                  target="_blank"
                  download
                >
                  <Button size="lg" variant="outline">
                    <Download className="mr-2" size={18} />
                    Download CV
                  </Button>
                </Link> */}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://linkedin.com/in/steve-arnold-otieno"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/Arnoldsteve"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://gitlab.com/Arnoldsteve"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-colors"
            >
              <Gitlab size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="container mx-auto py-16 bg-muted/30">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My <span className="text-cyan-400">Story</span>
        </h2>
        <Card className="p-4">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            I'm a results-driven Full Stack Engineer with expertise in the
            React, Node.js, and PHP ecosystems. My passion lies in architecting
            robust backend systems and creating seamless user experiences that
            drive real business results.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I've demonstrated success in building and deploying high-impact,
            scalable applications, including a booking engine that increased
            conversion rates by 30% and a secure multi-tenant invoice system
            that reduced vulnerabilities by 95%. I leverage agile methodologies
            to enhance team velocity and deliver exceptional products that solve
            real-world problems.
          </p>
        </Card>
      </section>

      {/* Professional Experience */}
      <section className="container mx-auto  py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Professional <span className="text-cyan-400">Experience</span>
        </h2>

        <Card className="p-4">
          <div className="flex items-start gap-4 mb-6">
            <div className=" p-3 bg-cyan-400/10 rounded-lg">
              <Briefcase className="text-cyan-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Full Stack Developer</h3>
              <p className="text-cyan-400 font-semibold">
                iTravel Holidays (UK-based)
              </p>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Calendar size={16} />
                <span>March 2024 - Present</span>
                <span>•</span>
                <MapPin size={16} />
                <span>Mombasa, Kenya</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 ml-4 md:ml-16">
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
              <p className="text-muted-foreground">
                Spearheaded the development of a secure, multi-tenant invoice
                system with isolated database architecture, reducing
                cross-tenant vulnerabilities by 95%
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
              <p className="text-muted-foreground">
                Contributed to the main travel platform (itravelholidays.co.uk),
                directly resulting in a 30% increase in conversion rates and 25%
                reduction in booking abandonment
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
              <p className="text-muted-foreground">
                Engineered and optimized RESTful APIs, improving data flow
                efficiency between microservices by 45%
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
              <p className="text-muted-foreground">
                Implemented comprehensive Stripe payment gateway integration,
                achieving 99.8% payment success rate across thousands of daily
                transactions
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
              <p className="text-muted-foreground">
                Co-led bi-weekly sprint planning and retrospectives, improving
                team velocity by 25%
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground font-semibold mb-2">
              Tech Stack:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Express",
                "Fastify",
                "NestJS",
                "Next.js",
                "React",
                "TypeScript",
                "PHP",
                "MySQL",
                "Docker",
                "Stripe API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Technical Skills */}
      <section className="container mx-auto  py-16 bg-muted/30">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Technical <span className="text-cyan-400">Expertise</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Languages */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background border rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Frontend */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold">Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background border rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Backend */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold">Backend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background border rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Databases */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold">Databases</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.databases.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background border rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* DevOps */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold">DevOps & Cloud</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background border rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Methodologies */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="text-cyan-400" size={24} />
              <h3 className="text-xl font-bold">Methodologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Agile",
                "Scrum",
                "Kanban",
                "TDD",
                "Microservices",
                "REST APIs",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-background border rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Education */}
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Education & <span className="text-cyan-400">Certifications</span>
        </h2>

        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-400/10 rounded-lg">
              <GraduationCap className="text-cyan-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-cyan-400 font-semibold">
                Technical University of Mombasa (TUM)
              </p>
              <div className="flex items-center gap-2 text-muted-foreground mt-1 mb-4">
                <Calendar size={16} />
                <span>September 2020 - August 2024</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-cyan-400" size={20} />
                <span className="font-semibold">Second Class Honours</span>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">
                  Senior Year Project:
                </p>
                <p className="text-muted-foreground">
                  Developed a high-performance, multi-tenant invoice system,
                  architecting a secure, isolated database structure that became
                  a core component of a commercial platform.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* What Sets Me Apart */}
      <section className="container mx-auto  py-16 bg-muted/30">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What Sets Me <span className="text-cyan-400">Apart</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Results-Driven</h3>
            <p className="text-muted-foreground text-sm">
              I focus on metrics that matter - 30% conversion increases and 95%
              security improvements speak for themselves.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Full Stack Expertise</h3>
            <p className="text-muted-foreground text-sm">
              From frontend React to backend Node.js and PHP, I build complete
              solutions end-to-end.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Agile Mindset</h3>
            <p className="text-muted-foreground text-sm">
              I thrive in collaborative environments, improving team velocity by
              25% through effective agile practices.
            </p>
          </Card>
        </div>
      </section>

      {/* Languages */}
      <section className="container mx-auto  py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            <span className="text-cyan-400">Languages</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-xl mb-2">English</h3>
              <p className="text-muted-foreground">
                Professional Working Proficiency
              </p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[90%]" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-xl mb-2">Swahili</h3>
              <p className="text-muted-foreground">Native Proficiency</p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <Card className="p-4 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 text-center ">
        <h2 className="text-xl font-bold mb-4">
          Let's Build Something Great Together
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach
          out!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#contact">
            <Button
              size="lg"
              className="bg-cyan-400 w-full hover:bg-cyan-500 text-background font-bold"
            >
              <Mail className="mr-2" size={18} />
              Get in Touch
            </Button>
          </Link>
          <Link href="/#projects">
            <Button size="lg" variant="outline" className="w-full">
              View My Projects
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
