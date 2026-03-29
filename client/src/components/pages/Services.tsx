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
import { ArrowRight, BotMessageSquare } from "lucide-react"; // Added icon
import { useProactiveTrigger } from "@/hooks/use-proactive-trigger"; // Import hook

export const Services = () => {
  const { triggerTopic } = useProactiveTrigger();

  return (
    <section id="services" className="container mx-auto px-4 py-20 sm:py-32 bg-slate-50/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Core <span className="text-cyan-500">Solutions</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          I combine deep software engineering expertise with business logic to build high-performing digital products...
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => (
          <Card
            key={index}
            className="border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 group bg-white flex flex-col h-full cursor-pointer"
            // V3 UX: Nudge the AI when they show interest in a specific card
            onMouseEnter={() => {
                 // Optional: Silent "warm up" of the AI 
            }}
          >
            <CardHeader>
              <div className="mb-4 p-3 bg-cyan-50 w-fit rounded-xl group-hover:bg-cyan-100 transition-colors">
                {service.icon}
              </div>
              <CardTitle className="font-bold text-slate-900">
                {service.title}
              </CardTitle>
            </CardHeader>

            <CardDescription className="px-6 pb-6 text-slate-600 leading-relaxed flex-1">
              {service.description}
            </CardDescription>

            <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
              <Button
                asChild
                variant="ghost"
                className="p-0 h-auto font-semibold text-cyan-600 hover:text-cyan-700 hover:bg-transparent group/btn"
              >
                <Link 
                  href={`/service?serviceId=${service.serviceId}`} 
                  className="flex items-center gap-2"
                  // V3 Logic: Trigger AI conversation about this specific service
                  onClick={() => triggerTopic(`Steve's approach to ${service.title}`)}
                >
                  Deep Dive <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>

              {/* V3 UI: Explicit AI Chat Trigger */}
              {/* <Button
                variant="outline"
                size="sm"
                className="rounded-full border-cyan-200 text-cyan-600 hover:bg-cyan-50 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => triggerTopic(`technical challenges in ${service.title}`)}
              >
                <BotMessageSquare className="h-4 w-4" />
                Ask AI
              </Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};