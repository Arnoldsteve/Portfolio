# Page spec

Breakpoints: **phone < 640px**, **tablet 640–1023px**, **desktop ≥ 1024px**. Content max width 1200px (`--container`). Section spacing 112px desktop, 64px phone. Desktop and tablet share one layout that reflows (grids use `auto-fit, minmax(...)`); phone has its own patterns listed per page.

All copy comes from `content/site.ts`. Labels like "Selected work" are mono eyebrows in `ochre-text` (`.label`).

## Global

**Header.** Desktop/tablet: name (bold, links home) left; links Work, QA & security, About, Writing; primary button "Get in touch" → `/contact`. Current page link is `ink` + 600 weight. Phone: name left, 44px menu button right (`aria-expanded`, `aria-controls`) opening a full-screen sheet with the same links stacked large plus the primary button; focus is trapped; Esc closes.

**Footer.** © year + name + Nairobi; email, GitHub, LinkedIn, WhatsApp; theme toggle.

**Sticky mobile CTA (phone only).** A bar fixed to the bottom with paper background and top hairline. Home: "Get in touch" (primary) + WhatsApp icon button. Case study: "Talk to me about Jaza WiFi". About: "Book a call" + "Download CV". Not on Contact. Add bottom padding to the page so it never covers content.

## Home `/`

Reference: `reference/desktop/Home.dc.html`, `reference/phone/Phone-Home.dc.html`.

1. **Hero.** Availability pill (acacia dot + halo) · `display-xl` headline (max 15ch) · lead (max 40ch, ink-muted) · primary "See the work" + secondary "Download CV". Right column: portrait (4:5, radius 24, max-width 420) with an overlapping "Currently" card (surface, shadow-lift) bottom-left. **Phone:** no big portrait; the "Currently" card becomes a row with a 52px round photo; buttons full-width stacked.
2. **Proof strip.** 4 stats in one bordered surface row; each number has a 3px ochre underline bar; caption below. **Phone:** 2×2 grid.
3. **Experience strip.** 3 columns, 2px top rule (jacaranda for current, ink for others), mono date, org, role. **Phone:** stacked.
4. **Selected work.** Eyebrow + `display` heading. Flagship card on `ink-band`, radius 24: copy left (ochre eyebrow, status badge, title 44px, summary, 3 bullets with ochre square markers, jacaranda-on-band link), screenshot well right. Then a 3-up grid of ProjectCards: product-tinted screenshot well 16:10, mono kind + status badge, title, description, "Hard part:" line (label in ochre-text) above a hairline, "Read the case study →". Whole card is the link; hover lifts 2px with `shadow-lift`. **Phone:** flagship stacks screenshot first; cards stacked, description hidden.
5. **QA & security.** Left: eyebrow, heading "I break things before your customers do.", one paragraph. Right: 3 finding rows (surface cards) with an ochre-ruled mono kind label.
6. **SaTechs band.** `navy-fill`, radius 24, ochre eyebrow, heading, text in on-navy-muted; buttons "Get a quote from SaTechs" (white) and "See SaTechs services" (outline). Both link to `person.links.satechs`.
7. **Writing.** 3 post links with 2px ink top rule, mono date · minutes, title.
8. **Contact routes.** Heading "What brings you here?", reply-time line, 3 route cards linking to `/contact?route=build|hire|partner`. **Phone:** compact rows with an arrow.

## Case study `/work/[slug]`

Reference: `Work-Jaza` (desktop and phone). Data: `jazaCaseStudy`.

1. Breadcrumb "Work / Jaza WiFi" (phone: "← All work").
2. Eyebrow, `h1` (up to 80px), one-liner, meta row (Role, Status with acacia dot, Rails, Stack) as a `<dl>` over a hairline. Phone: 2×2.
3. Showcase on `ink-band`: dashboard well (16:10) + phone portal well (9:16). Phone: just the phone well, centred.
4. Results: 3 stat cards with ochre bars. Phone: compact rows.
5. Two-column body: left "On this page" nav (jacaranda left rule on the active item; highlight the section in view with IntersectionObserver), right article max 720px at 18px/1.7. Phone: nav becomes horizontally scrollable pills under the results.
6. Sections: The problem · Constraints (ochre markers) · How it works (5-step flow; step 3 "pay with M-Pesa" highlighted in jacaranda-mist; phone: vertical numbered timeline) + architecture diagram well · The key decision ("Chose" card with acacia label, "Rejected" dashed card) · Result · "What I'd change" box on ochre-soft.
7. End: two cards — primary "Talk to me about Jaza WiFi" (jacaranda fill) → `/contact?route=partner`, and "Next case study".

## About `/about`

Reference: `About` (desktop and phone).

1. Portrait (square, radius 24) + eyebrow, `h1` "Engineer first, tester always.", bio paragraph, "Download CV (PDF)" primary + "Book a call".
2. "How I work": 4 numbered habit cards (jacaranda mono numbers).
3. Experience timeline: rows with date column (jacaranda for current) and org, role, bullet points. Aside: stack chips, education, languages, location.
4. Dark `ink-band` hiring CTA: "Remote, contract or full-time — let's talk." with "Book a call" (on-band-jacaranda fill, dark text) + "Download CV".

## Contact `/contact`

Reference: `Contact` (desktop and phone). This is the conversion page; it is interactive.

- Heading "What brings you here?" + "Pick one and the form adapts. I reply within one working day."
- **Route picker:** 3 options as an accessible radio group (`role="radiogroup"`, arrow-key navigation). Selected: jacaranda-mist background, 2px jacaranda border. Preselect from `?route=` query, default `build`.
- **Adaptive form** reads `contactRoutes[route]`: heading, tag (navy-soft "Goes to SaTechs" or jacaranda-mist "Comes to Steve"), select label + options, message label, button label. Fields: Name, Email or WhatsApp, select, message, hidden honeypot. Phone inputs use 16px text (prevents iOS zoom).
- **States:** idle → submitting (button disabled, spinner) → success card ("Thanks — you'll hear back within one working day." + route-specific line + "Send another") → error (inline, keeps input).
- Aside: dark "Prefer to talk? Book a 20-minute call" card with the Cal.com embed (lazy-load on interaction; placeholder until `person.links.booking` is set), then email, WhatsApp/LinkedIn/GitHub, hours. Phone: booking card as a row link; WhatsApp and Email as two buttons.
- FAQ: `<details>` accordion from `faq`.

## SEO

| Page | Title | Description |
| --- | --- | --- |
| Home | Steve Arnold Otieno — payments and platform engineer, Nairobi | I build and test the systems that move money on African payment rails: M-Pesa, Paystack, Stripe. |
| Jaza WiFi | Jaza WiFi case study — Steve Arnold Otieno | Hotspot billing paid with M-Pesa on MikroTik routers. |
| About | About — Steve Arnold Otieno | Full-stack engineer and QA specialist in Nairobi; founder of SaTechs Solutions. |
| Contact | Contact — Steve Arnold Otieno | Build with SaTechs, hire Steve, or partner on Jaza WiFi. Replies within one working day. |

JSON-LD `Person`: name, jobTitle "Software Engineer", address Nairobi KE, `sameAs` GitHub + LinkedIn, `worksFor` Tourlast, `founder` of Organization SaTechs Solutions.
