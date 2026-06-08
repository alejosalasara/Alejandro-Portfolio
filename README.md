# Handoff: Alejandro Salazar — Portfolio (long-scroll single page)

## Overview
A single-page, long-scroll personal portfolio for a UX engineer / graphic designer.
Identity is **black + one structural red**, oversized heavy display type (**Stara**),
hard rectangular geometry, hairline borders (no shadows), and technical wireframe
line-art. The page is one continuous vertical scroll with a signature **pinned
card-stack**: the first panel pins in place and the following sections rise up over it
as full-viewport cards.

The page is **bilingual (EN/ES)** and supports an **opt-in light theme**. Both desktop
and mobile/tablet layouts are fully designed (see **Responsive behavior**).

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** (React via
in-browser Babel). They are prototypes that demonstrate the intended look, layout,
motion, and interaction — **not production code to copy verbatim**.

Your task is to **recreate these designs in the target codebase's environment** using its
established framework, patterns, and libraries (React, Vue, Svelte, Astro, etc.). If no
front-end environment exists yet, pick the most appropriate framework for a content/
marketing site (e.g. Next.js or Astro) and implement there. Treat the HTML as the source
of truth for *visuals and behavior*; re-architect the *implementation* idiomatically.

The prototype runs as `index.html` at the project root (it loads React 18 + Babel from CDN
and the design-system CSS from `design-system/`). To view it, open the original project's
root `index.html` in a browser. The component logic lives in `src/*.jsx`.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion, and interactions.
Recreate the UI pixel-accurately using the codebase's libraries. All exact values are in
**Design Tokens** below and in `design-system/colors_and_type.css`.

---

## Layout System — the pinned card-stack (read this first)

The whole page after the hero + quote band is a single scroll region (`.stack`) of
full-viewport **cards** (`.stack-card`). Each card is `position: sticky; top: 0;
min-height: 100vh`. Because each successive card has a higher `z-index`, scrolling makes
later cards **slide up and pin over** the earlier ones — the earlier card stays fixed
behind. This is pure CSS sticky positioning (no scroll-jacking), so it degrades gracefully.

Card order (top → bottom of the page):
1. **Hero** (full-bleed photo band — *outside* the stack, scrolls normally)
2. **Quote band** (red full-bleed band — *outside* the stack, scrolls normally)
3. `stack-card[data-nav="about"]` — **"who am i"** (the panel everything pins over)
4. `stack-card[data-nav="works"]` — **selected works**
5. `stack-card--contact[data-nav="contact"]` — **"hit me up"** form **+ footer**, with a
   marquee band across its top.

Differentiation between rising cards is done with a **1px hairline top-stroke**
(`border-top: 1px solid var(--hairline)`) plus a whisper-light top-edge shadow. Grounds:
most cards sit on the pure-black ground (`--canvas` `#0D0D0D`); the **selected works** card
is the one exception — it keeps a slightly-lifted grey surface (`--surface-1` `#161616`), a
single quiet step up from black. The **contact** card is pure black (`--canvas`). All are
theme-aware (light mode: grey `#E8E8E3` / off-white `#F4F4F1`).

The contact card additionally **sweeps in horizontally** from the right on desktop as it
scrolls into view (an inner `.contact-slab` gets `translateX(100% → 0)` driven by a scroll
listener). On mobile (≤768px) the sweep is disabled — it simply rises from the bottom like
the others. There is a Tweaks toggle ("Stacking: Stacked / Linear") that swaps the whole
mechanic for plain stacked scroll (`.stack.no-stack`).

---

## Screens / Sections

The site is one page. Each section is documented below.

### 1. Nav (fixed overlay)
- **Purpose:** persistent navigation; brand, section jump-links, primary CTA, language, theme.
- **Layout:** `position: fixed; top:0; left:0; right:0; z-index:50`. Three groups via flex:
  left = icon-box (eye glyph, theme toggle) + wordmark `salazar.`; center = jump-links
  (`about`, `works`, `contact`); right = CTA button `GET STARTED →` + language menu (`EN`).
- **States:** transparent + white text over the hero photo; on scroll it becomes a
  theme-aware translucent **`backdrop-filter: blur()`** bar (with an opaque fallback). Active
  jump-link has an underline indicator.
- **Responsive (≤768px):** center jump-links are hidden; only brand + CTA + language remain.
  The CTA and language trigger are forced to an **identical 40px height** and share a baseline
  so they read as one aligned control group.

