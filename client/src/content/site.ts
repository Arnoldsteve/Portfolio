// Single source of truth for all site copy.
// Anything inside [brackets] is a placeholder Steve must fill. Render it as-is (visible),
// never invent a value. `pnpm check-placeholders` lists every remaining one.
// Facts come from Steve, his résumé and his own repos (handoff/docs/FACTS.md).

/** Honest project status: every project wears exactly one. */
export type Status = 'live' | 'pilot' | 'building' | 'code' | 'concept';

export const siteUrl = 'https://steve-arnold.vercel.app';

/** An image on the site. `illustration` marks drawings that stand in for a product not yet deployed. */
export type Shot = { src: string; alt: string; width: number; height: number; illustration?: boolean };

export const shots = {
  // Brand graphic until Steve supplies a photo: decorative, so empty alt.
  portrait: { src: '/images/portrait-placeholder.svg', alt: '', width: 400, height: 500 },
  umojaDesktop: { src: '/images/work/umoja-desktop.jpg', alt: 'Umoja marketplace home page: best-selling digital products from creators, priced in KES, with refund protection on every order', width: 2880, height: 1800 },
  umojaPhone: { src: '/images/work/umoja-phone.jpg', alt: 'Umoja on a phone: product search and best sellers', width: 780, height: 1688 },
  auraDesktop: { src: '/images/work/aura-desktop.jpg', alt: 'Earn from Home, the Aura by Racheal academy: enrolment landing page with M-Pesa payment', width: 2880, height: 1800 },
  jazaPortal: { src: '/images/work/jaza-portal.svg', alt: 'Illustration of the Jaza WiFi captive portal: pick a plan, enter an M-Pesa number, pay', width: 360, height: 640, illustration: true },
  jazaDashboard: { src: '/images/work/jaza-dashboard.svg', alt: 'Illustration of the Jaza WiFi operator live view: devices online, revenue, uplink in use', width: 960, height: 600, illustration: true },
} satisfies Record<string, Shot>;

/** Architecture diagram: boxes on a grid (col, row) joined by arrows. `hot` = the step the design is built around. */
export type Diagram = {
  title: string;
  nodes: { id: string; label: string; sub: string; col: number; row: number; hot?: boolean }[];
  edges: { from: string; to: string; label?: string }[];
};


export const person = {
  name: 'Steve Arnold Otieno',
  jobTitle: 'Software Engineer',
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
    booking: 'https://cal.com/steve-arnold',
  },
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
  portrait: shots.portrait as Shot,
};

export const stats = [
  { num: '99.8%', cap: 'transaction success on a UK travel checkout (iTravel)' },
  { num: '45%', cap: 'faster API responses after N+1 fixes (iTravel)' },
  { num: '3 rails', cap: 'Stripe, M-Pesa and Paystack shipped to production' },
  { num: '10+', cap: 'clients served through SaTechs' },
];

/** Company logo (real file) for the experience strip; companies without one show their name. */
/** `mark`: the file is a symbol only, so the company name is shown beside it. */
export type Logo = { src: string; alt: string; width: number; height: number; mark?: boolean };

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

export const workSection = {
  eyebrow: 'Selected work',
  heading: 'Payment systems, built and tested end to end',
  moreHeading: 'More work',
};

/** The lead project on the home page (a client build, delivered through SaTechs). */
export const flagship = {
  slug: 'umoja',
  name: 'Umoja',
  kind: 'Client · via SaTechs · Marketplace',
  status: 'live' as Status,
  summary: 'A digital-products marketplace: creators sell, buyers pay with M-Pesa and download instantly, with refund protection on every order.',
  bullets: [
    'Every payment and payout processed exactly once, even when callbacks repeat',
    'Double-entry ledger: every creator balance is traceable to the cent',
    'M-Pesa checkout and payouts, with Paystack for cards',
  ],
  shot: shots.umojaDesktop as Shot,
  liveUrl: 'https://umojacoaches.com',
};

