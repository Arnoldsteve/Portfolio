import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { serviceDetails } from "@/services/service-details";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  Code2,
  Cloud,
  TrendingUp,
} from "lucide-react";

interface ServicePageProps {
  searchParams: Promise<{
    serviceId?: string;
  }>;
}

// Icon mapping
const iconMap = {
  Database: Database,
  Code2: Code2,
  Cloud: Cloud,
  TrendingUp: TrendingUp,
};

export default async function ServicePage({ searchParams }: ServicePageProps) {
  const params = await searchParams; // await the promise
  const serviceId = params?.serviceId;
  const service = serviceDetails.find((s) => s.serviceId === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Service Not Found
          </h1>
          <p className="text-muted-foreground">
            The Service ID is invalid or the Service does not exist.
          </p>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.iconName];

  return (
    <div className="min-h-screen px-4 sm:px-6 py-4 sm:py-0 max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="px-4 pt-4 pb-10">
        <Link href="/#services">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex flex-row">
            <IconComponent className="w-10 h-10 text-cyan-400 mr-5" />
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              <span></span>
              {service.title}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {service.description}
          </p>
        </div>

        {/* Overview */}
        <Card className="p-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            {service.overview}
          </p>
        </Card>
      </section>
      {/* Main Content */}
      <div className="space-y-12">
        {/* Key Features */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Technologies */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-6">Technologies & Tools</h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-cyan-400/10 text-cyan-400 rounded-lg border border-cyan-400/20 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>

        {/* Process */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-6">My Process</h2>
          <div className="space-y-6">
            {service.process.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400 text-background flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Why Choose This Service */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Why Choose This Service?</h2>
          <p className="text-muted-foreground leading-relaxed">
            {service.whyChoose}
          </p>
        </Card>

        {/* CTA Section */}
        <Card className="p-4 bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 border-cyan-400/20">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how I can help bring your project to life with my{" "}
              {service.title.toLowerCase()} expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/#contact">
                <Button
                  size="lg"
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-background font-bold"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/#projects">
                <Button size="lg" variant="outline" className="w-full">
                  View Related Projects
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
