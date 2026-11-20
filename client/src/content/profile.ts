// Who Steve is: identity, navigation, hero, proof, experience, About page, SEO.
// [Bracketed] text is a placeholder; `pnpm check-placeholders` lists any that remain.

import type { Logo, Status } from "./types";
import { shots } from "./work";

export const siteUrl = 'https://steve-arnold.vercel.app';

/** Cal.com username: booking links and the booking API both derive from it. */
const calUsername = 'steve-arnold';

export const person = {
  name: 'Steve Arnold Otieno',
  jobTitle: 'Full-Stack Software Engineer & Lead QA',
  city: 'Nairobi',
  country: 'KE',
  location: 'Nairobi, Kenya',
  timezone: 'UTC+3',
  remote: 'Remote, working with teams worldwide',
  email: 'stevearnold9e@gmail.com',
  employer: 'Tourlast',
  company: 'SaTechs Solutions',
  links: {
    github: 'https://github.com/Arnoldsteve',
    linkedin: 'https://www.linkedin.com/in/steve-arnold-otieno',
    whatsapp: 'https://wa.me/254796335895',
    cv: '/Steve_Arnold_Otieno_CV.pdf',
    satechs: 'https://www.satechs-solutions.com/',
    booking: `https://cal.com/${calUsername}`,
  },
  calUsername,
  availability: 'Taking on 1 new engagement now',
};

export const nav = [
  { label: 'Work', href: '/work/umoja', match: '/work' },
  { label: 'QA & testing', href: '/#qa' },
  { label: 'About', href: '/about', match: '/about' },
  { label: 'Writing', href: '/writing', match: '/writing' },
];

// Shared UI strings (buttons, labels) used across pages.
export const ui = {
  getInTouch: { label: 'Get in touch', href: '/contact' },
  bookCall: { label: 'Book a call', href: '/contact#book' },
  downloadCv: 'Download CV',
  downloadCvPdf: 'Download CV (PDF)',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  mainNav: 'Main',
  menuNav: 'Menu',
  skipToContent: 'Skip to main content',
  themeToggle: 'Switch theme',
  diagramScroll: 'Swipe to see the whole diagram →',
  currently: 'Currently',
  illustration: 'Illustration',
  hardPart: 'Hard part:',
  readCaseStudy: 'Read the case study →',
  visitLive: 'Visit the live site ↗',
  whatsapp: 'WhatsApp',
  emailLabel: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  themeToDark: 'Switch to dark theme',
  themeToLight: 'Switch to light theme',
  minutes: 'min read',
};

export const statusLabels: Record<Status, string> = {
  live: 'Live',
  pilot: 'Pilot',
  building: 'In development',
  code: 'Code on request',
  concept: 'Concept',
};

export const hero = {
  headline: 'I build software that moves money, and I test it before your customers do.',
  lead: 'Full-stack software engineer and Lead QA. I ship payment systems end to end — Stripe, M-Pesa and Paystack in production — and work remotely with teams worldwide. Founder of SaTechs Solutions.',
  primaryCta: { label: 'See the work', href: '/work/umoja' },
  secondaryCta: { label: 'Download CV', href: person.links.cv },
  currently: { title: 'Lead QA · Tourlast', sub: 'Founder · SaTechs Solutions' },
  portrait: shots.portrait,
};

export const stats = [
  { num: '99.8%', cap: 'transaction success on a UK travel checkout (iTravel)' },
  { num: '45%', cap: 'faster API responses after N+1 fixes (iTravel)' },
  { num: '3 rails', cap: 'Stripe, M-Pesa and Paystack shipped to production' },
  { num: '10+', cap: 'clients served through SaTechs' },
];