/** Other work, in the order Steve wants it shown. `href` is where the whole card goes. */
export const projects = [
  { slug: 'jaza-wifi', name: 'Jaza WiFi', kind: 'Own product · Hotspot billing', status: 'building' as Status,
    desc: 'Self-service paid WiFi: connect, pick a plan, pay with M-Pesa on your phone, and be online in under a minute.',
    hard: 'the phone that pays isn’t always the device that connects — so payment and access are two identities.',
    shot: shots.jazaDashboard as Shot | null, href: '/work/jaza-wifi', cta: 'Read the case study →' },
  { slug: 'gradehub', name: 'GradeHub', kind: 'Lead architect · SaaS', status: 'code' as Status,
    desc: 'School operations: fees, records and admin, with each school’s data isolated.',
    hard: 'a double-entry fee ledger, so balances are stored and verifiable.',
    shot: null, href: '/contact?route=hire', cta: 'Ask for code access →' },
  { slug: 'aura', name: 'Aura by Racheal', kind: 'Client · Education', status: 'live' as Status,
    desc: 'An online marketing academy with paid enrolment, run in production.',
    hard: 'Paystack enrolment with instalment payments.',
    shot: shots.auraDesktop as Shot | null, href: 'https://earnfromhome.vercel.app/', cta: 'Visit the live site ↗' },
];

export const qaSection = {
  eyebrow: 'The difference',
  heading: 'I break things before your customers do.',
  text: 'Most engineers test what they build. I lead QA too — so I know where payment systems fail. On a pre-launch travel platform, testing turned up problems that would have cost real money after launch.',
  more: { label: 'How I find bugs like these →', href: '/writing/three-bugs-before-launch' },
};

export const qaFindings = [
  { kind: 'Security', text: 'A payment reference could be reused across bookings: an access-control flaw caught before launch.' },
  { kind: 'Concurrency', text: 'Reproduced a race condition live that let limited slots be oversold.' },
  { kind: 'Design', text: 'Traced a timezone bug with company-wide impact and wrote the fix plan: schema change, backfill, six-phase rollout.' },
];
// NOTE: Do not name Tourlast next to these findings (Steve: keep anonymous).

export const satechsBand = {
  eyebrow: 'Need a team, not one engineer?',
  heading: 'SaTechs Solutions builds this for businesses.',
  text: 'The studio I founded: payment integrations, custom systems and websites, each one QA-tested before handover. Umoja was built through SaTechs.',
  primary: 'Get a quote from SaTechs',
  secondary: 'Visit SaTechs ↗',
};

export const writingSection = {
  eyebrow: 'Writing',
  heading: 'Notes from building',
  all: 'All writing →',
  pageHeading: 'Notes from building and testing payment systems',
  pageText: 'What I learn shipping software that moves money — and breaking it before launch.',
  back: '← All writing',
  next: 'Next',
};

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
  portrait: shots.portrait as Shot,
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
    selectLabel: 'What do you need?', options: ['Payments (Stripe, M-Pesa, Paystack)', 'A custom system or dashboard', 'A website', 'An audit or rescue of an existing system', 'QA / testing of an existing product'],
    messageLabel: 'A few lines about the project', cta: 'Send to SaTechs', after: 'SaTechs will reply with next steps and a time for a short call.',
  },
  hire: {
    title: "I'm hiring", text: 'Engineering or QA, contract or full-time, remote.', short: 'Engineering or QA roles', dest: 'CV and a call →',
    heading: 'Tell me about the role', tag: 'Comes to Steve', recipient: 'steve',
    selectLabel: 'Type of role', options: ['Full-time, remote', 'Contract', 'QA / test engineering', 'Code access to a project', 'Something else'],
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
  namePlaceholder: 'Your name',
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
  talkHeading: 'Book a 30- or 60-minute call',
  talkText: 'Pick a time that suits you, in your own time zone.',
  talkCta: 'See available times ↓',
  elsewhereLabel: 'Elsewhere',
  hoursLabel: 'Hours',
  hours: 'Nairobi, UTC+3 · overlaps a full EU day and the US morning',
  faqHeading: 'Questions people ask',
};

