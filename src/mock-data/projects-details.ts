export const projects = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Multi-Tenant E-Commerce Platform",
    description:
      "A scalable e-commerce solution with a NestJS backend and distinct Next.js frontends for admins and storefronts. Features isolated databases for security.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
    demo: {
      storefront: "https://artisan-base-storefront.vercel.app",
      admin: "https://artisan-base-dashboard.vercel.app",
    },
    longDescription:
      "Artisan Base is a secure multi-tenant e-commerce platform designed to empower independent artisans. It features separate, feature-rich dashboards for administrators and a public-facing storefront for customers. The architecture prioritizes security and scalability by using isolated tenant databases (via PostgreSQL schemas) and a modern microservice-inspired approach with NestJS and Next.js.",
    keyFeatures: [
      "Secure Multi-Tenant Architecture with data isolation",
      "Role-Based Access Control (RBAC) for Admins and Staff",
      "Rotating Refresh Tokens & Secure JWT Authentication",
      "Separate Admin Dashboard and Public Storefront applications",
      "Prisma ORM for fully Type-Safe Database Access",
      "Efficient data fetching and caching with React Query",
    ],
    techStack: [
      {
        category: "Frontend",
        techs: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "React Query",
        ],
      },
      { category: "Backend", techs: ["NestJS", "TypeScript", "Prisma"] },
      { category: "Database", techs: ["PostgreSQL (Supabase)", "Redis"] },
      { category: "Authentication", techs: ["JWT", "Clerk (Multi-tenant)"] },
      { category: "DevOps", techs: ["Docker", "Vercel", "Railway"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "SaTechs Solutions Platform",
    description:
      "A multi-app Next.js monorepo platform with separate public and admin views.",
    tags: ["Next.js", "TypeScript", "Monorepo", "MongoDB"],
    gitlab: "https://gitlab.com/satechs/satechs-monorepo",
    demo: "https://satechs-solutions.vercel.app",
    longDescription:
      "This platform powers the official SaTechs Solutions digital agency website. Built using a modern monorepo architecture with Turborepo, it contains isolated applications for the public-facing website and a private content management dashboard. This setup allows for full control over service listings, blog articles, and client inquiries, ensuring a seamless content workflow and a high-performance, SEO-optimized user experience.",
    keyFeatures: [
      "Monorepo architecture using Turborepo for efficient builds",
      "Headless CMS integration for blog and service content",
      "Server-Side Rendering (SSR) for optimal SEO performance",
      "Next.js API routes for handling contact form submissions",
      "Fully responsive design implemented with Tailwind CSS",
    ],
    techStack: [
      {
        category: "Frontend",
        techs: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      { category: "Backend", techs: ["Next.js API Routes"] },
      { category: "Database", techs: ["MongoDB"] },
      { category: "DevOps", techs: ["Turborepo", "Vercel"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Online Library Management System",
    description:
      "A comprehensive system for over 500 users, featuring role-based access control and managing a database of 10,000+ book records.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery"],
    github: "https://github.com/Arnoldsteve/Library-Management",
    longDescription:
      "A complete library management solution built with a traditional LAMP stack. The system supports full administrative control for librarians, including book cataloging, member management, and circulation tracking. Students can search for books, view their borrowing history, and check due dates. The application features role-based access control to secure different functionalities for librarians, students, and system administrators.",
    keyFeatures: [
      "Full CRUD operations for books and library members",
      "Role-Based Access Control (Admin, Librarian, Student)",
      "Book borrowing and returning workflow with due date tracking",
      "Search and filtering functionality for the book catalog",
      "User-friendly interface built with Bootstrap and jQuery",
    ],
    techStack: [
      { category: "Backend", techs: ["PHP"] },
      { category: "Database", techs: ["MySQL"] },
      {
        category: "Frontend",
        techs: ["HTML", "CSS", "Bootstrap", "JavaScript", "jQuery"],
      },
    //   { category: "Deployment", techs: ["Apache Server"] },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Vanilla JS Weather Application",
    description:
      "A responsive weather app demonstrating strong core JavaScript skills and asynchronous API handling.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "API", "Async"],
    github: "https://github.com/Arnoldsteve/Weather-app-vanilla-js",
    demo: "https://weather-app-vanilla-js-mocha.vercel.app/",
    longDescription:
      "A lightweight, fast, and responsive weather forecasting application built entirely with vanilla JavaScript, HTML5, and CSS3. This project demonstrates a solid understanding of core web fundamentals, including making asynchronous API calls to the OpenWeatherMap API to fetch and display real-time weather data. The UI is clean, user-friendly, and adapts to all screen sizes.",
    keyFeatures: [
      "Real-time weather data from OpenWeatherMap API",
      "Asynchronous JavaScript using Async/Await and Fetch API",
      "Clean, modern UI built with pure HTML and CSS",
      "Fully responsive design for mobile and desktop",
      "No frameworks or libraries, demonstrating core programming skills",
    ],
    techStack: [
      { category: "Core", techs: ["JavaScript (ES6+)", "HTML5", "CSS3"] },
      { category: "API", techs: ["Fetch API", "OpenWeatherMap"] },
      { category: "Deployment", techs: ["Vercel"] },
    ],
    gallery: [
        "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
  },
];
