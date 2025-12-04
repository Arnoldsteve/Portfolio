import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, Gitlab, CheckCircle } from "lucide-react";

// ✅ SAME DATA STRUCTURE AS YOUR CARDS (but now expanded)
const projects = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Multi-Tenant E-Commerce Platform",
    description:
      "A scalable e-commerce solution with a NestJS backend and distinct Next.js frontends for admins and storefronts. Features isolated databases for security.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
    demo: {
      storefront: "https://artisan-base-storefront.vercel.app",
      admin: "https://artisan-base-dashboard.vercel.app",
    },
    longDescription:
      "This is a secure multi-tenant e-commerce platform with separate dashboards for admins and storefront users. It uses isolated tenant databases, role-based access control, and scalable microservice architecture with NestJS and Next.js.",
    keyFeatures: [
      "Secure Multi-Tenant Architecture",
      "Role-Based Access Control (RBAC)",
      "Isolated Tenant Databases via PostgreSQL Schemas",
      "Rotating Refresh Tokens for Authentication",
      "Separate Admin Dashboard and Public Storefront",
      "Prisma ORM for Type-Safe Database Access",
    ],
    techStack: [
      { category: "Frontend", techs: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React Query"] },
      { category: "Backend", techs: ["NestJS", "TypeScript", "Prisma"] },
      { category: "Database", techs: ["PostgreSQL (Supabase)", "Redis"] },
      { category: "Authentication", techs: ["JWT", "Clerk (Multi-tenant)"] },
      { category: "DevOps", techs: ["Docker", "Vercel", "Railway"] },
    ],
    gallery: [
      // Replace with your actual image paths in the /public folder
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  // ... add the new fields to your other projects ...
];

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
      <div className="min-h-screen flex items-center justify-center text-xl">
        ❌ Project not found. Invalid project ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-16 sm:py-24 max-w-7xl mx-auto">
      {/* --- HERO SECTION --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
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

      {/* <Separator className="my-16 sm:my-24" /> */}

      {/* --- ABOUT & KEY FEATURES --- */}
      <section className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">About This Project</h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            {project.longDescription}
          </p>
        </div>
        {project.keyFeatures && (
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
      
      {/* <Separator className="my-16 sm:my-24" /> */}

      {/* --- TECH STACK SECTION --- */}
      {project.techStack && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {project.techStack.map((stack) => (
              <Card key={stack.category} className="text-center">
                <CardHeader>
                  <CardTitle className="text-base font-medium text-muted-foreground">{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {stack.techs.map(tech => (
                      <p key={tech} className="font-semibold">{tech}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* <Separator className="my-16 sm:my-24" /> */}
      
      {/* --- PROJECT GALLERY --- */}
      {project.gallery && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((imgSrc, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                <Image 
                  src={imgSrc} 
                  alt={`${project.title} gallery image ${index + 1}`} 
                  fill
                  className="object-cover" 
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}