export const booking = {
  eyebrow: 'Book a call',
  heading: 'Pick a call, a day and a time.',
  text: 'Times show in your own time zone. You get a confirmation and a calendar invite as soon as you book.',
  points: ['No prep needed — bring the problem', 'Nairobi, UTC+3: overlaps a full EU day and the US morning', 'Prefer to write? The form above works too'],
  pickLabel: 'Choose a call',
  calls: [
    { id: '30min', minutes: 30, title: 'Intro call', text: 'A first conversation about a project, a role or a partnership.' },
    { id: '60-min-meeting', minutes: 60, title: 'Deep dive', text: 'Scope a build, review your payment flow or QA plan, or a technical interview.' },
  ],
  minutes: 'min',
  dayLabel: 'Pick a day',
  timeLabel: 'Pick a time',
  earlier: 'Earlier dates',
  later: 'Later dates',
  timesIn: 'Times in',
  noTimes: 'No free times this day. Try another.',
  noDays: 'No free times in these dates. Try later dates.',
  loading: 'Finding free times…',
  detailsLabel: 'Your details',
  nameLabel: 'Name',
  emailLabel: 'Email',
  emailHint: 'The calendar invite goes here.',
  notesLabel: 'What would you like to cover? (optional)',
  notesPlaceholder: 'A line or two helps me prepare.',
  confirm: 'Confirm booking',
  confirming: 'Booking…',
  change: 'Change time',
  bookedLabel: 'Booked',
  bookedHeading: 'You’re booked.',
  bookedText: 'A calendar invite is on its way to',
  joinCall: 'Join link',
  bookAnother: 'Book another time',
  errors: {
    name: 'Please add your name.',
    email: 'Please add a valid email address.',
    taken: 'That time was just taken. Please pick another.',
    failed: 'The booking didn’t go through. Please try again, or book on Cal.com.',
    slots: 'Couldn’t load free times right now.',
  },
  external: 'Book on Cal.com instead ↗',
};

export const faq = [
  { q: 'Do you work with clients outside Kenya?', a: 'Yes. I worked remotely for UK-based iTravel Holidays for two years. UTC+3 overlaps a full European working day and the US morning, I work async by default, and I invoice in USD, EUR or GBP.' },
  { q: 'Why do builds go to SaTechs?', a: 'SaTechs is my studio. Client builds get a team, a contract and a QA report, and I stay involved.' },
  { q: 'Are you open to full-time roles?', a: 'Yes — full-time or contract, remote. I do my best work where I own features end to end and quality is part of the job, especially in payments and fintech.' },
  { q: 'Can I see code for projects without a live demo?', a: 'Yes. GradeHub has no public demo right now, but I can give code access on request — pick “I’m hiring” on the form and say which project.' },
];

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  oneLiner: string;
  seoDescription: string;
  status: Status;
  liveUrl?: string;
  meta: { role: string; rails: string; stack: string };
  showcase: { wide: Shot; phone: Shot };
  results: { num: string; cap: string }[];
  problem: string;
  constraints: string[];
  flowIntro: string;
  flow: string[];
  flowHighlight: number;
  diagram: Diagram;
  decision: { chose: string; rejected: string };
  result: string;
  change: string;
  cta: { eyebrow: string; title: string; link: string; href: string };
  next: { label: string; href: string };
};

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
};

