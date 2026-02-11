import { ServiceDetail } from "@/types/services-details";

export const serviceDetails: ServiceDetail[] = [
  {
    serviceId: "1",
    title: "SEO-Optimized Business Sites",
    description:
      "Establishing global digital authority. I build high-performance, mobile-first websites engineered with advanced SEO best practices to ensure you rank on Google and attract organic leads.",
    iconName: "Monitor",
    overview:
      "Your website is your primary business asset. I don’t just design pages; I engineer a digital presence that focuses on three pillars: Speed, Conversion, and Visibility. By using modern frameworks like Next.js, I ensure your site loads in milliseconds, providing the best possible foundation for high Google rankings and a premium user experience.",
    keyFeatures: [
      "Custom UI/UX Designed for Business Conversion",
      "Advanced Technical SEO (Schema Markup & Meta Optimization)",
      "Mobile-First, High-Performance Architecture",
      "Google Analytics 4 & Search Console Integration",
      "Core Web Vitals Optimization (90+ PageSpeed Scores)",
      "Lead Capture Systems & CRM Connectivity",
    ],
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Headless CMS (Sanity/Strapi)",
      "Google Search Console",
      "Vercel Edge Network",
    ],
    process: [
      {
        title: "Strategic Discovery",
        description:
          "Identifying your target audience and high-value search keywords before the build starts.",
      },
      {
        title: "Design & UX Strategy",
        description:
          "Crafting a professional interface that reflects your brand’s authority and directs users to take action.",
      },
      {
        title: "SEO Engineering",
        description:
          "Building the site with clean, semantic code that search engine crawlers can index with ease.",
      },
      {
        title: "Performance Tuning",
        description:
          "Optimizing every image, script, and asset for maximum loading speed across all devices.",
      },
    ],
    whyChoose:
      "I build sites that do the selling for you. While others focus purely on aesthetics, I focus on performance and searchability. I ensure that when clients look for your services, they find you first.",
  },
  {
    serviceId: "2",
    title: "Secure E-Commerce Solutions",
    description:
      "Full-service online stores designed for conversion. Featuring automated inventory, global payment gateways, and M-Pesa integration—all built on a secure, hacker-proof foundation.",
    iconName: "ShieldCheck",
    overview:
      "Selling online requires absolute trust and zero downtime. I build e-commerce platforms that provide a seamless checkout experience while giving you total control over your operations. Whether you are selling locally in Kenya or shipping to a global audience, I integrate the right payment and logistics systems to make your business run 24/7.",
    keyFeatures: [
      "Seamless M-Pesa & Global Card Payment Integration",
      "Automated Inventory & Order Management Systems",
      "Secure Customer Account Portals & Order History",
      "Multi-Currency Support & Automated Tax Logic",
      "Real-Time Sales Dashboards & Analytics",
      "PCI-DSS Compliant Security & Tokenized Payments",
    ],
    technologies: [
      "Node.js",
      "PostgreSQL",
      "Stripe API",
      "M-Pesa API (Daraja)",
      "Redis Caching",
      "Next.js Storefront",
    ],
    process: [
      {
        title: "Workflow Mapping",
        description:
          "Defining how orders move from the cart to delivery to ensure a frictionless business process.",
      },
      {
        title: "Payment Architecture",
        description:
          "Setting up robust, idempotent payment handlers to prevent double-billing and handle network failures.",
      },
      {
        title: "Storefront Engineering",
        description:
          "Creating a lightning-fast shopping experience that works perfectly even on slower mobile data networks.",
      },
      {
        title: "Security Hardening",
        description:
          "Stress-testing the checkout process and hardening the server infrastructure against modern cyber threats.",
      },
    ],
    whyChoose:
      "I don't just 'install a store.' I build financial-grade commerce infrastructure. My systems are designed to survive high-traffic sales events and ensure every transaction is tracked with 100% accuracy.",
  },
  {
    serviceId: "3",
    title: "Custom Web Applications (Apps)",
    description:
      "Scalable software built to solve specific business problems. From custom management dashboards to SaaS platforms, I engineer the 'brains' that automate your daily operations.",
    iconName: "Server",
    overview:
      "When off-the-shelf software isn't enough, you need a custom-engineered solution. I specialize in building 'The Brains' of a business—interactive web applications that handle complex logic, multi-user data, and automated workflows. These are not just websites; they are tools that eliminate manual work and solve operational bottlenecks.",
    keyFeatures: [
      "Multi-Tenant SaaS Architecture (Secure Data Isolation)",
      "Secure User Authentication & Advanced RBAC (Roles)",
      "Custom Admin Dashboards & Real-time Data Visualization",
      "Third-Party API Integrations & Ecosystem Connectivity",
      "Automated Business Workflows & Notification Engines",
      "Cloud-Native Infrastructure for Infinite Scalability",
    ],
    technologies: [
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "AWS / Google Cloud",
      "Docker & Containers",
      "React / Redux",
    ],
    process: [
      {
        title: "Requirement Engineering",
        description:
          "Deep-diving into your business logic to map out the application's core functionality and user flows.",
      },
      {
        title: "Architectural Planning",
        description:
          "Choosing the right database and server structures to ensure the app remains fast as you add thousands of users.",
      },
      {
        title: "Agile Development",
        description:
          "Building and testing features in manageable sprints, allowing for continuous feedback and refinement.",
      },
      {
        title: "Deployment & Scaling",
        description:
          "Launching on enterprise-grade cloud providers with automated scaling to handle business growth.",
      },
    ],
    whyChoose:
      "As a Software Engineer, I prioritize data integrity and system reliability above all else. I build applications that handle your 10,000th user as smoothly as your first, ensuring your business stays online and efficient.",
  },
  {
    serviceId: "4",
    title: "Optimization & Maintenance",
    description:
      "I don't just launch and leave. I provide extreme speed optimization, ironclad security updates, and reliable hosting management to keep your platform running 24/7.",
    iconName: "Zap",
    overview:
      "The digital landscape moves fast, and a 'finished' site can quickly become slow or vulnerable. I provide professional-grade maintenance and performance tuning to ensure your platform stays at peak health. I act as your long-term technical partner, handling the servers, security, and speed so you can focus entirely on your business.",
    keyFeatures: [
      "Extreme Speed Optimization (Core Web Vitals)",
      "Proactive Security Audits & Patch Management",
      "24/7 Uptime Monitoring & Instant Error Alerts",
      "Automated Off-site Backups & Disaster Recovery",
      "Database Health Checks & Query Tuning",
      "Continuous Content & Feature Updates",
    ],
    technologies: [
      "Clinic.js (Diagnostics)",
      "Redis Caching",
      "Nginx / Reverse Proxies",
      "Prometheus & Grafana",
      "Vercel / AWS CloudWatch",
    ],
    process: [
      {
        title: "Deep System Audit",
        description:
          "Identifying hidden bottlenecks and potential security vulnerabilities in the current codebase.",
      },
      {
        title: "Global Benchmarking",
        description:
          "Measuring your platform's speed and security against international industry standards.",
      },
      {
        title: "System Hardening",
        description:
          "Implementing advanced caching, script compression, and security firewalls to protect your data.",
      },
      {
        title: "Continuous Support",
        description:
          "Providing monthly health reports and proactive updates to stop issues before they affect your users.",
      },
    ],
    whyChoose:
      "Most developers disappear after the final payment. I offer a partnership. I treat your platform’s performance and security as my own responsibility, ensuring your digital assets remain fast, secure, and profitable year-round.",
  },
];