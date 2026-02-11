export interface ServiceDetail {
  serviceId: string;
  title: string;
  description: string;
  iconName: "Server" | "ShieldCheck" | "Zap" | "Monitor";
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  process: {
    title: string;
    description: string;
  }[];
  whyChoose: string;
}