### 2. Hero
- **Purpose:** name lockup over a full-bleed photo band.
- **Layout:** full-viewport-width band; a striped/graded placeholder stands in for the photo
  (replace with a real high-contrast portrait). The name lockup ("DESIGN THAT CONVERTS" /
  the owner's name) sits in `.hero-inner` with generous top padding to clear the nav.
- **Line-art globe:** a dotted wireframe globe floats top-right (`.hero-art`). On desktop it
  drifts/scales slightly with scroll (parallax). On ≤1000px it becomes a small static corner
  accent (CSS `transform: scale(~0.5)`, `scale(~0.34)` ≤600px) — the scroll-drift JS is gated
  off below 1000px so it never inflates.
- **Copy:** display type is lowercase/mixed-case and personal; labels are UPPERCASE + wide-tracked.

### 3. Quote band
- **Purpose:** a condensed pull-quote section directly under the hero.
- **Layout:** full-bleed **red** band (`--surface-red` `#FF2800`), quote text left, wireframe
  coil motif right (static — **no parallax**). Auto-advances between quotes every 4s; pauses on
  hover; can be dragged left/right or navigated via the dots to change quote.
- **Responsive:** **fixed height** (≈300px @768 / ≈320px @390) so it never collapses; quote
  font reduces to ~19–20px.

### 4. "who am i" (About)
- **Purpose:** intro lockup + lead paragraph + buttons; the panel the stack pins over.
- **Layout (desktop):** two-column grid — oversized "who am i" lockup (with red chevrons and a
  stroke-outline "am i") on one side, lead paragraph + CTA buttons on the other.
- **Responsive (≤768px):** collapses to a single left-aligned column; headline uses
  `clamp(46px, 8.4vw, 92px)`.

### 5. Selected works
- **Purpose:** list of selected projects.
- **Layout:** section label "selected works" with red diagonal hatch marks, then a list of
  **works-rows**. Each row: project title (uppercase) + meta + a trailing **→ arrow**, with a
  1px hairline divider between rows.
- **Hover (desktop):** the trailing arrow rotates to a diagonal **↗ and turns red**; the title
  brightens; a **1:1 image preview follows the cursor** (a fixed 244×244 framed thumbnail that
  fades in).
- **Responsive (≤768px):** title wraps above meta, type shrinks (`clamp(18px,4.6vw,21px)`),
  rows tighten so all fit; arrow parks right. The cursor-preview is disabled (touch).
- **Background:** slightly-lifted grey `--surface-1` `#161616` (the one card that is NOT pure
  black — a single quiet step up; light mode `#E8E8E3`).

### 6. "hit me up" (Contact) — includes the marquee + footer
This card is the closing beat. Top → bottom inside `.contact-slab`:
- **Marquee band (top):** a full-bleed auto-scrolling band (`.marquee-wrap`) with 1px hairline
  borders top & bottom, ~22px vertical padding. Content: `UX / UI DESIGN ⧗ EMAIL MARKETING ⧗ …`
  separated by a **red hourglass `⧗`** glyph. Animates `translateX(0 → -50%)` over 22s linear,
  infinite (the track is duplicated so the loop is seamless). Font `clamp(40px,4.6vw,60px)`
  desktop / 30px mobile. Honors `prefers-reduced-motion` (animation off).
- **Contact form (centered):** the form area grows to fill and is **vertically centered**
  between the marquee and footer (no dead gap above the footer). Composition:
  - Left side: eyebrow `03 HAVE A PLAN?`, headline **"HIT ME UP."** (display), a short lead
    paragraph, and a wireframe **mesh** motif (`.c-art`, hidden ≤768px).
  - Right side: the form (`.c-fields`) — a Name + Email row; three discovery questions as
    numbered textareas (`01`, `02`, and `03` flagged with a red **IMPORTANT** tag + red hatch
    marks and a red-outlined textarea); a toggleable **"ADD A BUDGET RANGE"** control that
    reveals a hard-rect segmented control with 4 ranges; and a primary **"SEND IT ↗"** button.
  - On submit: the button label swaps to a "sent" state for ~2.2s and a toast fires; no real
    network call (wire to your backend).
- **Footer (bottom):** full-bleed divided bar matching the nav language. Full-height cells:
  social links (BEHANCE / LINKEDIN / INSTAGRAM, as hairline text chips), a center column with
  a **live local-time clock** + "AVAILABLE FOR FREELANCE WORK", and a red **"GO UP ↑"** cell
  that scrolls to top. Pinned to the bottom of the slab via `margin-top: auto`.
- **Background:** pure black `--canvas` `#0D0D0D` (matches the header), with a diagonal hatch
  texture overlay (`repeating-linear-gradient(135deg, var(--hatch) 0 2px, transparent 2px 13px)`).
- **Responsive (≤768px):** marquee 30px with a 70px top margin to clear the nav; sweep disabled;
  the form grows naturally; footer stacks into vertical rows (social cells in a row, center
  column, full-width GO UP).

---

## Interactions & Behavior
- **Pinned card-stack:** CSS `position: sticky` + ascending `z-index` (see Layout System).
- **Contact horizontal sweep (desktop only):** a `scroll` listener computes the contact card's
  progress into the viewport and sets `.contact-slab { transform: translateX(...) }` from 100%
  (off-right) to 0, eased `easeOutCubic`, over the last ~55% of its entry. Disabled ≤768px and
  in the "Linear" Tweaks mode.
- **Hatch background parallax:** each card's diagonal hatch `background-position-y` drifts with
  scroll so the ground keeps moving even while a card is pinned.
- **Hero globe drift (desktop only, >1000px):** translateY + scale + fade with scroll progress.
  (The quote band's coil motif is **static** — its earlier parallax was removed.)
- **Works cursor-preview:** a fixed 244×244 thumbnail follows the cursor on row hover, fading in
  (`opacity`/`transform` transition ~0.22s).
- **Marquee:** CSS keyframe `translateX(0 → -50%)`, 22s linear infinite; duplicated track for a
  seamless loop; off under `prefers-reduced-motion`.
- **Theme toggle:** the eye glyph toggles `<html data-theme="light">`, persisted to
  `localStorage`. Only the neutral ground + ink ramp invert; the red and white-on-red are
  constant. Surfaces over imagery (hero, work previews) stay light-on-dark in both themes.
- **Language (EN/ES):** the hamburger `LanguageMenu` switches language site-wide via a React
  context + `useT()` hook (string table in `src/i18n.js`). English is default.
- **Smooth scroll:** Lenis is used on fine-pointer desktops only; touch devices use native
  momentum scrolling. Honors `prefers-reduced-motion`.
- **Nav jump-links & CTA:** call a `salGoTo(id)` helper that scrolls to a section by accumulated
  `offsetTop` (robust against the sticky transforms).
- **Contact form submit:** prevents default, shows a transient "sent" state + toast (~2.2s),
  then resets. No validation rules are enforced in the prototype — add your own.

## State Management
- `theme`: `'dark' | 'light'` — persisted to `localStorage`; sets `html[data-theme]`.
- `lang`: `'en' | 'es'` — React context; drives `useT()` lookups.
- `stacked`: `boolean` (Tweaks "Stacking") — toggles `.stack.no-stack`.
- `active` (nav): which section is currently in view, for the active jump-link indicator.
- Contact form local state: `budgetOn` (boolean), `budget` (selected range | null),
  `sent` (boolean, transient).
- A small global `toast` message state for nav/section feedback.
- No data fetching in the prototype. The contact form and any project data should be wired to
  your backend / CMS.

## Design Tokens
Full source: `design-system/colors_and_type.css`. Key values:

**Color**
- `--canvas` `#0D0D0D` — page/header ground ("pure black"); used by most cards incl. about & contact
- `--surface-1` `#161616` — slightly-lifted grey; used by the **selected works** card (light: `#E8E8E3`)
- `--accent-red` / `--surface-red` `#FF2800` — the single structural accent (buttons, active
  arrows, hatch marks, the whole quote band)
- `--hairline` `#232323` — 1px borders on every outlined box and card top-stroke
- `--hairline-soft` `#1A1A1A`
- `--ink` `#FFFFFF` / `--ink-muted` `#868686` — **binary** text ramp (nothing between)
- `--on-accent` `#FFFFFF` — text/icons on red
- `--watermark` `#232323` — oversized ghost type behind content
- `--hatch` `#151515` — diagonal hairline weave on the ground; `--hatch-lit` `rgba(255,40,0,0.42)`
- Light theme (`[data-theme="light"]`): `--canvas` `#F4F4F1`, `--ink` `#0D0D0D`,
  `--hairline` `#D4D4CD`; red is unchanged.

**Type — family:** `Stara` (self-hosted, weights 500–900 + italics; **Medium 500 is the floor**,
no Regular/Light; **italic = quotation only**). Files in `design-system/fonts/`, wired via
`@font-face` in `colors_and_type.css`. Tracking is two-pole: tight on display, wide (+2–3px) on
uppercase labels.

| Role | size / weight / line-height / tracking |
|---|---|
| display-xxl (hero name, "who am i") | 96px / 900 / 0.95 / -1.5px |
| display-xl | 64px / 800 / 1.0 / -1.0px |
| display-outline (stroke-only) | 96px / 800, `transparent` fill, `-webkit-text-stroke: 1.5px` |
| marquee | 52px / 800 / 1.0 / +1px / uppercase |
| display-md (card titles) | 32px / 800 / 1.10 / -0.5px |
| quote (italic) | 30px / 500 italic / 1.25 / -0.3px |
| headline (names, works titles) | 20px / 700 / 1.20 / +0.5px / uppercase |
| body-lg (lead) | 18px / 500 / 1.35 |
| body | 15px / 500 / 1.40 |
| body-sm (meta) | 14px / 500 / 1.45 |
| label (nav, eyebrows) | 13px / 600 / +3px / uppercase |
| btn-label | 14px / 600 / +2px / uppercase |
| caption (footer, time) | 12px / 500 / +1px |

**Spacing** (8px base, 4px half-steps): 1, 4, 8, 12, 16, 24, 40, 64; section rhythm 120px.
**Radius:** `--radius-none` `0px` for **all** chrome (buttons, chips, inputs, portrait, cards);
`--radius-full` `9999px` for true circles only (glyphs, dots, line-art). **No pills, ever.**
**Borders:** `1px solid var(--hairline)`. **Elevation:** **no drop shadows** as a rule — depth is
flat type → hairline-outlined transparent boxes → solid red fills ("elevation by color") →
layered ghost watermark type. (The card-stack uses one whisper-light top-edge shadow purely to
hint the rising motion; keep it subtle or omit.)

## Assets
- **Fonts:** Stara `.ttf` (10 files) — included in `design-system/fonts/`. Self-hosted.
- **Imagery:** NO real photos/logos exist in the prototype. The hero portrait is a striped/graded
  **placeholder** — replace with a real high-contrast portrait framed by a hairline square. Works
  thumbnails and the cursor-preview use labelled placeholders — wire to real project images.
- **Line-art (globe, mesh, coil, chevrons):** abstract geometric **SVG reconstructions** drawn in
  `src/LineArt.jsx` (white/red strokes). Reusable as-is or replace with the real motifs.
- **Icons:** the prototype substitutes **Lucide**-style single-stroke glyphs (eye, sun/asterisk,
  arrow-up-right, arrow-right, chevron-left/right, arrow-up) in `src/Icons.jsx`. Swap for your
  icon set; keep them thin/geometric.
- **Brand logos** (Behance/LinkedIn/Instagram): referenced as **text chips** only — do not
  recreate trademarked marks; use your real icon set if licensed.

## Files
- `index.html` — the full prototype: all global CSS (card-stack, contact slab, responsive media
  queries), the scroll/sweep/parallax scripts, the React root that composes the sections, and the
  Tweaks panel. **Start here.**
- `src/Nav.jsx` — fixed overlay nav (blur on scroll, theme toggle, language menu, CTA).
- `src/Hero.jsx` — hero photo band + name lockup + line-art globe.
- `src/QuoteBand.jsx` — red pull-quote band (auto-advancing).
- `src/About.jsx` — "who am i" lockup + lead + buttons.
- `src/Works.jsx` — selected-works list + cursor-following image preview.
- `src/Marquee.jsx` — the auto-scroll band (now at the top of the contact section).
- `src/Contact.jsx` — "hit me up" booking form (questions, budget toggle, submit/sent state).
- `src/Footer.jsx` — divided footer bar (social cells, live clock, GO UP).
- `src/Icons.jsx` — icon glyph set. `src/LineArt.jsx` — SVG wireframe motifs.
- `src/i18n.js` — EN/ES string table + `useT()` hook + language context.
- `src/tweaks-panel.jsx` — the in-prototype Tweaks panel (design exploration only; **not part of
  the shipped product** — you can ignore/remove it).
- `design-system/colors_and_type.css` — **the design tokens** (colors, type roles, spacing,
  radius) + `@font-face`. `design-system/fonts/` — Stara `.ttf` files.
- `design-system/kit.css`, `synthesis.css`, `styles.css` — the shared kit + component styles the
  prototype builds on (marquee, works-rows, nav, buttons, form fields, etc.). Good reference for
  exact component CSS; re-express idiomatically in your framework.

## Notes / gotchas
- The prototype uses in-browser Babel + CDN React for portability — **do not ship that setup**;
  rebuild as real components.
- `tweaks-panel.jsx` and the Tweaks UI are an authoring aid, not a product feature.
- Sizes were anchored from a 1440px desktop frame and refined live; verify against your design
  grid. Mobile breakpoints used: **1000px** (globe), **768px** (primary structural), **460px**
  (small-phone tweaks).
- Honor `prefers-reduced-motion` everywhere (marquee, parallax, smooth-scroll already do).
