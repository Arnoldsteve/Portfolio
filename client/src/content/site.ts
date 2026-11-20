// Single source of truth for all site copy.
// Anything inside [brackets] is a placeholder Steve must fill. Render it as-is (visible),
// never invent a value. `pnpm check-placeholders` lists every remaining one.

export type Status = 'live' | 'pilot' | 'concept' | 'satechs' | 'unknown';

export const siteUrl = 'https://steve-arnold.vercel.app';

export const person = {
  name: 'Steve Arnold Otieno',
  jobTitle: 'Software Engineer',
  city: 'Nairobi',
  country: 'KE',
  location: 'Nairobi, Kenya',
  timezone: 'UTC+3',
  email: 'stevearnold9e@gmail.com',
  employer: 'Tourlast',
  company: 'SaTechs Solutions',
  links: {
    github: 'https://github.com/Arnoldsteve',
    linkedin: 'https://www.linkedin.com/in/steve-arnold-otieno',
    whatsapp: '[WhatsApp link]',
    cv: '/Steve_Arnold_SE_Resume.pdf',
    satechs: '[SaTechs site URL]',
    booking: '[Cal.com booking URL]',
  },
  availability: 'Taking on 1 new engagement from [month]',
};

export const nav = [
  { label: 'Work', href: '/work/jaza-wifi', match: '/work' },
  { label: 'QA & security', href: '/#qa' },
  { label: 'About', href: '/about', match: '/about' },
  { label: 'Writing', href: '/#writing' },
];

// Shared UI strings (buttons, labels) used across pages.
export const ui = {
  getInTouch: { label: 'Get in touch', href: '/contact' },
  bookCall: { label: 'Book a call', href: '/contact?route=hire' },
  downloadCv: 'Download CV',
  downloadCvPdf: 'Download CV (PDF)',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  mainNav: 'Main',
  currently: 'Currently',
  hardPart: 'Hard part:',
  readCaseStudy: 'Read the case study →',
  readBuildStory: 'Read the build story →',
  whatsapp: 'WhatsApp',
  emailLabel: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  themeToDark: 'Switch to dark theme',
  themeToLight: 'Switch to light theme',
  minutes: 'min',
};

export const statusLabels: Record<Status, string> = {
  live: 'Live',
  pilot: 'Pilot',
  concept: 'Concept',
  satechs: 'Via SaTechs',
  unknown: '[Status]',
};

export const hero = {
  headline: 'I build and test the systems that move money on African payment rails.',
  lead: 'Senior full-stack engineer with a QA background. M-Pesa, Paystack and Stripe in production, and founder of SaTechs Solutions.',
  primaryCta: { label: 'See the work', href: '/work/jaza-wifi' },
  secondaryCta: { label: 'Download CV', href: '/Steve_Arnold_SE_Resume.pdf' },
  currently: { title: 'QA Engineer · Tourlast', sub: 'Founder · SaTechs Solutions' },
  portrait: '[Portrait · natural light, plain background]',
  photo: '[Photo]',
};

export const stats = [
  { num: '99.8%', cap: 'transaction success on a UK travel checkout (iTravel)' },
  { num: '45%', cap: 'faster API responses after N+1 fixes (iTravel)' },
  { num: '3 rails', cap: 'M-Pesa, Paystack and Stripe shipped to production' },
  { num: '[N]', cap: 'clients served through SaTechs' },
];

export const experience = [
  {
    org: 'Tourlast', role: 'QA Engineer', context: 'travel-tech, pre-launch', dates: 'Jul 2026 – now', current: true,
    points: [
      'Rebuilt the bug tracker across Stays, Experiences and Flights, with a live report dashboard',
      'Found a payment-reference reuse flaw, an oversell race condition and a company-wide timezone bug, and wrote its fix plan',
    ],
  },
  {
    org: 'iTravel Holidays', role: 'Full Stack Software Engineer', context: 'UK-based, remote', dates: 'Mar 2024 – [end]', current: false,
    points: [
      'Stripe webhooks and idempotency behind a 99.8% transaction success rate on global bookings',
      'Fixed N+1 queries and indexing, cutting API response times by 45%',
      'Designed a multi-tenant invoice module with strict per-client data isolation',
    ],
  },
  {
    org: 'SaTechs Solutions', role: 'Founder', context: 'software and QA studio, Nairobi', dates: 'Founder', current: false,
    points: [
      'Client platforms including Umoja Studio (Paystack payouts) and Aura by Racheal (instalment enrolment)',
      'Built the company site and admin dashboard',
    ],
  },
  {
    org: 'GradeHub · ArtisanBase', role: 'Lead architect', context: 'projects', dates: 'Projects', current: false,
    points: [
      'GradeHub: double-entry fee ledger, internal event bus, permission-based access control',
      'ArtisanBase: one NestJS API serving a storefront and an admin app, with Redis caching',
    ],
  },
];

