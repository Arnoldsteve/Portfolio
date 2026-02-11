import { Service } from "@/types/service";
import { Server, ShieldCheck, Monitor, Zap } from "lucide-react";

export const servicesData: Service[] = [
  {
    serviceId: 1,
    icon: <Monitor size={48} className="text-cyan-400" />,
    title: "SEO-Optimized Business Sites",
    description:
      "Establishing global digital authority. I build high-performance, mobile-first websites engineered with advanced SEO best practices to ensure you rank on Google and attract organic leads.",
    detailedDescription: "", 
    keyPoints: [], 
  },
  {
    serviceId: 2,
    icon: <ShieldCheck size={48} className="text-cyan-400" />,
    title: "Secure E-Commerce Solutions",
    description:
      "Full-service online stores designed for conversion. Featuring automated inventory, global payment gateways, and M-Pesa integration—all built on a secure, hacker-proof foundation.",
    detailedDescription: "",
    keyPoints: [],
  },
  {
    serviceId: 3,
    icon: <Server size={48} className="text-cyan-400" />,
    title: "Custom Web Applications (Apps)",
    description:
      "Scalable software built to solve specific business problems. From custom management dashboards to SaaS platforms, I engineer the 'brains' that automate your daily operations.",
    detailedDescription: "",
    keyPoints: [],
  },
  {
    serviceId: 4,
    icon: <Zap size={48} className="text-cyan-400" />,
    title: "Optimization & Maintenance",
    description:
      "I don't just launch and leave. I provide extreme speed optimization (Core Web Vitals), ironclad security updates, and reliable hosting management to keep your platform running 24/7.",
    detailedDescription: "",
    keyPoints: [],
  },
];