export const umojaCaseStudy: CaseStudy = {
  slug: 'umoja',
  title: 'Umoja',
  eyebrow: 'Case study · Client via SaTechs',
  oneLiner: 'A marketplace where creators sell digital products and buyers pay with M-Pesa — with every payment and payout recorded exactly once.',
  seoDescription: 'A live digital-products marketplace with M-Pesa checkout and payouts, built on an append-only double-entry ledger.',
  status: 'live',
  liveUrl: 'https://umojacoaches.com',
  meta: { role: 'Full-stack engineer & QA', rails: 'M-Pesa · Paystack', stack: 'NestJS · Next.js · Drizzle · Neon Postgres · BullMQ + Redis · Cloudflare R2' },
  showcase: { wide: shots.umojaDesktop, phone: shots.umojaPhone },
  results: [
    { num: '~20', cap: 'creators selling within the first month of launch' },
    { num: '~30', cap: 'sales paid with M-Pesa in the first month' },
  ],
  problem: 'Creators selling digital work — courses, templates, ebooks, coaching — were using tools built for other markets: payouts they couldn’t count on, fees they couldn’t see, and checkouts their buyers didn’t trust. Buyers had the mirror-image fear: “I’ll pay and get nothing.” The client wanted a marketplace where both sides could trust the money.',
  constraints: [
    'Money moves, so every payment, callback and payout must process exactly once — duplicate M-Pesa callbacks are a “when”, not an “if”.',
    'Buyers are mobile-first, often on mid-range Android phones and 3G/4G, so checkout has to be fast and light.',
    'Prices can be in KES or USD, and the two can never mix in one order. Amounts are integers in minor units — never floats.',
    'Every vendor (M-Pesa, Paystack, email, SMS, storage) had to be swappable without touching business logic.',
  ],
  flowIntro: 'From “buy it now” to the creator getting paid, with every step recorded once.',
  flow: ['Buyer picks a product', 'Pays with M-Pesa on their phone', 'Callback verified and recorded exactly once', 'Ledger credits the creator; download unlocks', 'Creator withdraws to M-Pesa after the hold window'],
  flowHighlight: 2,
  diagram: {
    title: 'Umoja architecture: from checkout to payout',
    nodes: [
      { id: 'buyer', label: 'Buyer’s phone', sub: 'M-Pesa STK prompt', col: 0, row: 0 },
      { id: 'web', label: 'Checkout', sub: 'Next.js', col: 1, row: 0 },
      { id: 'api', label: 'API', sub: 'NestJS', col: 2, row: 0 },
      { id: 'psp', label: 'Payment adapter', sub: 'M-Pesa · Paystack', col: 3, row: 0 },
      { id: 'ledger', label: 'Ledger', sub: 'append-only, double-entry', col: 2, row: 1, hot: true },
      { id: 'outbox', label: 'Outbox worker', sub: 'BullMQ + Redis', col: 1, row: 1 },
      { id: 'out', label: 'Download + email', sub: 'then creator payout', col: 0, row: 1 },
    ],
    edges: [
      { from: 'buyer', to: 'web' },
      { from: 'web', to: 'api' },
      { from: 'api', to: 'psp', label: 'charge' },
      { from: 'psp', to: 'ledger', label: 'callback, once' },
      { from: 'ledger', to: 'outbox', label: 'same transaction' },
      { from: 'outbox', to: 'out' },
    ],
  },
  decision: {
    chose: 'An append-only, double-entry ledger. Balances are derived from immutable entries, written in the same database transaction as the order and the wallet, with an outbox for the events that follow.',
    rejected: 'A balance column updated in place. Simpler to build, but a retried callback or a half-finished write could silently change a creator’s money, with no trail to prove what happened.',
  },
  result: 'Umoja is live at umojacoaches.com, with creators selling and buyers paying in KES. In its first month, close to 20 creators were selling and close to 30 sales were paid — each one recorded exactly once in the ledger.',
  change: 'I’d put the seller dashboard in front of real creators earlier. The payment engineering held up from day one; the questions creators actually asked were about when payouts land and what the fees are. Now I put money timing and fees on screen from the first prototype.',
  cta: { eyebrow: 'Need a platform like this?', title: 'Get a quote from SaTechs', link: 'Start a project →', href: '/contact?route=build' },
  next: { label: 'Jaza WiFi', href: '/work/jaza-wifi' },
};

