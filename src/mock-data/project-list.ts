export const projectsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "GradeHub - Enterprise SaaS Platform",
    description:
      "A comprehensive, enterprise-level Management System designed to automate complex school operations. Engineered for high security and scalability, it features automated financial tracking, secure student data isolation, and a robust administrative dashboard.",
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
      "A high-performance Booking & Global Payment Platform engineered for a travel agency. I developed a fault-tolerant checkout system that ensures a 99.8% transaction success rate, providing a seamless and reliable experience for international travelers.",
    tags: ["Node.js", "Stripe API", "Microservices", "Redis"],
    // Usually no GitHub for proprietary work, but demo link is good
    demo: "https://itravelholidays.co.uk",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "ArtisanBase - Headless E-Commerce",
    description:
      "A modern, high-speed E-Commerce Platform built for high conversion and retail growth. Featuring a 'performance-first' architecture, it ensures lightning-fast product loading and a secure storefront capable of handling heavy traffic during sales.",
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
      "A robust Data Management System capable of handling over 10,000 records with precision. Built for long-term reliability, it provides high-security access control and efficient organization for large-scale institutional archives.",
    tags: ["PHP", "MySQL", "Legacy System", "MVC Pattern"],
    github: "https://github.com/Arnoldsteve/Library-Management",
  },
];