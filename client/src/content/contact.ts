// Contact routes, the contact page, booking and FAQ.

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
  errorUnavailable: 'The form isn’t working right now, so your message was not sent. Please email me directly:',
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
  laterLimit: 'That’s as far ahead as I take bookings.',
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
    unknown: 'We couldn’t confirm your booking. Please check your email for an invite before trying again.',
    rateLimited: 'Too many attempts from your connection. Please wait a minute and try again.',
  },
  external: 'Book on Cal.com instead ↗',
};

export const faq = [
  { q: 'Do you work with clients outside Kenya?', a: 'Yes. I worked remotely for UK-based iTravel Holidays for two years. UTC+3 overlaps a full European working day and the US morning, I work async by default, and I invoice in USD, EUR or GBP.' },
  { q: 'Why do builds go to SaTechs?', a: 'SaTechs is my studio. Client builds get a team, a contract and a QA report, and I stay involved.' },
  { q: 'Are you open to full-time roles?', a: 'Yes — full-time or contract, remote. I do my best work where I own features end to end and quality is part of the job, especially in payments and fintech.' },
  { q: 'Can I see code for projects without a live demo?', a: 'Yes. GradeHub has no public demo right now, but I can give code access on request — pick “I’m hiring” on the form and say which project.' },
];