export const jazaCaseStudy: CaseStudy = {
  slug: 'jaza-wifi',
  title: 'Jaza WiFi',
  eyebrow: 'Case study · Own product',
  oneLiner: 'Self-service paid WiFi: connect, pick a plan, pay with M-Pesa on your own phone, and be online in under a minute — no operator involved.',
  seoDescription: 'Self-service hotspot billing paid with M-Pesa on MikroTik routers, with a two-identity access model.',
  status: 'building',
  meta: { role: 'Founder & engineer', rails: 'M-Pesa · MikroTik', stack: 'NestJS · Next.js · Prisma · Neon · FreeRADIUS + CoA · WireGuard · BullMQ + Redis' },
  showcase: { wide: shots.jazaDashboard, phone: shots.jazaPortal },
  results: [],
  problem: 'Selling WiFi by the hour usually means vouchers, cash and someone switching people on and off by hand. The goal for Jaza is the opposite: the operator does no hands-on work in normal operation, nothing gets online without paying, and the experience is the same for the first customer and the five-hundredth.',
  constraints: [
    'The first site is a home connection on a wireless ISP with about 20 Mbps shared, so bandwidth — not data — is the scarce resource. Every device gets a speed cap.',
    'The router has no public IP address, so it dials out to the server over WireGuard and holds the tunnel open.',
    'Payment must start a session with no human involved, and one payment covers exactly one device.',
    'Modern phones detect captive portals over HTTP, so the portal, Paystack and M-Pesa endpoints must be allowed through the walled garden.',
  ],
  flowIntro: 'From joining the network to browsing, with no voucher and no operator in the loop.',
  flow: ['Device joins the WiFi', 'Captive portal shows plans', 'Customer pays with M-Pesa', 'Server grants that device via RADIUS', 'Operator sees it live'],
  flowHighlight: 2,
  diagram: {
    title: 'Jaza WiFi architecture: router, server and payment',
    nodes: [
      { id: 'device', label: 'Customer device', sub: 'laptop or phone', col: 0, row: 0 },
      { id: 'router', label: 'MikroTik hotspot', sub: 'portal, speed caps', col: 1, row: 0 },
      { id: 'server', label: 'Server', sub: 'NestJS · owns paid time', col: 2, row: 0, hot: true },
      { id: 'psp', label: 'Paystack', sub: 'M-Pesa STK push', col: 3, row: 0 },
      { id: 'radius', label: 'FreeRADIUS', sub: 'grant + CoA disconnect', col: 1, row: 1 },
      { id: 'operator', label: 'Operator dashboard', sub: 'live view', col: 2, row: 1 },
      { id: 'phone', label: 'Payer’s phone', sub: 'enters M-Pesa PIN', col: 3, row: 1 },
    ],
    edges: [
      { from: 'device', to: 'router', label: 'joins' },
      { from: 'router', to: 'server', label: 'WireGuard' },
      { from: 'server', to: 'psp', label: 'charge' },
      { from: 'psp', to: 'phone' },
      { from: 'server', to: 'radius', label: 'grant device' },
      { from: 'radius', to: 'router' },
      { from: 'server', to: 'operator' },
    ],
  },
  decision: {
    chose: 'The cloud server owns paid time, keyed to the device. That makes the fairness promises possible: the clock pauses when the internet is down, and a device that drops and rejoins keeps its balance without paying again.',
    rejected: 'Letting the router’s RADIUS session timers own time. They stay — but only as a backstop, not the source of truth.',
  },
  result: 'Jaza WiFi is in development. The first site is a home connection, and payments start with Paystack’s M-Pesa STK push, built behind an interface so direct Daraja can be swapped in later without a rewrite. The software is complete and tested end to end; the first site goes live as soon as the MikroTik router is installed.',
  change: 'I’d order the router on day one. The software was finished before the hardware arrived; next time the physical setup starts in parallel, so testing on the real network isn’t the last step.',
  cta: { eyebrow: 'Want this for your site?', title: 'Talk to me about Jaza WiFi', link: 'Book a call →', href: '/contact?route=partner' },
  next: { label: 'Umoja', href: '/work/umoja' },
};

// Full case studies by slug, in the order they are listed.
export const caseStudies: Record<string, CaseStudy> = {
  [umojaCaseStudy.slug]: umojaCaseStudy,
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