export const workSection = {
  eyebrow: 'Selected work',
  heading: 'Products on M-Pesa, Paystack and Stripe',
};

export const flagship = {
  slug: 'jaza-wifi',
  name: 'Jaza WiFi',
  kind: 'Own product · Flagship',
  status: 'unknown' as Status,
  summary: 'Hotspot billing for WiFi sold by the hour or day. Customers pay with M-Pesa at the login page; operators run plans and routers from one dashboard.',
  bullets: ['M-Pesa payment at the captive portal', 'Runs on MikroTik routers', 'First site: a residential plot · [numbers]'],
  shot: '[Captive portal + operator dashboard]',
};

export const projects = [
  { slug: 'umoja-studio', name: 'Umoja Studio', kind: 'Client · Payouts', status: 'satechs' as Status, productTint: '#D6E6E3',
    desc: 'A creator and seller dashboard with Paystack payouts, from storefront to withdrawal.',
    hard: 'a four-state withdrawal flow inside Paystack’s USD limits in Kenya.', shot: '[Seller dashboard]' },
  { slug: 'gradehub', name: 'GradeHub', kind: 'Lead architect · SaaS', status: 'unknown' as Status, productTint: null,
    desc: 'School operations: fees, records and admin, with each school’s data isolated.',
    hard: 'a double-entry fee ledger, so balances are stored and verifiable.', shot: '[Admin dashboard]' },
  { slug: 'aura', name: 'Aura by Racheal', kind: 'Client · Education', status: 'live' as Status, productTint: null,
    desc: 'An online marketing academy with paid enrolment, run in production.',
    hard: 'Paystack enrolment with instalment payments.', shot: '[Academy screens]' },
];

export const qaSection = {
  eyebrow: 'The difference',
  heading: 'I break things before your customers do.',
  text: 'On a pre-launch travel platform, testing turned up problems that would have cost real money after launch.',
};

export const qaFindings = [
  { kind: 'Security', text: 'A payment reference could be reused across bookings: an access-control flaw caught before launch.' },
  { kind: 'Concurrency', text: 'Reproduced a race condition live that let limited slots be oversold.' },
  { kind: 'Design', text: 'Traced a timezone bug with company-wide impact and wrote the fix plan: schema change, backfill, six-phase rollout.' },
];
// NOTE: Tourlast is Steve's current employer. Do not name Tourlast next to these findings until Steve confirms sign-off.

export const satechsBand = {
  eyebrow: 'Need a team, not one engineer?',
  heading: 'SaTechs Solutions builds this for businesses.',
  text: 'The studio I founded: payment integrations, custom systems and websites, each one QA-tested before handover.',
  primary: 'Get a quote from SaTechs',
  secondary: 'See SaTechs services',
};

export const writingSection = {
  eyebrow: 'Writing',
  heading: 'Notes from building',
};

export const posts = [
  { title: 'Paystack payouts in Kenya: the USD limits nobody warns you about', date: '[DATE]', minutes: 6, href: '[post URL]' },
  { title: 'Selling WiFi with M-Pesa and MikroTik: how Jaza works', date: '[DATE]', minutes: 8, href: '[post URL]' },
  { title: 'The timezone bug that almost shipped', date: '[DATE]', minutes: 5, href: '[post URL]' },
];

export const habits = [
  { title: 'Test plan on day one', text: 'Failure cases are written before the feature, not after the launch.' },
  { title: 'Money paths are idempotent', text: 'A retried payment never charges twice; every callback can be replayed.' },
  { title: 'Decisions in writing', text: 'Short design docs with the alternative I rejected, so the next engineer knows why.' },
  { title: 'Async by default', text: 'UTC+3 overlaps a full EU day; updates are written so time zones don’t matter.' },
];

export const stack = ['TypeScript', 'NestJS', 'Node.js', 'Next.js', 'React', 'PostgreSQL', 'Prisma', 'Redis', 'Laravel', 'Docker', 'AWS', 'GitHub Actions', 'M-Pesa', 'Paystack', 'Stripe'];

export const education = { degree: 'B.Sc. Computer Science', school: 'Technical University of Mombasa', years: '2020–2024' };
export const languages = ['English', 'Swahili'];

