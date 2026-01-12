"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projectsData } from "@/mock-data/project-list";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-20 sm:py-32"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Featured <span className="text-cyan-500">Engineering</span>
          </h2>
          <p className="text-lg text-slate-600">
            A selection of complex systems I have architected. I focus on solving real-world problems with robust, scalable code.
          </p>
        </div>
        <Link href="https://github.com/Arnoldsteve" target="_blank">
            <Button variant="outline" className="gap-2">
                View GitHub Profile <Github className="h-4 w-4" />
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <Card
            key={index}
            className="flex flex-col overflow-hidden border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 group"
          >
            {/* Image Area */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Content Area */}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {project.title}
                </CardTitle>
                {/* Optional: Add an icon or status indicator here */}
              </div>
            </CardHeader>

            <CardContent className="flex-grow pb-4">
              <CardDescription className="text-base text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </CardDescription>
              
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-slate-100 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-0 pb-6 px-6 flex gap-4">
              <Button asChild className="flex-1 bg-slate-900 hover:bg-slate-800">
                <Link href={`/project?projectId=${project.id}`}>
                  Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              {project.demo && (typeof project.demo === 'string' ? (
                 <Button asChild variant="outline" size="icon">
                    <a href={project.demo} target="_blank" rel="noreferrer" title="Live Demo">
                        <ExternalLink className="h-4 w-4" />
                    </a>
                 </Button>
              ) : null)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};