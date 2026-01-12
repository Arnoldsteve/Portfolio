export interface ServiceDetail {
  serviceId: string;
  title: string;
  description: string;
  iconName: "Server" | "ShieldCheck" | "Cloud" | "Activity" | "TrendingUp";
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  process: {
    title: string;
    description: string;
  }[];
  whyChoose: string;
}
