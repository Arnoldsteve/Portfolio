import { ServiceDetail } from "@/types/services-details";

export const serviceDetails: ServiceDetail[] = [
  {
    serviceId: "1",
    title: "Backend Development",
    description:
      "Architecting robust and scalable backend systems and APIs with Node.js (NestJS, Express) and PHP (Laravel), connected to SQL or NoSQL databases.",
    iconName: "Database",
    overview:
      "I specialize in building high-performance backend systems that power modern web applications. With expertise in Node.js and PHP frameworks, I create scalable APIs, implement complex business logic, and ensure your application's foundation is solid, secure, and maintainable.",
    keyFeatures: [
      "RESTful and GraphQL API development",
      "Database design and optimization",
      "Authentication and authorization systems",
      "Microservices architecture",
      "Third-party API integrations",
      "Comprehensive API documentation",
      "Performance monitoring and optimization",
      "Automated testing and CI/CD pipelines",
    ],
    technologies: [
      "Node.js",
      "NestJS",
      "Express",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
    ],
    process: [
      {
        title: "Requirements Analysis",
        description:
          "Understanding your business needs, data models, and system requirements to design the optimal architecture.",
      },
      {
        title: "Database Design",
        description:
          "Creating efficient database schemas with proper relationships, indexes, and optimization strategies.",
      },
      {
        title: "API Development",
        description:
          "Building robust, well-documented APIs with proper error handling, validation, and security measures.",
      },
      {
        title: "Testing & Documentation",
        description:
          "Implementing comprehensive tests and creating clear API documentation for seamless integration.",
      },
      {
        title: "Deployment & Monitoring",
        description:
          "Deploying to production with proper monitoring, logging, and performance tracking in place.",
      },
    ],
    whyChoose:
      "A solid backend is the foundation of any successful application. I focus on writing clean, maintainable code that scales with your business. With experience in both SQL and NoSQL databases, I can choose the right tools for your specific needs and ensure your backend can handle growth.",
  },
  {
    serviceId: "2",
    title: "Frontend Development",
    description:
      "Building responsive, performant, and user-friendly interfaces using modern technologies like React, Next.js, and Tailwind CSS.",
    iconName: "Code2",
    overview:
      "I create modern, responsive web interfaces that provide exceptional user experiences across all devices. Using cutting-edge technologies like React and Next.js, I build fast, accessible, and visually appealing applications that engage users and drive results.",
    keyFeatures: [
      "Responsive design for all devices",
      "Component-based architecture",
      "State management solutions",
      "Performance optimization",
      "Accessibility compliance (WCAG)",
      "Progressive Web Apps (PWA)",
      "Animation and micro-interactions",
      "Cross-browser compatibility",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Zustand",
      "Framer Motion",
      "shadcn/ui",
      "React Query",
      "Vite",
    ],
    process: [
      {
        title: "Design Review",
        description:
          "Analyzing designs and specifications to ensure feasibility and optimal user experience.",
      },
      {
        title: "Component Development",
        description:
          "Building reusable, maintainable components with proper type safety and documentation.",
      },
      {
        title: "State Management",
        description:
          "Implementing efficient state management solutions for complex application logic.",
      },
      {
        title: "Optimization",
        description:
          "Optimizing bundle size, load times, and runtime performance for the best user experience.",
      },
      {
        title: "Testing & Launch",
        description:
          "Thorough testing across devices and browsers before deployment to production.",
      },
    ],
    whyChoose:
      "First impressions matter. I create interfaces that not only look great but perform exceptionally well. With a focus on user experience, accessibility, and performance, I ensure your application stands out and keeps users engaged.",
  },
  {
    serviceId: "3",
    title: "DevOps & Cloud Solutions",
    description:
      "Implementing CI/CD pipelines, containerizing applications with Docker, and deploying to cloud platforms like AWS, Heroku, and Render.",
    iconName: "Cloud",
    overview:
      "I help teams ship faster and more reliably through modern DevOps practices and cloud infrastructure. From automated deployments to containerization and cloud architecture, I ensure your applications are scalable, secure, and easy to maintain.",
    keyFeatures: [
      "CI/CD pipeline setup and optimization",
      "Docker containerization",
      "Kubernetes orchestration",
      "Cloud infrastructure setup (AWS, Azure, GCP)",
      "Infrastructure as Code (Terraform)",
      "Monitoring and logging solutions",
      "Automated backup and disaster recovery",
      "Security best practices implementation",
    ],
    technologies: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Heroku",
      "Render",
      "GitHub Actions",
      "GitLab CI",
      "Terraform",
      "Nginx",
      "Prometheus",
    ],
    process: [
      {
        title: "Infrastructure Assessment",
        description:
          "Evaluating current infrastructure and identifying opportunities for improvement and automation.",
      },
      {
        title: "Containerization",
        description:
          "Dockerizing applications for consistent environments across development and production.",
      },
      {
        title: "Pipeline Setup",
        description:
          "Creating automated CI/CD pipelines for testing, building, and deploying code.",
      },
      {
        title: "Cloud Deployment",
        description:
          "Deploying to cloud platforms with proper scaling, security, and monitoring configurations.",
      },
      {
        title: "Monitoring & Maintenance",
        description:
          "Setting up monitoring, alerting, and maintaining infrastructure for optimal performance.",
      },
    ],
    whyChoose:
      "Manual deployments and infrastructure management slow down development and increase risk. I automate your deployment pipeline and set up robust cloud infrastructure so your team can focus on building features while maintaining high reliability and security.",
  },
  {
    serviceId: "4",
    title: "SEO & Performance",
    description:
      "Optimizing applications for search engines through Server-Side Rendering, semantic HTML, fast load times, and technical SEO best practices.",
    iconName: "TrendingUp",
    overview:
      "A great application also needs to be discoverable. I implement technical SEO strategies and performance optimizations to ensure your application ranks well in search engines, loads quickly, and provides an excellent user experience that keeps visitors engaged.",
    keyFeatures: [
      "Server-Side Rendering (SSR) implementation",
      "Core Web Vitals optimization",
      "Semantic HTML and structured data",
      "Image and asset optimization",
      "Code splitting and lazy loading",
      "Mobile-first optimization",
      "Technical SEO audits",
      "Performance monitoring and reporting",
    ],
    technologies: [
      "Next.js",
      "React",
      "Lighthouse",
      "Google Search Console",
      "Schema.org",
      "Sitemap generation",
      "Web Vitals",
      "CDN integration",
      "Image optimization tools",
    ],
    process: [
      {
        title: "Technical Audit",
        description:
          "Comprehensive analysis of current performance and SEO issues using industry-standard tools.",
      },
      {
        title: "SSR Implementation",
        description:
          "Setting up Server-Side Rendering with Next.js for improved SEO and initial load times.",
      },
      {
        title: "Performance Optimization",
        description:
          "Optimizing images, code splitting, lazy loading, and other techniques to improve load times.",
      },
      {
        title: "SEO Enhancement",
        description:
          "Implementing structured data, meta tags, sitemaps, and other SEO best practices.",
      },
      {
        title: "Monitoring & Iteration",
        description:
          "Continuous monitoring of performance metrics and search rankings with ongoing improvements.",
      },
    ],
    whyChoose:
      "Speed and discoverability directly impact your bottom line. I focus on technical SEO and performance optimization from day one, using Server-Side Rendering with Next.js, code splitting, and image optimization to achieve fast load times and high search rankings. Better performance means better user experience and better business results.",
  },
];