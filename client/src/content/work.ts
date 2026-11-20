// The work: images, flagship, projects, QA proof, SaTechs, writing, case studies.

import type { CaseStudy, Flagship, Project, Shot } from "./types";

export const shots = {
  // Brand graphic until Steve supplies a photo: decorative, so empty alt.
  portrait: { src: '/images/portrait-placeholder.svg', alt: '', width: 400, height: 500 },
  umojaDesktop: { src: '/images/work/umoja-desktop.jpg', alt: 'Umoja marketplace home page: best-selling digital products from creators, priced in KES, with refund protection on every order', width: 2880, height: 1800 },
  umojaPhone: { src: '/images/work/umoja-phone.jpg', alt: 'Umoja on a phone: product search and best sellers', width: 780, height: 1688 },
  auraDesktop: { src: '/images/work/aura-desktop.jpg', alt: 'Earn from Home, the Aura by Racheal academy: enrolment landing page with M-Pesa payment', width: 2880, height: 1800 },
  jazaPortal: { src: '/images/work/jaza-portal.svg', alt: 'Illustration of the Jaza WiFi captive portal: pick a plan, enter an M-Pesa number, pay', width: 360, height: 640, illustration: true },
  jazaDashboard: { src: '/images/work/jaza-dashboard.svg', alt: 'Illustration of the Jaza WiFi operator live view: devices online, revenue, uplink in use', width: 960, height: 600, illustration: true },
} satisfies Record<string, Shot>;

export const workSection = {
  eyebrow: 'Selected work',
  heading: 'Payment systems, built and tested end to end',
  moreHeading: 'More work',
};

/** The lead project on the home page (a client build, delivered through SaTechs). */
export const flagship: Flagship = {
  slug: 'umoja',
  name: 'Umoja',
  kind: 'Client · via SaTechs · Marketplace',
  status: 'live',
  summary: 'A digital-products marketplace: creators sell, buyers pay with M-Pesa and download instantly, with refund protection on every order.',
  bullets: [
    'Every payment and payout processed exactly once, even when callbacks repeat',
    'Double-entry ledger: every creator balance is traceable to the cent',
    'M-Pesa checkout and payouts, with Paystack for cards',
  ],
  shot: shots.umojaDesktop,
  liveUrl: 'https://umojacoaches.com',
};

/** Other work, in the order Steve wants it shown. `href` is where the whole card goes. */
export const projects: Project[] = [
  { slug: 'jaza-wifi', name: 'Jaza WiFi', kind: 'Own product · Hotspot billing', status: 'building',
    desc: 'Self-service paid WiFi: connect, pick a plan, pay with M-Pesa on your phone, and be online in under a minute.',
    hard: 'the phone that pays isn’t always the device that connects — so payment and access are two identities.',
    shot: shots.jazaDashboard, href: '/work/jaza-wifi', cta: 'Read the case study →' },
  { slug: 'gradehub', name: 'GradeHub', kind: 'Lead architect · SaaS', status: 'code',
    desc: 'School operations: fees, records and admin, with each school’s data isolated.',
    hard: 'a double-entry fee ledger, so balances are stored and verifiable.',
    shot: null, href: '/contact?route=hire', cta: 'Ask for code access →' },
  { slug: 'aura', name: 'Aura by Racheal', kind: 'Client · Education', status: 'live',
    desc: 'An online marketing academy with paid enrolment, run in production.',
    hard: 'Paystack enrolment with instalment payments.',
    shot: shots.auraDesktop, href: 'https://earnfromhome.vercel.app/', cta: 'Visit the live site ↗' },
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
