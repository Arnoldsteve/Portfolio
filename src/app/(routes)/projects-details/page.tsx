import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, Gitlab, CheckCircle } from "lucide-react";
import { projects } from "@/mock-data/projects-details";


interface PageProps {
  searchParams: {
    projectId?: string;
  };
}

export default function ProjectDetailsPage({ searchParams }: PageProps) {
  const projectId = Number(searchParams?.projectId);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-destructive mb-4">Project Not Found</h1>
            <p className="text-muted-foreground">The project ID is invalid or the project does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-16 sm:py-24 max-w-7xl mx-auto">
      {/* --- HERO SECTION --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-lg group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{project.title}</h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>
            )}
            {project.gitlab && (
              <a href={project.gitlab} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Gitlab className="w-4 h-4 mr-2" />
                  GitLab
                </Button>
              </a>
            )}
            {typeof project.demo === "string" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </a>
            )}
            {typeof project.demo === "object" && (
              <>
                {project.demo.storefront && (
                  <a href={project.demo.storefront} target="_blank" rel="noopener noreferrer">
                    <Button>Storefront Demo</Button>
                  </a>
                )}
                {project.demo.admin && (
                  <a href={project.demo.admin} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary">Admin Demo</Button>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Separator className="my-16 sm:my-24" />

      {/* --- ABOUT & KEY FEATURES --- */}
      <section className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">About This Project</h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {project.longDescription}
          </p>
        </div>
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </section>
      
      <Separator className="my-16 sm:my-24" />

      {/* --- TECH STACK SECTION --- */}
      {project.techStack && project.techStack.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {project.techStack.map((stack) => (
              <Card key={stack.category}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-center text-muted-foreground">{stack.category}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex flex-col gap-1">
                    {stack.techs.map(tech => (
                      <p key={tech} className="font-semibold text-sm">{tech}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Conditionally render separator only if there's a gallery */}
      {project.gallery && project.gallery.length > 0 && <Separator className="my-16 sm:my-24" />}
      
      {/* --- PROJECT GALLERY --- */}
      {project.gallery && project.gallery.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((imgSrc, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                <Image 
                  src={imgSrc} 
                  alt={`${project.title} gallery image ${index + 1}`} 
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}