export const about = {
  eyebrow: 'About',
  heading: 'Engineer first, tester always.',
  bio: "I'm Steve Arnold Otieno, a full-stack engineer in Nairobi. I build payment-heavy platforms in NestJS, Next.js and PostgreSQL, and I test them like they will break, because in production they do. I'm a QA Engineer at Tourlast, I spent [N years] as a remote engineer for UK-based iTravel Holidays, and I founded SaTechs Solutions.",
  portrait: '[Portrait]',
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

export type RouteId = 'build' | 'hire' | 'partner';

export const contactRoutes: Record<RouteId, {
  title: string; text: string; short: string; dest: string; heading: string; tag: string;
  recipient: 'satechs' | 'steve'; selectLabel: string; options: string[]; messageLabel: string; cta: string; after: string;
}> = {
  build: {
    title: 'I need something built', text: 'Payments, a system or a website. Goes to SaTechs for a quote.', short: 'Goes to SaTechs for a quote', dest: 'Start a project →',
    heading: 'Tell SaTechs what you need', tag: 'Goes to SaTechs', recipient: 'satechs',
    selectLabel: 'What do you need?', options: ['Payments (M-Pesa, Paystack, Stripe)', 'A custom system or dashboard', 'A website', 'An audit or rescue of an existing system'],
    messageLabel: 'A few lines about the project', cta: 'Send to SaTechs', after: 'SaTechs will reply with next steps and a time for a short call.',
  },
  hire: {
    title: "I'm hiring", text: 'Engineering or QA, contract or full-time.', short: 'Engineering or QA roles', dest: 'CV and a call →',
    heading: 'Tell me about the role', tag: 'Comes to Steve', recipient: 'steve',
    selectLabel: 'Type of role', options: ['Full-time, remote', 'Contract', 'QA / test engineering', 'Something else'],
    messageLabel: 'The team and the problem', cta: 'Send — I reply within a day', after: 'My CV comes with my reply, with times for a call.',
  },
  partner: {
    title: "Let's partner", text: 'Investors, collaborators, or interest in Jaza WiFi.', short: 'Jaza WiFi, investment, collaboration', dest: 'Book a call →',
    heading: "Let's see if it fits", tag: 'Comes to Steve', recipient: 'steve',
    selectLabel: 'Topic', options: ['Jaza WiFi', 'Investment', 'Collaboration', 'Something else'],
    messageLabel: 'What you have in mind', cta: 'Send — I reply within a day', after: "I'll reply with a few times for a call.",
  },
};

export const contactRoutesSection = {
  heading: 'What brings you here?',
  text: "Pick one and you'll reach the right place. Replies within one working day.",
};

export const contactPage = {
  eyebrow: 'Contact',
  heading: 'What brings you here?',
  text: 'Pick one and the form adapts. I reply within one working day.',
  pickerLabel: 'Reason for contact',
  nameLabel: 'Name',
  namePlaceholder: 'Wanjiku Kamau',
  contactLabel: 'Email or WhatsApp',
  contactPlaceholder: 'you@company.com',
  messagePlaceholder: 'A few lines is enough.',
  privacy: 'No newsletter. Your details go nowhere else.',
  sending: 'Sending…',
  sentLabel: 'Sent',
  sentHeading: "Thanks — you'll hear back within one working day.",
  sendAnother: 'Send another',
  errorGeneric: 'Something went wrong and your message was not sent. Please try again, or email me directly.',
  errorRateLimit: 'Too many messages from your connection. Please wait a few minutes, or email me directly.',
  errors: {
    name: 'Please add your name.',
    contact: 'Please add an email address or a WhatsApp number.',
    topic: 'Please pick an option.',
    message: 'Please add a few lines (at least 10 characters).',
  },
  talkEyebrow: 'Prefer to talk?',
  talkHeading: 'Book a 20-minute call',
  bookingEmbed: '[Cal.com booking embed]',
  openBooking: 'Open the booking page →',
  elsewhereLabel: 'Elsewhere',
  hoursLabel: 'Hours',
  hours: 'Nairobi, UTC+3 · overlaps a full EU day',
  faqHeading: 'Questions people ask',
};

export const faq = [
  { q: 'Do you work with clients outside Kenya?', a: '[Your answer: time-zone overlap, contracts, payment in USD/EUR.]' },
  { q: 'Why do builds go to SaTechs?', a: 'SaTechs is my studio. Client builds get a team, a contract and a QA report, and I stay involved.' },
  { q: 'Are you open to full-time roles?', a: '[Your answer, and what kind of team you want to join.]' },
];

export type CaseStudy = typeof jazaCaseStudy;

export const caseStudyUi = {
  breadcrumbRoot: { label: 'Work', href: '/#work' },
  backToWork: '← All work',
  tocLabel: 'On this page',
  metaLabels: { role: 'Role', status: 'Status', rails: 'Rails', stack: 'Stack' },
  sections: {
    problem: { title: 'The problem', short: 'Problem' },
    constraints: { title: 'Constraints', short: 'Constraints' },
    how: { title: 'How it works', short: 'How it works' },
    decision: { title: 'The key decision', short: 'Decision', toc: 'Key decision' },
    result: { title: 'Result', short: 'Result', toc: "Result & what I'd change" },
  },
  chose: 'Chose',
  rejected: 'Rejected',
  change: "What I'd change",
  nextLabel: 'Next case study',
  readIt: 'Read it →',
  comingSoonEyebrow: 'Case study',
  comingSoon: 'Case study coming soon',
  comingSoonText: 'The full write-up is on its way. Meanwhile, the Jaza WiFi case study shows how I work.',
  comingSoonCta: 'Read the Jaza WiFi case study',
  comingSoonHref: '/work/jaza-wifi',
};

export const jazaCaseStudy = {
  slug: 'jaza-wifi',
  title: 'Jaza WiFi',
  eyebrow: 'Case study · Own product',
  oneLiner: 'Hotspot billing that lets anyone sell WiFi by the hour or day, paid with M-Pesa.',
  meta: { role: 'Founder & engineer', status: '[Live / Pilot]', rails: 'M-Pesa · MikroTik', stack: '[Your stack]' },
  showcase: { dashboard: "[Operator dashboard · in Jaza's own colours]", phone: '[Captive portal on a phone]' },
  results: [
    { num: '[N]', cap: 'paying users at the first site' },
    { num: '[N]', cap: 'sessions sold, paid by M-Pesa' },
    { num: '[N]%', cap: 'of payments that opened a session automatically' },
  ],
  problem: 'Landlords and small operators want to resell internet to tenants and walk-in users, but billing is manual: vouchers, cash, and someone switching people on and off by hand. [Your words: who you saw struggling and what it cost them.]',
  constraints: [
    'Customers pay with M-Pesa from their phone, so payment must start a session with no human involved.',
    'It has to run on MikroTik routers, which operators already own.',
    'First deployment: one residential plot, so cost per site must stay low. [Your budget or hardware limits.]',
  ],
  flowIntro: 'From joining the network to browsing, with no voucher and no operator in the loop.',
  flow: ['Phone joins the WiFi', 'Captive portal shows plans', 'Customer pays with M-Pesa', 'Payment confirmed, router opens a session', 'Operator sees it in the dashboard'],
  flowHighlight: 2,
  diagram: '[Architecture diagram: portal, payment callback, router, dashboard]',
  decision: { chose: '[What you built and why]', rejected: '[The alternative, and what it would have cost you]' },
  result: '[One paragraph with the numbers above, in context: since when, at how many sites.]',
  change: '[One honest lesson. Senior readers trust this paragraph most.]',
  cta: { eyebrow: 'Want this for your site?', title: 'Talk to me about Jaza WiFi', link: 'Book a call →', href: '/contact?route=partner' },
  next: { label: 'Umoja Studio', href: '/work/umoja-studio' },
};

// Full case studies by slug. Projects without an entry render "Case study coming soon".
export const caseStudies: Record<string, CaseStudy> = {
  [jazaCaseStudy.slug]: jazaCaseStudy,
};

export const notFound = {
  eyebrow: '404',
  heading: 'This page doesn’t exist.',
  text: 'The link may be old, or the page may have moved.',
  cta: { label: 'Back to the home page', href: '/' },
};

export const seo = {
  home: {
    title: 'Steve Arnold Otieno — payments and platform engineer, Nairobi',
    description: 'I build and test the systems that move money on African payment rails: M-Pesa, Paystack, Stripe.',
  },
  about: {
    title: 'About — Steve Arnold Otieno',
    description: 'Full-stack engineer and QA specialist in Nairobi; founder of SaTechs Solutions.',
  },
  contact: {
    title: 'Contact — Steve Arnold Otieno',
    description: 'Build with SaTechs, hire Steve, or partner on Jaza WiFi. Replies within one working day.',
  },
  caseStudy: (name: string) => ({ title: `${name} case study — Steve Arnold Otieno` }),
  caseStudyDescriptions: { 'jaza-wifi': 'Hotspot billing paid with M-Pesa on MikroTik routers.' } as Record<string, string>,
};
