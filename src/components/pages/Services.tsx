"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { servicesData } from "@/services/service-data";

export const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="container mx-auto px-4 py-12 sm:py-24">
      <h2 className="text-3xl font-bold text-center">
        My <span className="text-cyan-400">Services</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {servicesData.map((service, index) => (
          <Card
            key={index}
            className="border-border/50 text-center p-6 flex flex-col items-center hover:border-cyan-400 transition-colors duration-300"
          >
            <CardHeader className="items-center w-full">
              <span>{service.icon}</span>
              <CardTitle className="mt-4">{service.title}</CardTitle>
            </CardHeader>

            <CardDescription className="mt-2 flex-grow">
              {service.description}
            </CardDescription>

            {expandedIndex === index && (
              <div className="mt-2 text-left text-muted-foreground">
                <p>{service.detailedDescription}</p>
                <h4 className="font-bold mt-2">Key Points:</h4>
                <ul className="list-disc list-inside mt-1">
                  {service.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <CardFooter className="mt-4 w-full">
              <Button
                variant={"outline"}
                onClick={() => toggleExpand(index)}
                className="w-full text-slate-900 font-bold border border-cyan-400  hover:bg-cyan-500 hover:text-white transition-all py-2"
              >
                {expandedIndex === index ? "Show Less" : "Read More"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
