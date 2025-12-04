export const projectsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Multi-Tenant E-Commerce Platform",
    description:
      "A scalable e-commerce solution with a NestJS backend and distinct Next.js frontends for admins and storefronts. Features isolated databases for security.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "Supabase"],
    github: "https://github.com/Arnoldsteve/artisan-base",
    demo: {
      storefront: "https://artisan-base-storefront.vercel.app",
      admin: "https://artisan-base-dashboard.vercel.app",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "SaTechs Solutions Platform",
    description:
      "A multi-app Next.js monorepo platform with separate public and admin views. The public side showcases services offered to users, while the admin panel manages operations and content.",
    tags: ["Next.js", "MongoDB", "TypeScript", "Admin Panel", "Public App"],
    gitlab: "https://gitlab.com/satechs/satechs-monorepo",
    demo: "https://satechs-solutions.vercel.app",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    title: "Online Library Management System",
    description:
      "A comprehensive system for over 500 users, featuring role-based access control and managing a database of 10,000+ book records.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com/Arnoldsteve/Library-Management",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",

    title: "Vanilla JS Weather Application",
    description:
      "A responsive weather app demonstrating strong core JavaScript skills and asynchronous API handling with the OpenWeatherMap API.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "API"],
    github: "https://github.com/Arnoldsteve/Weather-app-vanilla-js",
    demo: "https://weather-app-vanilla-js-mocha.vercel.app/",
  },
];
