"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { servicesData } from "@/services/service-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Services = () => {
  return (
    <section id="services" className="container mx-auto px-4 py-20 sm:py-32 bg-slate-50/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Core <span className="text-cyan-500">Solutions</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          I combine deep software engineering expertise with business logic to build high-performing digital products that are secure, reliable, and engineered for growth..
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => (
          <Card
            key={index}
            className="border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 group bg-white"
          >
            <CardHeader>
              <div className="mb-4 p-3 bg-cyan-50 w-fit rounded-xl group-hover:bg-cyan-100 transition-colors">
                {service.icon}
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardDescription className="px-6 pb-6 text-slate-600 leading-relaxed">
              {service.description}
            </CardDescription>

            {/* Optional: If you have detailed pages, keep this. If not, remove the footer. */}
            <CardFooter className="px-6 pb-6 pt-0">
              <Button
                asChild
                variant="ghost"
                className="p-0 h-auto font-semibold text-cyan-600 hover:text-cyan-700 hover:bg-transparent group/btn"
              >
                <Link href={`/service?serviceId=${service.serviceId}`} className="flex items-center gap-2">
                  Deep Dive <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};