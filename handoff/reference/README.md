# Reference designs

Each `.dc.html` file is one approved page from the design canvas. They are HTML with **inline styles** plus a small `<script type="text/x-dc">` block whose `renderVals()` holds the repeated data (cards, stats, routes). Template syntax:

- `{{name}}` — a value from `renderVals()`.
- `<sc-for list="{{items}}" as="item">…</sc-for>` — repeat for each item.
- `<sc-if value="{{cond}}">…</sc-if>` — conditional block.
- `onClick="{{handler}}"` — event handler from `renderVals()`.

Use them to read exact spacing, sizes, radii, colours and structure. Do **not** copy the inline styles: rebuild as React components with Tailwind classes mapped to the tokens. Hex values in these files map to tokens as follows:

| Hex | Token |
| --- | --- |
| #F4F1EA | paper |
| #FBFAF6 | surface |
| #EAE5DA | sunken |
| #D9D2C3 | line |
| #1B1815 | ink / ink-band |
| #57504A | ink-muted |
| #6B645C | ink-faint |
| #5B3E96 | jacaranda |
| #452C78 | jacaranda-deep |
| #ECE6F6 | jacaranda-mist |
| #C98A2B | ochre |
| #8A5A12 | ochre-text / pending |
| #F5E8D0 | ochre-soft |
| #2E6B4E | acacia |
| #E1EEE6 | acacia-soft |
| #16325C | navy / navy-fill |
| #E3EAF5 | navy-soft |
| #C9D6EA | on-navy-muted |
| #F1ECE3 | on-band |
| #B5ADA2 | on-band-muted |
| #B9A2F0 | on-band-jacaranda |
| #E3A84B | on-band-ochre / on-navy-accent |
| #2B2622 | ink (body copy in articles; use ink) |
| #D6E6E3 | product tint (Umoja) — content, not a token |

Desktop files are fluid (they reflow for tablet). Phone files are fixed at 390px and show phone-specific patterns.
