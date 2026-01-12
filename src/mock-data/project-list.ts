export const projectsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "GradeHub - Enterprise SaaS Platform",
    description:
      "A production-grade, multi-tenant School Management System featuring event-driven architecture, immutable financial ledgers, and RBAC security.",
    tags: ["NestJS", "PostgreSQL", "Event-Driven", "Docker"],
    github: "https://github.com/Arnoldsteve/gradehub-saas",
    demo: {
      storefront: "https://gradehub-demo.vercel.app", // Adjust if needed
      admin: "https://gradehub-admin.vercel.app",
    },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "iTravel - High-Availability Payment System",
    description:
      "Architectural case study of a high-traffic booking engine. Engineered a fault-tolerant payment layer achieving 99.8% transaction success rates.",
    tags: ["Node.js", "Stripe API", "Microservices", "Redis"],
    // Usually no GitHub for proprietary work, but demo link is good
    demo: "https://itravelholidays.co.uk",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "ArtisanBase - Headless E-Commerce",
    description:
      "A scalable, headless e-commerce solution decoupled into a NestJS backend and Next.js frontend, featuring Redis caching for high performance.",
    tags: ["NestJS", "Next.js", "TypeScript", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
    demo: {
      storefront: "https://artisan-base-storefront.vercel.app",
      admin: "https://artisan-base-dashboard.vercel.app",
    },
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Legacy Library Management System",
    description:
      "A foundational LAMP stack system handling 10,000+ records. Features custom session management and role-based access control without frameworks.",
    tags: ["PHP", "MySQL", "Legacy System", "MVC Pattern"],
    github: "https://github.com/Arnoldsteve/Library-Management",
  },
];