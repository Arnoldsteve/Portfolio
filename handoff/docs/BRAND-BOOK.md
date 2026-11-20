# Steve Arnold Otieno — design system

The personal brand of Steve Arnold Otieno: a Nairobi-based senior full-stack engineer with a QA background, who builds and tests the systems that move money on African payment rails, and founded SaTechs Solutions. Everything here serves one job: a visitor should understand who Steve is, believe it, and take the next step within one screen.

**The idea in one line: jacaranda acts, ochre proves.** Bone and basalt neutrals, one dusky violet for every action, one red-gold earth tone for every result. It should feel like a private bank's ledger written in Nairobi, not a tech demo.

## The conversion rules

These come before any visual rule. A page that breaks one is not done.

1. **Who, what, proof, action — above the fold.** The first screen holds the positioning headline, one line of who Steve is, one proof row (a number or a named employer), and the primary button. Nothing decorative competes with them.
2. **One primary action per view.** One `jacaranda` button per screen. Everything else is the quiet button or a text link.
3. **Every claim carries a number and its context.** "99.8% transaction success on a UK travel checkout", never "highly reliable". No number yet → no claim.
4. **Label status honestly.** Every project wears exactly one of Live, Pilot or Concept (the Badge component). An honest "Pilot" converts better than a vague case study that gets found out.
5. **No dead ends.** Every case study and section ends with one next step.
6. **Route, don't funnel.** The contact section asks what brings the visitor and sends them to the right place: builds go to SaTechs, hiring and partnerships come to Steve. State the reply time.
7. **Show the work.** Real screenshots or nothing. A labelled empty well beats a stock photo.

## Voice — content fundamentals

Plain, specific, calm. Short sentences. The reader is a CTO or a founder skimming between meetings.

- **Do:** lead with the outcome, name the rail ("M-Pesa", "Paystack"), give the number, say what it cost. First person, "I".
- **Don't:** "passionate", "world-class", "hacker-proof", "cutting-edge", exclamation marks, emoji.
- **Headlines** name a result or a promise: *I build and test the systems that move money on African payment rails.*
- **Buttons** are verb-first, sentence case, and say what happens: "Book a 20-minute call", "Read the case study", "Download CV". Never "Submit" or "Click here".
- **Case studies** follow one order: Problem → Constraints → Key decision (and the alternative rejected) → Result → My role → What I'd change.

| Instead of | Write |
| --- | --- |
| Building secure, modern web platforms at scale | I build and test the systems that move money on African payment rails |
| Hacker-proof checkout | Idempotent checkout: a retried payment never charges twice |
| Send message | Send — I reply within a day |
| Available for hire | Taking on one new engagement from [month] |

## Visual foundations

### Colour — "Jacaranda & Ochre on Basalt"

Most engineer portfolios are blue, or black with neon. This one takes its palette from Nairobi itself: the **jacaranda** trees that turn the city violet every October and November, the **ochre** red-gold of Kenyan earth, and the **basalt** of the Rift Valley. Warm, quiet neutrals carry the page; two jewel accents do the work.

**The theory.** Jacaranda violet (hue ≈ 265°) and ochre (≈ 38°) sit almost opposite on the colour wheel, so they are complementary: each makes the other look richer, and together they read as considered rather than loud. Premium comes from restraint: low-saturation warm neutrals, one saturated accent at a time, never a gradient.

| Share | Colour | Job |
| --- | --- | --- |
| ~70% | `paper`, `surface` (bone / ivory; basalt by night) | Room to read. Warm, never pure white or pure black. |
| ~20% | `ink`, `ink-band` (basalt black) | Text, structure, the flagship band. |
| ~7% | `jacaranda` | **Action.** Buttons, links, focus, the current role. If you can't press it, it isn't violet. |
| ~3% | `ochre` | **Proof.** The bar under a stat, a result label, list markers. Never a button. |
| tiny | `acacia` | Means "live / available", nothing else. |

- **Violet acts, ochre proves.** A visitor learns the code in seconds: violet = what I can do next, gold = what he has achieved. Never swap them.
- **Dark theme is a peer.** Basalt ground, ivory text, lighter violet and gold. The flagship band turns jacaranda-night so it never melts into the page.
- **SaTechs is a guest.** Its own navy appears only in the SaTechs band and "Via SaTechs" badges, with an ochre eyebrow so the band still belongs here.
- **Product colours** stay inside their own screenshot wells.
- Every text pair is AA or better in both themes; the ratios are in each token's note. Violet and ochre also differ strongly in lightness, so they stay distinct for colour-blind visitors.

### Type

One family, Geist, plus Geist Mono for labels and code — it reads engineered without looking like a terminal. Load both from Google Fonts.

- Headlines are tight (-0.03em) and heavy (600); body text is relaxed (26px leading at 16px).
- `label` (mono, uppercase, tracked) is the eyebrow above every section and card title. It carries category and metadata: "CASE STUDY · PAYMENTS".
- `stat` is for proof numbers and is never used without a caption.
- Lines stop at `measure-text` (68 characters).

### Space and shape

- An 8px rhythm: `space-2` up to `space-24`. Sections breathe at `space-24`; cards pad at `space-6` or `space-8`.
- Radii grow with the size of the thing: badges `radius-sm`, buttons `radius-md`, cards `radius-lg`, feature bands `radius-xl`. Pills only for the availability marker.
- Borders before shadows: cards rest on a `line` hairline; `shadow-lift` appears on hover only.

### Motion

Little and quick. Cards lift 2px on hover (150ms ease-out). Nothing loops, nothing parallaxes. Respect `prefers-reduced-motion`.

### Imagery

Real product screenshots in a `sunken` well with `radius-lg`, shown at their real ratio. A photo of Steve once, in the hero or the about strip: natural light, plain background. No stock photography, no 3D blobs, no gradient meshes.

## Iconography

Line icons from Lucide at 1.75px stroke, 20px in text and 24px standalone, coloured with `currentColor` so they follow text colour. Use them sparingly: in the contact router, the experience strip and the footer links. Never as decoration on headings.

## Logo

There is no logo mark yet. Set the name in Geist 600 at -0.02em in `ink`: **Steve Arnold Otieno**. Do not draw a monogram until one is designed on purpose.

## Page anatomy (the home page)

1. **Nav** — name left; Work, QA, SaTechs, Writing; one `jacaranda` button "Get in touch".
2. **Hero** — availability pill, `display-xl` headline, `lead`, primary + quiet button, then the stat strip.
3. **Experience strip** — Tourlast (current), iTravel Holidays (previous), SaTechs Solutions (founder).
4. **Selected work** — the flagship card (Jaza WiFi) on `ink-band`, then project cards in a grid.
5. **QA and security** — findings as a list of short proofs.
6. **SaTechs band** — `navy-fill`, hands off client work.
7. **Writing** — three post links.
8. **Contact router** — three routes and a form.

## Using this system

Colours, spacing, radii and shadows are CSS custom properties named after their tokens (`var(--jacaranda)`, `var(--space-6)`, `var(--radius-lg)`); type styles are classes (`.display-xl`, `.label`). Theme with `data-theme="light"` or `"dark"` on `<html>`. Components are plain HTML and CSS in `components/bundle.css` with the `sa-` prefix — no JavaScript runtime is needed. Each component's README says what the consumer provides.
