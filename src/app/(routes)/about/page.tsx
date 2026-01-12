import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  Award,
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Gitlab,
  Zap,
  ShieldCheck,
  TrendingUp,
  Globe,
  Download
} from "lucide-react";

export default function AboutPage() {
  const skills = {
    languages: [
      "TypeScript",
      "JavaScript (ES6+)",
      "PHP",
      "Python",
      "SQL",
    ],
    backend: [
      "NestJS",
      "Node.js",
      "Express.js",
      "CodeIgniter",
      "Laravel",
      "FastAPI",
    ],
    frontend: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Redux",
    ],
    databases: [
      "PostgreSQL",
      "Redis",
      "MySQL",
      "Supabase",
      "Prisma ORM",
    ],
    devops: [
      "Docker",
      "GitHub Actions",
      "AWS",
      "CI/CD Pipelines",
      "Vercel",
    ],
  };

  const stats = [
    { label: "Payment Success Rate", value: "99.8%", icon: ShieldCheck },
    { label: "API Optimization", value: "45%", icon: Zap },
    { label: "Conversion Uplift", value: "30%", icon: TrendingUp },
    { label: "Security Reduction", value: "95%", icon: Server },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-4 sm:py-0 max-w-7xl mx-auto overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center pt-12 pb-16">
        {/* Left - Image */}
        <div className="relative aspect-[4/5] md:aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
          <Image
            src="/profile-pic2.png" // Ensure this matches your file
            alt="Steve Arnold Otieno"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 text-slate-900">
              Steve Arnold Otieno
            </h1>
            <p className="text-xl text-cyan-600 font-semibold mb-4 flex items-center gap-2">
              Backend-Focused Full Stack Engineer
            </p>
            <div className="flex flex-wrap gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-500" />
                <span>Mombasa, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Open to Remote Roles</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                    <stat.icon size={16} className="text-cyan-500" />
                    <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                    </div>
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
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
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8"
              >
                <Mail className="mr-2" size={18} />
                Contact Me
              </Button>
            </Link>
            <Link
                  href="/SteveOtieno_SoftwareEngineer_Resume.pdf"
                  target="_blank"
                  download
                >
                  <Button size="lg" variant="outline" className="border-slate-300">
                    <Download className="mr-2" size={18} />
                    Download CV
                  </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/steve-arnold-otieno"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-100 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/Arnoldsteve"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-100 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://gitlab.com/Arnoldsteve"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-100 rounded-lg hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              <Gitlab size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* --- PROFESSIONAL SUMMARY --- */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">
          The <span className="text-cyan-500">Engineer</span>
        </h2>
        <Card className="p-8 bg-slate-50/50 border-slate-200">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>
              I am a Backend-focused Software Engineer specializing in architecting scalable, multi-tenant SaaS platforms using <strong>Node.js (NestJS)</strong> and <strong>TypeScript</strong>. 
            </p>
            <p>
              I bridge the gap between legacy reliability and modern scalability. My deep expertise lies in building high-availability APIs, event-driven architectures, and immutable financial ledger systems. 
            </p>
            <p>
              Unlike many developers who focus solely on features, I focus on <strong>system integrity</strong>. Whether it's ensuring 99.8% payment success rates via idempotent webhooks or implementing granular Permission-Based Access Control (PBAC), I build software that businesses can rely on.
            </p>
          </div>
        </Card>
      </section>

      {/* --- PROFESSIONAL EXPERIENCE --- */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">
          Professional <span className="text-cyan-500">Journey</span>
        </h2>

        <div className="relative border-l-2 border-slate-200 ml-3 space-y-12">
            
            {/* Job 1 */}
            <div className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-white shadow-sm" />
                
                <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Full Stack Software Engineer</h3>
                            <p className="text-cyan-600 font-medium">iTravel Holidays (UK-based)</p>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                            <Calendar size={14} className="mr-2" />
                            March 2024 - Present
                        </div>
                    </div>

                    <ul className="space-y-3 ml-4 list-disc text-slate-600 marker:text-cyan-500">
                        <li>
                            <strong className="text-slate-900">Platform Engineering:</strong> Collaborated with senior engineers to refactor legacy codebases, optimizing RESTful API endpoints and contributing to a <strong>30% improvement in conversion rates</strong>.
                        </li>
                        <li>
                            <strong className="text-slate-900">Fintech Integration:</strong> Engineered a fault-tolerant Stripe payment gateway with webhook handlers, ensuring a <strong>99.8% transaction success rate</strong>.
                        </li>
                        <li>
                            <strong className="text-slate-900">System Architecture:</strong> Independently designed a secure, multi-tenant invoice module with strict database isolation, reducing cross-tenant risks by <strong>95%</strong>.
                        </li>
                        <li>
                            <strong className="text-slate-900">Performance:</strong> Identified and resolved N+1 query issues, reducing API response times by <strong>45%</strong>.
                        </li>
                        <li>
                            <strong className="text-slate-900">Agile Leadership:</strong> Championed code quality through peer reviews and actively improved team deployment velocity.
                        </li>
                    </ul>

                    <div className="mt-6 pt-4 border-t flex flex-wrap gap-2">
                        {["Node.js", "NestJS", "React", "MySQL", "Redis", "Docker", "AWS"].map(tech => (
                            <span key={tech} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>

        </div>
      </section>

      {/* --- TECHNICAL EXPERTISE --- */}
      <section className="container mx-auto py-16 bg-slate-50 -mx-4 px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Technical <span className="text-cyan-500">Arsenal</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Backend */}
          <Card className="p-6 border-t-4 border-t-cyan-500 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-50 rounded-lg"><Server className="text-cyan-600" size={24} /></div>
              <h3 className="text-xl font-bold">Backend Architecture</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Databases */}
          <Card className="p-6 border-t-4 border-t-purple-500 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg"><Database className="text-purple-600" size={24} /></div>
              <h3 className="text-xl font-bold">Data & Storage</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.databases.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

           {/* DevOps */}
           <Card className="p-6 border-t-4 border-t-orange-500 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-50 rounded-lg"><Cloud className="text-orange-600" size={24} /></div>
              <h3 className="text-xl font-bold">DevOps & Cloud</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Frontend */}
          <Card className="p-6 border-t-4 border-t-blue-500 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg"><Globe className="text-blue-600" size={24} /></div>
              <h3 className="text-xl font-bold">Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
           
           {/* Methodologies */}
           <Card className="p-6 border-t-4 border-t-green-500 shadow-sm md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg"><Wrench className="text-green-600" size={24} /></div>
              <h3 className="text-xl font-bold">Methodologies & Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Agile / Scrum", "TDD (Test Driven Dev)", "Microservices", "RESTful APIs", "System Design", "Git Flow"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* --- EDUCATION --- */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">
          Education & <span className="text-cyan-500">Foundation</span>
        </h2>

        <Card className="p-6 border-l-4 border-l-slate-900">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-slate-100 rounded-lg hidden sm:block">
              <GraduationCap className="text-slate-900" size={32} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    Bachelor of Science (B.Sc.) - Computer Science
                  </h3>
                  <span className="text-sm font-medium text-slate-500">2020 - 2024</span>
              </div>
              <p className="text-cyan-600 font-semibold mb-4">
                Technical University of Mombasa (TUM)
              </p>
              
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-sm font-bold text-slate-900 mb-2">
                  Capstone Project: Multi-Tenant Invoice Management System
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Architected a schema-shared multi-tenant architecture using <strong>PHP (CodeIgniter)</strong>. Implemented custom session-based data isolation logic to enforce privacy between tenants. This project bridged the gap between legacy web development and modern SaaS architecture.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
}