import { Service } from "@/types/service";
import { Server, ShieldCheck, Activity, Database } from "lucide-react";

export const servicesData: Service[] = [
  {
    serviceId: 1,
    icon: <Server size={48} className="text-cyan-400" />,
    title: "SaaS Platform Architecture",
    description:
      "Designing secure, multi-tenant architectures that scale. I specialize in data isolation strategies (Row-Level Security) and schema design.",
    detailedDescription: "", // Not used on homepage card
    keyPoints: [], // Not used on homepage card
  },
  {
    serviceId: 2,
    icon: <ShieldCheck size={48} className="text-cyan-400" />,
    title: "Fintech & Ledger Systems",
    description:
      "Engineering immutable, double-entry financial ledgers. I build systems that handle money with ACID compliance and 99.8% transaction reliability.",
    detailedDescription: "",
    keyPoints: [],
  },
  {
    serviceId: 3,
    icon: <Activity size={48} className="text-cyan-400" />,
    title: "Event-Driven Systems",
    description:
      "Decoupling complex business logic using Pub/Sub patterns. I ensure heavy background tasks don't slow down the user experience.",
    detailedDescription: "",
    keyPoints: [],
  },
  {
    serviceId: 4,
    icon: <Database size={48} className="text-cyan-400" />,
    title: "High-Performance APIs",
    description:
      "Optimizing database queries and API endpoints. I use Redis caching and proper indexing to reduce latency by up to 45%.",
    detailedDescription: "",
    keyPoints: [],
  },
];