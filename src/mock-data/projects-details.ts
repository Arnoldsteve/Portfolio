import { Project } from "@/types/project-details";


export const projects: Project[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "GradeHub - Enterprise SaaS Platform",
    description:
      "A production-grade, multi-tenant School Management System featuring event-driven architecture and an immutable financial ledger.",
    tags: ["NestJS", "PostgreSQL", "Event-Driven", "Docker", "PBAC"],
    github: "https://github.com/Arnoldsteve/gradehub-saas", 
    demo: "https://gradehub-demo.vercel.app", 
    longDescription:
      "GradeHub is an enterprise-level SaaS platform designed to manage complex educational operations. Unlike standard CRUD applications, GradeHub solves critical data integrity problems using advanced patterns. \n\nI architected a double-entry ledger system to track student fees with ACID compliance, ensuring zero calculation drift. I also decoupled the business logic using an Event-Driven Architecture (Pub/Sub), allowing heavy operations like PDF generation and Activity Logging to happen asynchronously without blocking the user interface.",
    keyFeatures: [
      "Immutable Double-Entry Ledger System for financial accuracy",
      "Event-Driven Architecture (NestJS Event Emitter) for async processing",
      "Permission-Based Access Control (PBAC) using Custom Guards",
      "Client-side PDF Generation for Report Cards and Receipts",
      "Row-Level Security ensuring strict data isolation per tenant",
      "Real-time Dashboard Analytics with Recharts",
    ],
    techStack: [
      {
        category: "Backend",
        techs: ["NestJS", "TypeScript", "Prisma", "PostgreSQL"],
      },
      { category: "Frontend", techs: ["Next.js", "React Query", "Shadcn UI", "Tailwind"] },
      { category: "Architecture", techs: ["Event Emitter", "Repository Pattern", "PBAC"] },
      { category: "DevOps", techs: ["Docker", "GitHub Actions", "Vercel"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "iTravel - High-Availability Payment System",
    description:
      "Architectural case study of a high-traffic travel booking engine. Focused on payment reliability and secure invoice generation.",
    tags: ["Node.js", "Stripe API", "Microservices", "Redis", "Security"],
    demo: "https://itravelholidays.co.uk", 
    longDescription:
      "As a core contributor to the iTravel platform, I focused on stability and revenue assurance. The challenge was handling global bookings with high reliability. \n\nI engineered a fault-tolerant payment layer integrating Stripe with idempotent webhook handling, achieving a 99.8% transaction success rate. Additionally, I designed a secure, isolated Invoice Generation module that eliminated cross-tenant data leakage risks, a critical compliance requirement.",
    keyFeatures: [
      "Idempotent Payment Processing (Stripe Integration)",
      "Secure Multi-Tenant Invoice Generation",
      "API Response Time Optimization (reduced by 45%)",
      "CI/CD Pipeline Automation with Jenkins",
      "High-Availability Booking Engine Logic",
    ],
    techStack: [
      { category: "Backend", techs: ["Node.js", "Express", "MySQL", "Redis"] },
      { category: "Integrations", techs: ["Stripe API", "SendGrid", "Twilio"] },
      { category: "DevOps", techs: ["AWS EC2", "Jenkins", "Docker"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "ArtisanBase - Headless E-Commerce",
    description:
      "A scalable e-commerce solution with a NestJS backend and distinct Next.js frontends for admins and storefronts.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
    demo: {
      storefront: "https://artisan-base-storefront.vercel.app",
      admin: "https://artisan-base-dashboard.vercel.app",
    },
    longDescription:
      "Artisan Base represents a modern 'Headless' e-commerce approach. Instead of a monolith, I decoupled the backend (NestJS) from the frontend (Next.js), allowing for independent scaling. \n\nKey architectural decisions included using Redis for caching high-frequency product reads and implementing a Rotating Refresh Token strategy for secure, long-lived user sessions.",
    keyFeatures: [
      "Headless Architecture (Decoupled Frontend/Backend)",
      "Redis Caching for High-Performance Reads",
      "Secure JWT Authentication with Rotation",
      "Role-Based Access Control (RBAC)",
      "Type-Safe Database Access with Prisma",
    ],
    techStack: [
      {
        category: "Frontend",
        techs: ["Next.js", "TypeScript", "Tailwind CSS", "React Query"],
      },
      { category: "Backend", techs: ["NestJS", "TypeScript", "Prisma"] },
      { category: "Database", techs: ["PostgreSQL (Supabase)", "Redis"] },
      { category: "DevOps", techs: ["Vercel", "Railway"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Legacy Library Management System",
    description:
      "A foundational system for 500+ users, featuring custom role-based access control and session management.",
    tags: ["PHP", "MySQL", "Legacy System", "MVC Pattern"],
    github: "https://github.com/Arnoldsteve/Library-Management",
    longDescription:
      "This project serves as the foundation of my architectural understanding. Built with the LAMP stack, it required manually implementing features that modern frameworks handle automatically—such as Session Management, CSRF Protection, and Role-Based Access Control. \n\nManaging 10,000+ records taught me the importance of database indexing and efficient SQL queries, lessons I now apply to large-scale Node.js applications.",
    keyFeatures: [
      "Custom MVC Architecture implementation",
      "Manual Session & Security Management",
      "Complex SQL Joins and Reporting",
      "Role-Based Access Control (Admin, Librarian, Student)",
    ],
    techStack: [
      { category: "Backend", techs: ["PHP", "CodeIgniter"] },
      { category: "Database", techs: ["MySQL"] },
      { category: "Frontend", techs: ["Bootstrap", "jQuery"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
];