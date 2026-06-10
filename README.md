# Alejandro Salazar — Portfolio

Personal portfolio for **Alejandro Salazar**, Growth UX/UI Designer & Email Marketer.
Single-page, long-scroll, bilingual (EN/ES), light/dark theme.

**Stack:** React 18 (UMD/CDN) · Babel standalone (in-browser JSX) · Lenis smooth scroll · no bundler — open `index.html` with any local server.

---

## Running locally

```bash
# any static server works, e.g.:
npx serve .
# or
python -m http.server 8765
```

Then open `http://localhost:<port>`.

---

## Features

### Preloader
- Full-screen intro that counts 0 → 100 with an outline number, then splits with vertical curtains
- Phases: `counting → grow → part → ready → leaving` driven by CSS classes + JS timers
- Scroll is locked (`overflow: hidden` + Lenis paused) until the curtains finish opening
- Language-aware: status phrase and "Scroll to begin" / "Desliza para entrar" read from `localStorage`
- Pointer events disabled on the stage in `ready` state so the page is clickable underneath

### Hero
- Full-viewport band with a photo placeholder, headline **"DESIGN THAT CONVERTS"**, announce pill, eyebrow, and CTA
- Announce pill cycles through case names (metalform → imfit → noble) with a fixed width to prevent reflow
- On mobile: globe hidden, headline words each fill container width via JS font-size fitting, centered layout
- **Entrance animation:** on curtain open, all hero elements zoom in from blur (`scale(0.96) blur(14px)`) with a tight stagger (0 / 60 / 100 / 160ms)

### About — "who am i"
- Two-column grid: oversized display heading + red chevrons / lead paragraph / CTA buttons
- **Tools row** at the bottom: Adobe Suite · Figma · Klaviyo · Optimizely · Claude · Google Analytics — centered, hairline-bordered chips

### Selected Works
- List of 5 projects with title, meta, and tag
- Desktop hover: trailing arrow turns red + diagonal, cursor-following 244×244 image preview fades in

### Contact — "hit me up"
- Full-width marquee band at top (`UX / UI DESIGN ⧗ EMAIL MARKETING ⧗`)
- Two-column form: discovery questions (01 / 02 / 03), budget range toggle, send button
- **Slide-in animation:** form fields sweep in from the right, one-by-one with 100ms stagger, and lock in place on scroll (one-way — no slide-back)
- "Get Started" from any section pulses a red glow on the contact card (scoped to above the footer)

### Navigation
- Fixed overlay; transparent over hero, blurs on scroll
- Jump-links (`about`, `works`, `contact`) + `GET STARTED` CTA + language menu + theme toggle
- Active section tracked by scroll-spy

### Quote Band
- Full-bleed red band between hero and stack; auto-advances between 3 quotes every 4s
- Swipeable / draggable

### Footer
- Social chips (Behance / LinkedIn / Instagram), live local-time clock, **GO UP ↑** cell

---

## Sections & scroll mechanics

The page after the hero + quote band is a **pinned card-stack** (`.stack`):

| Card | `data-nav` | Notes |
|---|---|---|
| About | `about` | The base panel everything pins over |
| Works | `works` | Slightly-lifted `--surface-1` background |
| Contact + Footer | `contact` | Sweeps in from the right (desktop); marquee at top |

Each card is `position: sticky; top: 0; min-height: 100vh`. Later cards rise over earlier ones via ascending `z-index`. The contact card's inner `.contact-slab` gets `translateX(100% → 0)` driven by a scroll listener on desktop (disabled ≤768px).

---

## Internationalization

`src/i18n.js` holds the full EN/ES string table. All components consume it via `window.useT()` (a thin React context hook). Switching language updates `localStorage['salazar-lang']` and re-renders the entire tree. The preloader also reads this key directly (plain JS, before React mounts).

---

## Theme

`html[data-theme="light"]` toggles the neutral ramp. The structural red (`#FF2800`) and white-on-red are constant in both themes. Persisted to `localStorage['salazar-theme']`.

---

## Design tokens

Full source: `design-system/colors_and_type.css`

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0D0D0D` | Page ground, about + contact cards |
| `--surface-1` | `#161616` | Works card (light: `#E8E8E3`) |
| `--accent-red` | `#FF2800` | Buttons, arrows, structural accent |
| `--hairline` | `#232323` | 1px borders everywhere |
| `--ink` | `#FFFFFF` | Body text (light: `#0D0D0D`) |
| `--ink-muted` | `#868686` | Secondary / meta text |
| `--hatch` | `#151515` | Diagonal weave texture |

**Type:** `Stara` (self-hosted, weights 500–900). Files in `design-system/fonts/`.
**Radius:** `0px` on all chrome — no pills, no rounded corners, ever.
**Borders:** `1px solid var(--hairline)` only. No drop shadows.

---

## File map

```
index.html               — global CSS, scroll/sweep/parallax scripts, React root
src/
  i18n.js                — EN/ES string table + useT() hook
  Nav.jsx                — fixed overlay nav
  Hero.jsx               — hero band + headline + announce pill
  QuoteBand.jsx          — red pull-quote band
  About.jsx              — "who am i" + tools row
  Works.jsx              — selected works list + cursor preview
  Marquee.jsx            — auto-scroll band
  Contact.jsx            — booking form
  Footer.jsx             — social + clock + GO UP
  Icons.jsx              — icon glyph set
  LineArt.jsx            — SVG wireframe motifs (globe, mesh, coil)
  tweaks-panel.jsx       — dev-only tweaks panel (not a product feature)
design-system/
  colors_and_type.css    — design tokens + @font-face
  kit.css                — shared component styles
  synthesis.css          — layout + section styles
  fonts/                 — Stara .ttf files (500–900)
```

---

## Notes

- In-browser Babel is used for portability — not a production setup.
- `tweaks-panel.jsx` is an authoring aid only; ignore/remove before shipping.
- Primary breakpoints: `1000px` (globe), `768px` (structural), `520px` (form), `460px` (small-phone).
- `prefers-reduced-motion` is respected by the preloader, marquee, parallax, entrance animations, and Lenis.
- `scrollbar-gutter: stable` prevents layout shift when the preloader releases the scroll lock.
