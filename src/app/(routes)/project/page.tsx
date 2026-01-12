import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, Gitlab, CheckCircle2, ArrowLeft, Layers, Image as ImageIcon } from "lucide-react";
import { projects } from "@/mock-data/projects-details";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

export default async function ProjectDetailsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const projectId = Number(params?.projectId);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    redirect("/"); // Or show a 404
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header for Back Button */}
      <div className="sticky top-16 z-40 w-full bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/#projects">
            <Button variant="ghost" className="group text-slate-600 hover:text-cyan-600">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Projects
            </Button>
            </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* --- HERO SECTION --- */}
        <section className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* Left: Image */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {project.title}
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100">
                        {tag}
                    </Badge>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                    {project.demo && (
                        <div className="flex gap-3">
                            {typeof project.demo === 'string' ? (
                                <Button asChild className="bg-slate-900 hover:bg-slate-800">
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                    </a>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild className="bg-slate-900 hover:bg-slate-800">
                                        <a href={project.demo.storefront} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" /> Storefront
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <a href={project.demo.admin} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-4 w-4" /> Admin Panel
                                        </a>
                                    </Button>
                                </>
                            )}
                        </div>
                    )}

                    {project.github && (
                        <Button asChild variant="outline">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Source Code
                            </a>
                        </Button>
                    )}
                    
                    {project.gitlab && (
                         <Button asChild variant="outline">
                            <a href={project.gitlab} target="_blank" rel="noopener noreferrer">
                                <Gitlab className="mr-2 h-4 w-4" /> GitLab Repo
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* --- MAIN CONTENT (Left Col) --- */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* About */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Layers className="h-6 w-6 text-cyan-500" /> Architectural Overview
                    </h2>
                    <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap leading-relaxed">
                        {project.longDescription}
                    </div>
                </section>

                {/* Key Features */}
                {project.keyFeatures && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Implementations</h2>
                        <div className="grid sm:grid-cols-1 gap-4">
                            {project.keyFeatures.map((feature, index) => (
                                <Card key={index} className="border-l-4 border-l-cyan-400 shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-cyan-500 shrink-0" />
                                        <span className="text-slate-700 font-medium">{feature}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <section>
                         <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <ImageIcon className="h-6 w-6 text-cyan-500" /> System Screenshots
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {project.gallery.map((imgSrc, index) => (
                                <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300">
                                    <Image
                                        src={imgSrc}
                                        alt={`Gallery ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* --- SIDEBAR (Right Col) --- */}
            <div className="space-y-8">
                {project.techStack && (
                    <Card className="bg-slate-50 border-slate-200 sticky top-32">
                        <CardHeader>
                            <CardTitle>Tech Stack</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {project.techStack.map((stack) => (
                                <div key={stack.category}>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        {stack.category}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {stack.techs.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-white border rounded text-sm font-medium text-slate-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>

        </div>

      </div>
    </div>
  );
}