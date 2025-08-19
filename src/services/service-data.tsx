// src/services/service-data.ts
import { Service } from "@/types/service";
import { CodeXml, Server, CloudCog, TrendingUp } from "lucide-react";

export const servicesData: Service[] = [
  {
    icon: <CodeXml size={48} className="text-cyan-400" />,
    title: "Frontend Development",
    description: "Building responsive, performant, and user-friendly interfaces using modern technologies like React, Next.js, and Tailwind CSS.",
    detailedDescription: "I specialize in creating modern, interactive user interfaces from the ground up. By leveraging powerful libraries and frameworks like React and Next.js, I build applications that are not only fast and scalable but also provide a seamless user experience across all devices.",
    keyPoints: [
      "Responsive design for mobile, tablet, and desktop.",
      "Component-based architecture with React & Next.js.",
      "Styling with Tailwind CSS and shadcn/ui.",
      "State management and API integration.",
    ],
  },
  {
    icon: <Server size={48} className="text-cyan-400" />,
    title: "Backend Development",
    description: "Architecting robust and scalable backend systems and APIs with Node.js (NestJS, Express) and PHP (Laravel), connected to SQL or NoSQL databases.",
    detailedDescription: "My expertise lies in architecting the backbone of web applications. I design and build secure, high-availability RESTful APIs and microservices using the Node.js and PHP ecosystems, ensuring efficient data flow and robust business logic.",
    keyPoints: [
      "RESTful API design and development.",
      "Expertise in Node.js (NestJS, Express) & PHP (Laravel).",
      "Database schema design (PostgreSQL, MySQL, MongoDB).",
      "Authentication and authorization (JWT, OAuth).",
    ],
  },
  {
    icon: <CloudCog size={48} className="text-cyan-400" />,
    title: "DevOps & Cloud Solutions",
    description: "Implementing CI/CD pipelines, containerizing applications with Docker, and deploying to cloud platforms like AWS, Heroku, and Render.",
    detailedDescription: "I bridge the gap between development and operations by implementing automated workflows and deployment strategies. Using tools like Docker and CI/CD pipelines, I ensure that applications are deployed reliably, consistently, and efficiently.",
    keyPoints: [
      "Containerization with Docker and Docker Compose.",
      "CI/CD pipeline implementation (GitLab CI, Jenkins).",
      "Cloud deployment to AWS, Heroku, and Render.",
      "Infrastructure as Code principles.",
    ],
  },
  {
    icon: <TrendingUp size={48} className="text-cyan-400" />,
    title: "SEO & Performance",
    description: "Optimizing applications for search engines through Server-Side Rendering, semantic HTML, fast load times, and technical SEO best practices.",
    detailedDescription: "A great application also needs to be discoverable. I focus on technical SEO and performance optimization from day one, using techniques like Server-Side Rendering (SSR) with Next.js, code splitting, and image optimization to achieve fast load times and high search rankings.",
    keyPoints: [
      "Server-Side Rendering (SSR) for improved SEO.",
      "Core Web Vitals optimization.",
      "Semantic HTML for accessibility and crawlers.",
      "Image and asset optimization.",
    ],
  },
];