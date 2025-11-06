// src/components/Services.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { servicesData } from "@/services/service-data"; 
import { ServiceDetails } from "./ServiceDetails";

export const Services = () => {
  return (
    <section id="services" className="container mx-auto px-4 py-12 sm:py-24">
      <h2 className="text-3xl font-bold text-center">
        My <span className="text-cyan-400">Services</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {servicesData.map((service, index) => (
          <Card key={index} className=" border-border/50 text-center p-6 flex flex-col items-center hover:border-cyan-400 transition-colors duration-300">
            <CardHeader className="items-center w-full">
              {service.icon}
              <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
            </CardHeader>
            <CardDescription className="mt-2 flex-grow">
              {service.description}
            </CardDescription>
            <CardFooter className="mt-6">
              <ServiceDetails service={service} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};