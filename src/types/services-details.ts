export interface ServiceDetail {
  serviceId: string;
  title: string;
  description: string;
  iconName: "Database" | "Code2" | "Cloud" | "TrendingUp";
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  process: {
    title: string;
    description: string;
  }[];
  whyChoose: string;
}
