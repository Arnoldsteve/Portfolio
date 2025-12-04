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
import { Github, Gitlab } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { projectsData } from "@/mock-data/project-list";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-12 sm:py-24 bg-accent/20"
    >
      <h2 className="text-3xl font-bold text-center">
        Latest <span className="text-cyan-400">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {projectsData.map((project, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between overflow-hidden hover:shadow-cyan-400/20 hover:shadow-lg transition-shadow duration-300 pt-0"
          >
            <CardHeader className="p-0 m-0 flex-none  transition-all hover:scale-102 overflow-hidden">
              <div className="aspect-video w-full relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <Link href={`/project?projectId=${project.id}`} className="block flex-1">
              <CardContent className="p-6 hover:text-blue-500 cursor-pointer">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardContent>
            </Link>
            <CardFooter className="pt-0 flex flex-col items-start gap-y-6">
              <div className="flex flex-wrap gap-2 line-clamp-3">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}{"...."}
              </div>

              <div className="flex justify-between w-full gap-2">
                <a
                  href={project.github || project.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-slate-900 font-bold border border-cyan-400 hover:bg-cyan-500 hover:text-white transition-all py-2"
                  >
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
                    {typeof project.demo === "object" &&
                      project.demo.storefront && (
                        <a
                          href={project.demo.storefront}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className=" bg-cyan-300 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black"
                          >
                            Storefront
                          </Button>
                        </a>
                      )}
                    {typeof project.demo === "object" && project.demo.admin && (
                      <a
                        href={project.demo.admin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className=" bg-cyan-300 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black"
                          variant="secondary"
                        >
                          Admin
                        </Button>
                      </a>
                    )}
                    {/* Handle string-style demo links */}
                    {typeof project.demo === "string" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="bg-cyan-300 hover:bg-cyan-500 hover:shadow-cyan-400/40 transition-all text-black"
                        >
                          Live Demo
                        </Button>
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
