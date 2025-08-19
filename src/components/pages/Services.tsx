import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeXml, Server, CloudCog } from "lucide-react"; // Relevant icons

const servicesData = [
  {
    icon: <CodeXml size={48} className="text-cyan-400" />,
    title: "Frontend Development",
    description: "Building responsive, performant, and user-friendly interfaces using modern technologies like React, Next.js, and Tailwind CSS."
  },
  {
    icon: <Server size={48} className="text-cyan-400" />,
    title: "Backend Development",
    description: "Architecting robust and scalable backend systems and APIs with Node.js (NestJS, Express) and PHP (Laravel), connected to SQL or NoSQL databases."
  },
  {
    icon: <CloudCog size={48} className="text-cyan-400" />,
    title: "DevOps & Cloud Solutions",
    description: "Implementing CI/CD pipelines, containerizing applications with Docker, and deploying to cloud platforms like AWS, Heroku, and Render."
  },
];

export const Services = () => {
  return (
    <section id="services" className="container mx-auto px-4 py-12 sm:py-24">
      <h2 className="text-3xl font-bold text-center">
        What I <span className="text-cyan-400">Offer</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {servicesData.map((service, index) => (
          <Card key={index} className="bg-accent/30 border-border/50 text-center flex flex-col items-center p-6 hover:border-cyan-400 transition-colors duration-300">
            <CardHeader className="items-center">
              {service.icon}
              <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
            </CardHeader>
            <CardDescription className="mt-2">
              {service.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
};