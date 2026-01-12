import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { serviceDetails } from "@/services/service-details";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  Code2,
  Cloud,
  TrendingUp,
  Server,
  ShieldCheck,
  Activity,
  Layers
} from "lucide-react";
import { redirect } from "next/navigation";

interface ServicePageProps {
  searchParams: Promise<{
    serviceId?: string;
  }>;
}

// Icon mapping matching your new Service Data IDs/Types
// Note: Ensure these match the iconNames used in service-details.ts
const iconMap: Record<string, any> = {
  Database: Database,
  Code2: Code2,
  Cloud: Cloud,
  TrendingUp: TrendingUp,
  Server: Server,
  ShieldCheck: ShieldCheck,
  Activity: Activity,
};

export default async function ServicePage({ searchParams }: ServicePageProps) {
  const params = await searchParams;
  // Convert to string/number safely depending on how your data is set up
  // Assuming serviceDetails IDs are strings based on previous code
  const serviceId = params?.serviceId; 
  const service = serviceDetails.find((s) => s.serviceId === serviceId);

  if (!service) {
    redirect("/");
  }

  // Fallback icon if name doesn't match
  const IconComponent = iconMap[service.iconName] || Layers;

  return (
    <div className="min-h-screen bg-white">
       {/* Sticky Header for Back Button */}
       <div className="sticky top-16 z-40 w-full bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/#services">
            <Button variant="ghost" className="group text-slate-600 hover:text-cyan-600">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Expertise
            </Button>
            </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-cyan-50 rounded-2xl mb-6">
            <IconComponent className="w-12 h-12 text-cyan-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {service.description}
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* --- LEFT COLUMN (Main Content) --- */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Overview */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Strategic Approach</h2>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                        {service.overview}
                    </div>
                </section>

                {/* Key Features */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Capabilities</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {service.keyFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Engineering Process</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {service.process.map((step, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                {/* Icon/Number */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-cyan-100 text-slate-500 group-hover:text-cyan-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                                    <span className="font-bold text-sm">{index + 1}</span>
                                </div>
                                
                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* --- RIGHT COLUMN (Sidebar) --- */}
            <div className="space-y-8">
                
                {/* Tech Stack */}
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader>
                        <CardTitle>Tools & Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="bg-white text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 border border-slate-200 py-1.5 px-3">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Why Choose Me */}
                <Card className="bg-slate-900 text-white border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-cyan-400">Why Me?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            {service.whyChoose}
                        </p>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="sticky top-32">
                    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100">
                        <CardContent className="p-6 text-center space-y-4">
                            <h3 className="font-bold text-slate-900">Need this expertise?</h3>
                            <p className="text-sm text-slate-600">Let's discuss how I can architect this solution for you.</p>
                            <Link href="/#contact" className="block">
                                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold">
                                    Start Conversation
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}