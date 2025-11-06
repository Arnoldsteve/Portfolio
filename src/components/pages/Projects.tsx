import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Gitlab } from "lucide-react";
import { Button } from "../ui/button";

const projectsData = [
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "Multi-Tenant E-Commerce Platform",
    description: "A scalable e-commerce solution with a NestJS backend and distinct Next.js frontends for admins and storefronts. Features isolated databases for security.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
    demo: {
      storefront: "https://artisan-base-storefront.vercel.app",
      admin: "https://artisan-base-dashboard.vercel.app"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "SaTechs Solutions Platform",
    description: "A multi-app Next.js monorepo platform with separate public and admin views. The public side showcases services offered to users, while the admin panel manages operations and content.",
    tags: ["Next.js", "TypeScript", "Monorepo", "Admin Panel", "Public App"],
    gitlab: "https://gitlab.com/satechs/satechs-monorepo",
    demo: "https://satechs-web.onrender.com/"
  },
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", 
    title: "Online Library Management System",
    description: "A comprehensive system for over 500 users, featuring role-based access control and managing a database of 10,000+ book records.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com/Arnoldsteve/Library-Management", 
  },
  {
    image: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b", 
    title: "Vanilla JS Weather Application",
    description: "A responsive weather app demonstrating strong core JavaScript skills and asynchronous API handling with the OpenWeatherMap API.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "API"],
    github: "https://github.com/Arnoldsteve/Weather-app-vanilla-js",
    demo: "https://weather-app-vanilla-js-mocha.vercel.app/"
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="container mx-auto px-4 py-12 sm:py-24 bg-accent/20">
      <h2 className="text-3xl font-bold text-center">
        Latest <span className="text-cyan-400">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
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
            <CardFooter className="pt-0 flex flex-col items-start gap-y-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>

              <div className="flex justify-between w-full gap-2">
                <a href={project.github || project.gitlab} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    {project.github ? (
                      <Github className="mr-2 h-4 w-4" />
                    ) : (
                      <Gitlab className="mr-2 h-4 w-4" />
                    )}
                    View Code
                  </Button>
                </a>

                {project.demo && (
                  <div className="flex gap-2">
                    {/* Handle object-style demo links */}
                    {typeof project.demo === 'object' && project.demo.storefront && (
                      <a href={project.demo.storefront} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="cursor-pointer  bg-cyan-300 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black">Storefront</Button>
                      </a>
                    )}
                    {typeof project.demo === 'object' && project.demo.admin && (
                      <a href={project.demo.admin} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="cursor-pointer  bg-cyan-300 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black" variant="secondary">Admin</Button>
                      </a>
                    )}
                    {/* Handle string-style demo links */}
                    {typeof project.demo === 'string' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="cursor-pointer bg-cyan-300 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black">Live Demo</Button>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}; 