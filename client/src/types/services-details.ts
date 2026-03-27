export interface ServiceDetail {
  serviceId: string;
  title: string;
  description: string;
  iconName: "Globe" | "ShieldCheck" | "Zap" | "AppWindow" ;
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  process: {
    title: string;
    description: string;
  }[];
  whyChoose: string;
}
