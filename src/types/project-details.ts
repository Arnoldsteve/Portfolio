export interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: string[];
  github?: string; // 👈 Made Optional
  gitlab?: string; // 👈 Made Optional (Fixes the build error)
  demo?: string | { storefront: string; admin: string }; // Optional & Union type
  longDescription: string;
  keyFeatures?: string[];
  techStack?: { category: string; techs: string[] }[];
  gallery?: string[];
}