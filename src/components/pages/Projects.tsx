import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { Button } from "../ui/button";
// import { Button } from "./ui/button";

const projectsData = [
  {
    image: "/project-artisanbase.png", // Replace with your actual filename
    title: "Multi-Tenant E-Commerce Platform",
    description: "A scalable e-commerce solution with a NestJS backend and distinct Next.js frontends for admins and storefronts. Features isolated databases for security.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
  },
  {
    image: "/project-library.png", // Replace with your actual filename
    title: "Online Library Management System",
    description: "A comprehensive system for over 500 users, featuring role-based access control and managing a database of 10,000+ book records.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "#", // Add link if available
  },
  {
    image: "/project-weather.png", // Replace with your actual filename
    title: "Vanilla JS Weather Application",
    description: "A responsive weather app demonstrating strong core JavaScript skills and asynchronous API handling with the OpenWeatherMap API.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "API"],
    github: "https://github.com/Arnoldsteve/Weather-app-vanilla-js",
  },
];

export const Projects = () => {
  return (
    // We add an id="projects" for navbar linking
    <section id="projects" className="container mx-auto px-4 py-12 sm:py-24 bg-accent/20">
      <h2 className="text-3xl font-bold text-center">
        Latest <span className="text-cyan-400">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {projectsData.map((project, index) => (
          <Card key={index} className="flex flex-col overflow-hidden hover:shadow-cyan-400/20 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="aspect-video w-full relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex flex-col items-start gap-y-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                        <Github className="mr-2 h-4 w-4"/>
                        View Code
                    </Button>
                </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};