export const experience: {
  org: string; role: string; context: string; dates: string; current: boolean; onHome: boolean; logo?: Logo; points: string[];
}[] = [
  {
    org: 'Tourlast', role: 'Senior Backend Engineer & Lead QA', context: 'online travel platform, pre-launch', dates: 'Jul 2026 – now', current: true, onHome: true,
    points: [
      'Lead QA for a team of about 10 engineers: test plans, code review, and API, end-to-end and mobile tests (Playwright, Pest, Bruno)',
      'Advise engineers on technical trade-offs as a senior engineer, and build parts of the Laravel backend: OAuth2 single sign-on across stays, flights and experiences, and Filament admin panels',
      'Built a CRM (Laravel, Vue.js) for customers, bookings and staff workflows, with role permissions',
      'Found a payment-reference reuse flaw, an oversell race condition and a company-wide timezone bug, and wrote its fix plan',
    ],
  },
  {
    org: 'iTravel Holidays', role: 'Software Engineer', context: 'UK-based, remote', dates: 'Mar 2024 – Apr 2026', current: false, onHome: true,
    logo: { src: '/images/logos/itravel.png', alt: 'iTravel Holidays', width: 494, height: 177 },
    points: [
      'Stripe webhooks and idempotency behind a 99.8% transaction success rate on global bookings; contributed to a ~30% conversion lift',
      'Fixed N+1 queries and indexing, cutting API response times by 45%',
      'Built Node.js APIs (NestJS, Fastify, Express) and React features on Supabase, with custom auth, Keycloak and RBAC',
      'Designed a multi-tenant invoice module with strict per-client data isolation',
    ],
  },
  {
    org: 'Ecobiz Limited', role: 'Junior Software Engineer', context: 'Mombasa', dates: 'Aug 2023 – Dec 2023', current: false, onHome: true,
    points: ['Built and maintained PHP and Laravel web applications, and optimised MySQL queries'],
  },
  {
    org: 'SaTechs Solutions', role: 'Founder', context: 'software and QA studio', dates: 'Founder', current: false, onHome: true,
    logo: { src: '/images/logos/satechs.png', alt: '', width: 284, height: 284, mark: true },
    points: [
      'Client platforms including Umoja (creator marketplace with M-Pesa checkout and payouts) and Aura by Racheal (paid enrolment with instalments)',
      'Built the company site, a CRM and admin dashboard (leads, clients, sales pipeline, RBAC)',
    ],
  },
  {
    org: 'GradeHub · ArtisanBase', role: 'Lead architect', context: 'projects', dates: 'Projects', current: false, onHome: false,
    points: [
      'GradeHub: double-entry fee ledger, internal event bus, permission-based access control',
      'ArtisanBase: one NestJS API serving a storefront and an admin app, with Redis caching',
    ],
  },
];

export const habits = [
  { title: 'Test plan on day one', text: 'Failure cases are written before the feature, not after the launch.' },
  { title: 'Money paths are idempotent', text: 'A retried payment never charges twice; every callback can be replayed.' },
  { title: 'Decisions in writing', text: 'Short design docs with the alternative I rejected, so the next engineer knows why.' },
  { title: 'Async by default', text: 'UTC+3 overlaps a full EU day and the start of the US day; updates are written so time zones don’t matter.' },
];

export const stack = ['TypeScript', 'NestJS', 'Node.js', 'Next.js', 'React', 'Vue.js', 'Laravel', 'Filament', 'PostgreSQL', 'MySQL', 'Prisma', 'Drizzle', 'Redis', 'BullMQ', 'Docker', 'AWS', 'GitHub Actions', 'Playwright', 'Pest', 'Bruno', 'Stripe', 'M-Pesa', 'Paystack'];

export const education = { degree: 'B.Sc. Computer Science (Second Class Honours)', school: 'Technical University of Mombasa', years: '2020–2024' };

export const languages = ['English', 'Swahili'];

export const about = {
  eyebrow: 'About',
  heading: 'Engineer first, tester always.',
  bio: "I'm Steve Arnold Otieno, a full-stack software engineer based in Nairobi and working remotely with teams worldwide. I build payment-heavy platforms in NestJS, Next.js, Laravel and PostgreSQL, and I test them like they will break, because in production they do. I'm Senior Backend Engineer and Lead QA at Tourlast, I spent two years as a remote engineer for UK-based iTravel Holidays, and I founded SaTechs Solutions. I use Cursor, Claude and Copilot every day — and review and test every line they write.",
  portrait: shots.portrait,
  habitsEyebrow: 'How I work',
  habitsHeading: 'Four habits you can hold me to',
  experienceEyebrow: 'Experience',
  experienceHeading: "Where I've worked",
  stackLabel: 'Stack',
  educationLabel: 'Education',
  languagesLabel: 'Languages',
  basedInLabel: 'Based in',
  hiringEyebrow: 'Hiring?',
  hiringHeading: "Remote, contract or full-time — let's talk.",
};

export const notFound = {
  eyebrow: '404',
  heading: 'This page doesn’t exist.',
  text: 'The link may be old, or the page may have moved.',
  cta: { label: 'Back to the home page', href: '/' },
};

export const seo = {
  home: {
    title: 'Steve Arnold Otieno — full-stack software engineer and Lead QA',
    description: 'I build payment systems end to end — Stripe, M-Pesa, Paystack — and test them before your customers do. Remote, working with teams worldwide.',
  },
  about: {
    title: 'About — Steve Arnold Otieno',
    description: 'Full-stack software engineer and Lead QA, working remotely with teams worldwide; founder of SaTechs Solutions.',
  },
  contact: {
    title: 'Contact — Steve Arnold Otieno',
    description: 'Build with SaTechs, hire Steve, or partner on Jaza WiFi. Replies within one working day.',
  },
  writing: {
    title: 'Writing — Steve Arnold Otieno',
    description: 'Notes from building and testing payment systems.',
  },
  caseStudy: (name: string) => `${name} case study — Steve Arnold Otieno`,
  post: (title: string) => `${title} — Steve Arnold Otieno`,
};
