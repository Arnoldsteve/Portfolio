import { ServiceDetail } from "@/types/services-details";

export const serviceDetails: ServiceDetail[] = [
  {
    serviceId: "1",
    title: "SaaS Platform Architecture", 
    description:
      "Designing secure, multi-tenant architectures that scale. I specialize in data isolation strategies (Row-Level Security) and schema design.",
    iconName: "Server", // Changed from Database to Server to match context
    overview:
      "Building a SaaS is different from building a website. It requires strict data isolation, scalable infrastructure, and complex permission systems. I architect platforms that serve thousands of tenants from a single codebase, ensuring that Client A never sees Client B's data.",
    keyFeatures: [
      "Multi-Tenant Database Design (Schema vs. Row Level)",
      "Permission-Based Access Control (PBAC / RBAC)",
      "Subscription & Billing Logic Integration",
      "Scalable Microservices & Monoliths",
      "Data Isolation & Security Compliance",
      "Automated Tenant Onboarding Flows",
    ],
    technologies: [
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AWS",
      "Redis",
      "Kubernetes",
    ],
    process: [
      {
        title: "Domain Modeling",
        description:
          "Mapping out complex business rules and tenant relationships before writing a single line of code.",
      },
      {
        title: "Schema Design",
        description:
          "Designing normalized databases with strict foreign keys and indexing strategies for multi-tenancy.",
      },
      {
        title: "Security Implementation",
        description:
          "Implementing Guards, Interceptors, and Middleware to enforce tenant isolation at the API level.",
      },
      {
        title: "Scalability Testing",
        description:
          "Load testing the architecture to ensure it handles concurrent tenant spikes without degradation.",
      },
    ],
    whyChoose:
      "Most developers build apps that break when you add the 100th tenant. I build platforms designed to handle the 10,000th tenant from Day 1. My focus on data integrity and isolation ensures your SaaS is enterprise-ready.",
  },
  {
    serviceId: "2",
    title: "Fintech & Ledger Systems", // 👈 Aligned with Homepage
    description:
      "Engineering immutable, double-entry financial ledgers. I build systems that handle money with ACID compliance and 99.8% transaction reliability.",
    iconName: "ShieldCheck",
    overview:
      "Handling money requires zero margin for error. I specialize in building immutable financial ledgers that track every cent. Instead of relying on third-party dashboards, I build internal reconciliation engines that ensure your database always matches the bank.",
    keyFeatures: [
      "Double-Entry Ledger Architecture",
      "Idempotent Payment Processing",
      "Stripe / M-Pesa / PayPal Integrations",
      "Automated Reconciliation Logic",
      "Webhook Handling & Failure Recovery",
      "Audit Logging & Financial Reporting",
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "PostgreSQL (ACID Transactions)",
      "Stripe API",
      "M-Pesa API",
      "Redis (Locks)",
    ],
    process: [
      {
        title: "Transaction Modeling",
        description:
          "Defining the flow of funds and creating immutable ledger schemas.",
      },
      {
        title: "Gateway Integration",
        description:
          "Connecting payment providers with robust error handling and idempotency keys.",
      },
      {
        title: "Reconciliation Engine",
        description:
          "Building background jobs that verify internal records against gateway settlements.",
      },
      {
        title: "Security Audit",
        description:
          "Ensuring PCI compliance logic (tokenization) and securing financial API endpoints.",
      },
    ],
    whyChoose:
      "I don't just 'add Stripe.' I build financial infrastructure. My systems are designed to survive network failures, duplicate webhooks, and concurrency race conditions, ensuring your revenue data is always accurate.",
  },
  {
    serviceId: "3",
    title: "Event-Driven Systems", // 👈 Aligned with Homepage
    description:
      "Decoupling complex business logic using Pub/Sub patterns. I ensure heavy background tasks don't slow down the user experience.",
    iconName: "Activity",
    overview:
      "Monoliths become spaghetti code when everything happens in one HTTP request. I decouple your application using Event-Driven Architecture. This allows critical tasks (like payments) to happen instantly, while side effects (emails, analytics, logs) happen asynchronously.",
    keyFeatures: [
      "Asynchronous Processing (Queues/Jobs)",
      "Pub/Sub Pattern Implementation",
      "Decoupled Microservices Communication",
      "Background Job Management (BullMQ/Redis)",
      "Real-time Event Broadcasting (WebSockets)",
      "System Observability & Tracing",
    ],
    technologies: [
      "NestJS Event Emitter",
      "Redis / BullMQ",
      "RabbitMQ / Kafka",
      "Socket.io",
      "Node.js",
    ],
    process: [
      {
        title: "Event Storming",
        description:
          "Identifying domain events (e.g., 'UserSignedUp', 'PaymentReceived') and their side effects.",
      },
      {
        title: "Infrastructure Setup",
        description:
          "Setting up message brokers (Redis/RabbitMQ) to handle event distribution.",
      },
      {
        title: "Consumer Implementation",
        description:
          "Writing isolated listeners that handle specific tasks without blocking the main thread.",
      },
      {
        title: "Failure Handling",
        description:
          "Implementing Dead Letter Queues (DLQ) and retry mechanisms for robust processing.",
      },
    ],
    whyChoose:
      "Speed is a feature. By moving heavy tasks to the background, I ensure your API responds in milliseconds, not seconds. This architecture also makes your system easier to maintain and extend without regression.",
  },
  {
    serviceId: "4",
    title: "High-Performance APIs", // 👈 Aligned with Homepage
    description:
      "Optimizing database queries and API endpoints. I use Redis caching and proper indexing to reduce latency by up to 45%.",
    iconName: "TrendingUp",
    overview:
      "Slow APIs kill user retention. I analyze and optimize your backend to handle high traffic loads. From database indexing strategies to aggressive caching layers, I ensure your application scales efficiently without simply throwing more servers at the problem.",
    keyFeatures: [
      "SQL Query Optimization (N+1 solutions)",
      "Database Indexing Strategies",
      "Redis Caching Implementation",
      "Load Balancing & Horizontal Scaling",
      "Rate Limiting & Throttling",
      "Server-Side Response Compression",
    ],
    technologies: [
      "PostgreSQL",
      "Redis",
      "Nginx",
      "Node.js Profiling Tools",
      "K6 (Load Testing)",
      "Grafana / Prometheus",
    ],
    process: [
      {
        title: "Performance Audit",
        description:
          "Using profiling tools to identify slow queries and memory leaks in the current system.",
      },
      {
        title: "Database Tuning",
        description:
          "Adding missing indexes, rewriting inefficient joins, and implementing query caching.",
      },
      {
        title: "Caching Layer",
        description:
          "Implementing Redis strategies to serve frequently accessed data instantly.",
      },
      {
        title: "Stress Testing",
        description:
          "Simulating high traffic loads to verify stability and response times under pressure.",
      },
    ],
    whyChoose:
      "I don't guess; I measure. I use data-driven optimization techniques to reduce server costs and improve user experience. My track record includes reducing API response times by 45% for high-traffic platforms.",
  },
];