# Steve Arnold Otieno — Portfolio v4

Personal site: https://steve-arnold.vercel.app

Built from the v4 design handoff in [`handoff/`](handoff/) (brand book, page specs, tokens, reference designs).
The idea in one line: **jacaranda acts, ochre proves.**

## Stack

Next.js 16 (App Router, server components by default) · TypeScript · Tailwind CSS v4 mapped to design tokens ·
Geist / Geist Mono via `next/font` · Resend + zod for the contact form · Playwright + axe for QA. Deployed on Vercel.

## Layout

```
client/
├── src/content/site.ts          # ALL copy. Text in [brackets] is a placeholder still to fill.
├── src/app/tokens.css           # Design tokens (light/dark) — source: handoff/design/tokens.json
├── src/app/globals.css          # Tailwind v4 @theme mapping to the tokens
├── src/content/                 # ALL copy and data, split by area (profile, work, contact, posts); site.ts re-exports
├── src/app/                     # Routes: /, /work/[slug], /about, /contact, /writing, /api/contact, /api/booking(/slots)
├── src/components/              # ui/ primitives, layout/, home/, work/, contact/ (contact form + native booking)
├── src/lib/                     # Schemas (zod), Cal.com client, rate limiter, dates, spam trap
├── scripts/                     # check-placeholders.ts, check-env.ts (run before every build)
└── tests/                       # e2e + axe (3 engines), unit/, visual/ (opt-in), live/ (opt-in)
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, build and the full test suite on every push and PR.

## Running locally

Requires Node 22.6+ (`.nvmrc`).

```bash
cd client
pnpm install
cp .env.example .env.local   # Resend + recipient addresses, to send real mail
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm build` | Checks placeholders and env vars, then builds. Both checks fail **production** builds on Vercel (`VERCEL_ENV=production`): placeholders unless `ALLOW_PLACEHOLDERS=1`, and missing contact-form env vars always. |
| `pnpm lint` / `pnpm typecheck` | ESLint (Next 16 rules) / TypeScript |
| `pnpm test:e2e` | Every page at 1440 / 834 / 390 (Chromium), iPhone (WebKit) and desktop Firefox, light + dark, axe on every page, plus unit tests. Run `pnpm build` first; first time: `pnpm exec playwright install chromium webkit firefox`. |
| `pnpm test:unit` | Pure logic only (dates, schemas, rate limit, booking state) — fast, no browser |
| `pnpm test:visual` | Screenshot comparison against approved baselines. After an intended design change: `pnpm test:visual --update-snapshots` |
| `pnpm test:live` | **Real** Cal.com booking and **real** contact email (needs `.env.local`). Cancel the test booking in Cal.com afterwards. |

## Editing content

Change copy, links and numbers in `client/src/content/` only. Never invent a number, client name, date or
quote — see `handoff/docs/FACTS.md` for what is verified. To add a full case study, add an entry to
`caseStudies` in `content/work.ts` (same shape as `umojaCaseStudy`).

## Booking

The contact page books calls natively through Cal.com's public API (no API key): visitors pick a call, day
and time on the site. Calls offered are `booking.calls` in `content/contact.ts`; their ids must match the
event slugs on cal.com/steve-arnold.

## Env vars (Vercel)

`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO_STEVE` (hire / partner), `CONTACT_TO_SATECHS` (build).

## License

MIT
