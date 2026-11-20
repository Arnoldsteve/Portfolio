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
├── src/app/                     # Routes: /, /work/[slug], /about, /contact, /api/contact, OG image, sitemap, robots
├── src/components/ui/           # Primitives: Button, Badge, Label, Stat, SectionHeader, ShotWell…
├── src/components/layout/       # Header, mobile menu, Footer, theme toggle, sticky phone CTA
├── scripts/check-placeholders.ts
└── tests/                       # Playwright smoke, axe accessibility and contact-form tests
```

## Running locally

```bash
cd client
pnpm install
cp .env.example .env.local   # fill in Resend + recipient addresses to send real mail
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm build` | Lists remaining placeholders, then builds. Fails on Vercel **production** builds while placeholders remain, unless `ALLOW_PLACEHOLDERS=1`. |
| `pnpm lint` / `pnpm typecheck` | ESLint / TypeScript |
| `pnpm check-placeholders` | Lists every `[placeholder]` left in `src/content/` |
| `pnpm test:e2e` | Playwright at 1440 / 834 / 390 px, light + dark, axe on every page (run `pnpm build` first; first run: `pnpm exec playwright install chromium`) |

## Editing content

Change copy, links and numbers in `client/src/content/site.ts` only. Never replace a placeholder with an
invented number, client name, date or quote — see `handoff/docs/FACTS.md` for what is verified.
To add a full case study, add an entry to `caseStudies` (same shape as `jazaCaseStudy`); until then the
project's `/work/<slug>` page shows "Case study coming soon".

## Contact form env vars (Vercel)

`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO_STEVE` (hire / partner), `CONTACT_TO_SATECHS` (build).

## License

MIT
