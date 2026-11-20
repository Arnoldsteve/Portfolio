# Portfolio v4 — build instructions for Claude Code

You are rebuilding Steve Arnold Otieno's personal site (currently https://steve-arnold.vercel.app) from a finished design. The design, tokens, copy and page specs are all in this folder. **Your job is implementation, not redesign.** When something is unclear, follow the reference designs; when they are silent, follow `docs/BRAND-BOOK.md`; if still unclear, ask Steve rather than invent.

## Where to build

- Repo: `Arnoldsteve/Portfolio` (Next.js, TypeScript, Tailwind, shadcn/ui, deployed on Vercel). Work on a new branch `v4-redesign`. Do not push to the default branch.
- First inspect the repo: Next.js version (App Router expected), Tailwind version (v3 or v4), existing shadcn components, and where `Steve_Arnold_SE_Resume.pdf` lives. Report what you found before changing anything.
- Replace the old pages and styles. Keep the CV PDF and any images Steve wants to keep (ask).

## What is in this folder

| Path | What it is | How to use it |
| --- | --- | --- |
| `docs/BRAND-BOOK.md` | Brand book: conversion rules, voice, colour theory, type, spacing | Read fully first. The seven conversion rules are acceptance criteria. |
| `docs/PAGES.md` | Page-by-page spec, responsive behaviour, interactions, SEO | The build plan. |
| `docs/FACTS.md` | What is verified vs placeholder | Never publish a claim not listed as verified. |
| `design/tokens.json` | Source tokens (colour per theme, type, spacing, radius, shadow) | Source of truth. |
| `design/tokens.css` | Tokens compiled to CSS variables + type classes, light/dark | Copy to `app/tokens.css`, import first in `globals.css`. |
| `design/tailwind-theme.css` | Tailwind v4 `@theme` mapping to the variables | Use if the repo is on Tailwind v4. |
| `design/tailwind-v3.preset.ts` | Same mapping as a Tailwind v3 preset | Use if the repo is on Tailwind v3. |
| `design/components-reference.css` | Plain-CSS reference of every component | Port to React + Tailwind; don't ship as-is. |
| `content/site.ts` | All copy, typed | Copy to `content/site.ts`. Components read from it; no copy hard-coded in JSX. |
| `reference/desktop/*.dc.html`, `reference/phone/*.dc.html` | The approved page designs | Visual spec. See `reference/README.md`. |

Live, clickable versions of the same designs (for Steve to compare against): canvas https://claude.ai/artifact/NPND175N9Dah72MFXPp8E1 (tab "Round 3 · Pages") and design system https://claude.ai/artifact/TH6s37Z7LuvvsB3yMuGvvp. These need Steve's login; you work from the files here.

## Non-negotiables

1. **Tokens only.** No raw hex, rgb or px colour values in components. Use the CSS variables (`var(--jacaranda)`) or the Tailwind names mapped to them (`bg-jacaranda`, `text-ink-muted`). Spacing and radius from the scale.
2. **Colour roles never swap:** `jacaranda` = anything you can press (buttons, links, focus, current state). `ochre` = proof (stat underline bars, result labels, list markers), never a button. `acacia` = live/available only. `navy` = SaTechs only.
3. **One primary (jacaranda) button per view.**
4. **Fonts:** Geist and Geist Mono via `next/font/google`, bound to `--font-sans` / `--font-mono`.
5. **Light and dark themes** both work: `data-theme` on `<html>`, defaulting to the system preference, with a small toggle in the footer. No flash of the wrong theme.
6. **Accessibility:** WCAG 2.2 AA. Real `<button>`/`<a>`, visible labels on every input, focus ring = 2px `--focus` with 2px offset, touch targets ≥ 44px, `prefers-reduced-motion` respected, one `<h1>` per page.
7. **Placeholders stay visible.** Text in `[brackets]` comes from `content/site.ts` and renders as-is. Add `scripts/check-placeholders.ts` that lists every remaining bracket in `content/` and fails CI in production builds only when `ALLOW_PLACEHOLDERS` is not set. Never replace a placeholder with an invented number, client name, date or quote.
8. **Performance:** Lighthouse ≥ 95 on all four categories for Home on mobile. Server components by default; client components only for the contact router, the mobile menu and the theme toggle. Images through `next/image`.
9. **No new dependencies** beyond what the repo has, plus: `resend` (contact email) and `zod` (form validation). Ask before adding anything else.

## Build order (one PR-sized step each; run `pnpm build` and lint after each)

1. **Foundations:** tokens.css, Tailwind mapping, fonts, theme switching, base layout (`max-w-container`, page gutters 32px desktop / 20px phone), `content/site.ts`.
2. **Primitives:** Button (primary, secondary, small), Badge (live, pilot, concept, new, via-SaTechs), AvailabilityPill, Label (mono eyebrow), Stat, SectionHeader.
3. **Chrome:** Header (desktop links + one primary button; phone: name + menu button opening a full-screen sheet), Footer, StickyMobileCTA (phone only, < 640px).
4. **Home** (`/`) — match `reference/desktop/Home.dc.html` and `reference/phone/Phone-Home.dc.html`.
5. **Case study** (`/work/[slug]`) — template from `Work-Jaza`; only `jaza-wifi` has full content now; other slugs render the same template from `content/site.ts` once Steve adds their content (until then, project cards link to `/work/jaza-wifi`'s pattern but show "Case study coming soon" on their own route).
6. **About** (`/about`).
7. **Contact** (`/contact`) — the router + adaptive form (see PAGES.md) + `app/api/contact/route.ts`.
8. **SEO and polish:** metadata per page, Open Graph image (`app/opengraph-image.tsx`, paper background, name in Geist, jacaranda bar), JSON-LD `Person` with `sameAs` (GitHub, LinkedIn, SaTechs) and `worksFor`, sitemap, robots, 404 page in the same style.
9. **QA pass** (Steve is a QA engineer; this matters): Playwright smoke tests for each route at 1440, 834 and 390 widths; contact form happy path and validation errors; axe accessibility check on every page; dark-mode screenshots. Report results.

## Contact form backend

- `POST /api/contact` with zod validation: `route` (build | hire | partner), `name`, `contact` (email or WhatsApp), `topic`, `message`, plus a hidden honeypot field.
- Send with Resend. `route=build` → `CONTACT_TO_SATECHS`; `hire`/`partner` → `CONTACT_TO_STEVE`. From `CONTACT_FROM`. Env vars only; add them to `.env.example`, never commit secrets.
- Rate-limit by IP (simple in-memory token bucket is fine for now). Show the success state from the design on 200; inline error text on 4xx/5xx.

## Definition of done

- All four pages match the reference designs at 1440, 834 and 390 px in light and dark.
- Every conversion rule in `docs/BRAND-BOOK.md` holds on every page.
- `check-placeholders` output is attached to the final report so Steve knows exactly what to fill.
- Lighthouse and axe results attached. Vercel preview URL shared.
