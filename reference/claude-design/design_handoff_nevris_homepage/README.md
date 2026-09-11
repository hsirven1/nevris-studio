# Handoff: Nevris Studio — Homepage (desktop)

## Overview
Marketing homepage for **Nevris Studio**, an independent product studio in Montréal. The site's concept is *"the studio's working surface, made public"* — it must read as a studio actively building, not an archive of finished case studies. Sections: hero + live status, selected work (three projects, each with its own visual world), Lab, Studio, About, Contact.

## About the design files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy. The task is to **recreate these designs in the target codebase's environment** (Next.js/React + Tailwind is the natural fit) using its established patterns. If no codebase exists yet, pick the framework and implement there.

The `.dc.html` files open directly in a browser. They are a single streamed template with **inline styles only** — read them for exact values, then re-express as components + tokens.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy and composition. Recreate pixel-accurately at 1440px desktop width. Responsive/mobile behavior is **not designed yet** — see "Responsive" below.

## Files
| File | What it is |
|---|---|
| `Nevris Homepage.dc.html` | The homepage design. Primary reference. |
| `Nevris Visual Directions.dc.html` | The three explored art directions (1a Kinetic Editorial, 1b Object Terminal, 1c Working Index) and the reasoning behind the chosen system. Context, not to be built. |

## Design tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `ground` | `#ECEBE7` | Global page background (warm grey) |
| `ink` | `#111110` | Global text, hairlines, inverted section backgrounds |
| `ink-60` | `#46453F` | Secondary body copy on light ground |
| `ink-45` | `#6A6963` | Metadata, muted mono labels |
| `rule` | `rgba(17,17,16,0.20)` | Inner hairline rules on light ground |
| `panel` | `#E4E2DC` | Hero "Currently" panel fill |
| `lavender` | `#C9B6F7` | Marker highlight / selection / annotation. Never decorative. |
| `live` | `#93E03C` | Status only: live, running, in build, latency, confidence |
| **Wilder world** | | |
| `wilder-bg` | `#0D0E0F` | Section background |
| `wilder-panel` | `#131517` | UI console fill |
| `wilder-rule` | `#2A2C2E` | Console borders |
| `wilder-rule-2` | `#1E2022` | Table row dividers |
| `wilder-text` | `#F2F2F0` / body `#D8D8D4` / meta `#8A8A85` | |
| row highlight | `rgba(147,224,60,0.06)` | Top recommended action row |
| **Juno world** | | |
| `juno-bg` | `#F0E3D4` | Warm sand ground |
| `juno-ink` | `#171310`, meta `#6E625A` | |
| stripe | `#E4D5C4` on `#F0E3D4` | Image placeholder |
| **Léré world** | | |
| `lere-bg` | `#14181A`, stripe `#1C2124` | |
| `lere-rule` | `#2A3033`, text `#EFEFEA`, meta `#8A9095` | |
| **Studio (inverted)** | | |
| bg `#111110`, rule `#2A2A28`, text `#F2F2F0` / `#D8D8D4` / `#8A8A85` | | |

### Typography
Google Fonts, one request:
`Instrument Serif` (400, 400 italic) · `JetBrains Mono` (400, 500) · `Schibsted Grotesk` (400–800) · `Archivo` variable `wdth 62..125`, 400–700.

| Role | Font | Spec |
|---|---|---|
| Hero H1 | Schibsted Grotesk 800 | 128px / 0.9 / `-0.045em` |
| Contact H2 | Schibsted Grotesk 800 | 150px / 0.86 / `-0.05em` |
| Section H2 (Lab) | Schibsted Grotesk 800 | 96px / 0.9 / `-0.04em` |
| Project title (Wilder) | Schibsted Grotesk 700 | 96px / 0.92 / `-0.04em` |
| Project title (Léré) | Schibsted Grotesk 700 | 84px / 0.9 / `-0.04em` |
| Project title (Juno) | Instrument Serif 400 | 118px / 0.9 / `-0.02em` |
| Studio statement | Schibsted Grotesk 700 | 62px / 1.02 / `-0.035em` |
| Expressive accents | Instrument Serif 400 **italic** | 26–56px. Used ~5× total: "Not an archive.", Juno pull-quotes, "is open", "the interface", the contact email |
| Row title (Lab) | Schibsted Grotesk 600 | 26px / `-0.02em` |
| Body large | Schibsted Grotesk 400 | 19px / 1.5 |
| Body | Schibsted Grotesk 400 | 16–17px / 1.6 |
| Metadata / labels / tables | JetBrains Mono 400 | 10–11px, `letter-spacing 0.10–0.16em`, UPPERCASE |
| Big index numerals | Archivo 600, `font-variation-settings: 'wdth' 68` | 44px (Juno/Léré), 90px (Wilder), 54px |

### Spacing & structure
- Page: fixed `width: 1440px`, centered, `overflow: hidden`.
- Horizontal gutter: **48px** everywhere. Full-bleed sections run edge to edge and re-pad internally by 48px.
- Section vertical rhythm: 56–96px top padding; contact 96/120px.
- Grid: CSS Grid with 12-unit fractional splits — hero `8fr 4fr`, Wilder `3fr 9fr`, Juno `5fr 4fr 3fr`, Léré data strip `4fr 4fr 4fr` (1px gaps over a rule-colored parent), Studio `7fr 5fr`, About `120px 5fr 4fr`, Contact `6fr 3fr 3fr`. Gap 40–56px.
- Borders: **1px solid**, square corners. The only radius in the design is the nav capsule (`999px`) and status dots.
- No shadows except the nav capsule: `0 8px 30px rgba(17,17,16,0.14)`.

### The marker highlight (important)
Lavender highlight is a background band, **not** a solid inline background — at these line-heights a solid background covers the line above. Implement as:
```css
background-image: linear-gradient(#C9B6F7, #C9B6F7);
background-repeat: no-repeat;
background-size: 100% 0.82em;      /* 0.8em on the 150px contact H2 */
background-position: 0 0.18em;     /* 0.2em on the contact H2 */
padding: 0 8px; margin-left: -8px; /* 10px on the contact H2 */
```

## Screens / sections

### 0. Status bar (top)
Full-width row, 22px/48px padding, 1px bottom rule. Left: pulsing green dot + `NEVRIS STUDIO`. Right: mono metadata `MONTRÉAL / QC · 45.50° N · EST 09:42 · EST. 2026` (first three at `ink-45`, last at `ink`).
*Note: the clock is static in the mock — wire to real local time (America/Toronto).*

### 1. Hero
Grid `8fr 4fr`, 72px top padding.
- **Left**: mono eyebrow `N°000 —— INDEPENDENT PRODUCT STUDIO` (label, flexible 1px rule, label). H1 in three lines: "The studio's / working surface, / **made public.**" (last two words lavender-highlighted). Below: 17px paragraph (max 40ch) + right-aligned Instrument Serif italic 30px "Not an archive." on the same baseline row (`align-items: flex-end`, 40px gap).
- **Right — "Currently" panel**: 1px bordered box on `#E4E2DC`. Header row `CURRENTLY / AUG 2026`. Four rows, each `dot + name` left, mono status right: Wilder `IN BUILD` (green pulsing dot), Juno `PROTOTYPE` (lavender dot), Grand Angle Léré `SHIPPED` (ink dot), Lab `7 EXPERIMENTS` (ink dot). Footer block: `OPEN TO CLIENT WORK / PRODUCT · AI · INTERFACES`.
- **Ticker**: full-width strip with 1px rules top and bottom, mono uppercase, 40px gaps: green dot + `CURRENTLY BUILDING · PRODUCT · AI · INTERFACES · AUTOMATION · CONSUMER · MONTRÉAL / CA`. Content duplicated twice; animate `translateX(0 → -50%)` linear 34s infinite.

Status vocabulary across the site: `SHIPPED`, `IN BUILD`, `PROTOTYPE`, `EXPERIMENT`, `CLIENT WORK`, `ARCHIVED`, `RUNNING`.

### 2. Selected work — index header
48px gutter row: mono `SELECTED WORK` (left, 15px, 0.16em) and `THREE WORLDS / 01 — 03` (right, muted).

### 3. Project world 01 — Wilder (technical / operational)
Full-bleed `#0D0E0F`, 56/48/60px padding. Grid `3fr 9fr`.
- **Left rail**: Archivo condensed `01` at 90px; green pulsing dot + `IN BUILD`; mono block `OWN PRODUCT / AI OPERATIONS / 2026 —`; rule; `STACK` + `Agents · event graph / Retrieval · scheduling`.
- **Right**: "Wilder" 96px; 19px description (52ch).
- **Console panel** (1px `#2A2C2E`, fill `#131517`): tab row `NEXT ACTIONS | SIGNALS | PROGRAMS | THREADS` with `LIVE · 14 SIGNALS` in green at the right. Table columns `52px 1fr 190px 140px 90px` = `# / RECOMMENDED ACTION / TRIGGER / PROGRAM / CONF.`; three rows (copy verbatim in the HTML), row 1 tinted green-6% with confidence `0.94` in green, rows 2–3 muted. Below the table a 210px striped placeholder: **[ DROP: WILDER UI — SIGNAL GRAPH, FULL WIDTH ]**.
- **Actions**: `OPEN CASE →` (1px white outline) and a muted, non-interactive `PRIVATE BETA` chip.

### 4. Project world 02 — Juno (warm / human)
Full-bleed `#F0E3D4`, 84/48/76px. Deliberately different composition: no console, more air, serif display.
- Meta row: Archivo `02` + `OWN PRODUCT · CONSUMER` left; lavender dot + `PROTOTYPE` right.
- Grid `5fr 4fr 3fr`, `align-items: end`: (a) "Juno" in Instrument Serif 118px + serif 34px statement "What comes after work is not a gap in a calendar. It's forty years."; (b) tall 420px portrait placeholder **[ DROP: JUNO — MOBILE PLAN VIEW ]**; (c) 17px description, mono data list (`TESTERS 40`, `COHORT AGE 58 — 74`, `NEXT Closed beta`), `OPEN CASE →` outline button.
- Lower row (`gap 24px`, flex `2 / 1 / 1`): 230px landscape placeholder **[ DROP: PORTRAIT — TESTER AT HOME ]**, serif italic 26px pull-quote, 230px solid lavender placeholder **[ DROP: DETAIL ]**.

### 5. Project world 03 — Grand Angle Léré (photographic / exhibition)
Full-bleed `#14181A`. A 620px **image stage** with overlays, then a 3-up data strip.
- Stage: striped placeholder **[ DROP: FULL-BLEED — GALLERY WALL, VISITOR WITH PHONE ]**. Absolutely positioned: Archivo `03` top-left (40/48px); top-right `CLIENT WORK · COMPUTER VISION` + white dot `SHIPPED`; recognition frame at `left 300 / top 150 / 300×330` — 1px `rgba(239,239,234,0.35)` box with four 22px green corner brackets and a green chip `MATCH 0.97 · CAT. N°142`; a second dashed frame at `left 640 / top 300 / 190×150` labelled `SEARCHING…`; project title bottom-right, right-aligned, 84px, two lines.
- Data strip: three panels separated by 1px `#2A3033` — description + `OPEN CASE →`; mono metrics (`WORKS INDEXED 142`, `RECOGNITION On-device`, `LATENCY 180 ms` in green, `LIVE SINCE 2025`); striped placeholder **[ DROP: RECOGNITION SCREEN ]**.

### 6. Lab
Back on the global ground. Header grid `8fr 4fr`: H2 "The Lab *is open*" (last two words serif italic) + 16px intro.
Index table, columns `70px 1fr 220px 150px 130px` = id / name / one-line description / status / date, 1px rules between rows, heavier rule at the end:
`L—01 Inbox Cartographer · RUNNING (green pulse) · AUG 2026`
`L—02 Meeting Residue · EXPERIMENT · JUL 2026` — **this row is a full-bleed lavender band** (negative 48px margins, re-padded) with ink text
`L—03 Tactile Cursor · PROTOTYPE · JUN 2026`
`L—04 Ambient Standup · RUNNING (green pulse) · MAY 2026`
`L—05 Slow Search · ARCHIVED · MAR 2026`
Footer row: `ALL 7 EXPERIMENTS →` left, `2 UNLISTED` right.
*Intended behavior (not built): rows expand in place to reveal a short note + link, rather than navigating.*

### 7. Studio (inverted)
Full-bleed `#111110`, 84/48px. Mono eyebrow `N°004 —— STUDIO`. Grid `7fr 5fr`: 62px statement with "the interface" in serif italic; right column 17px paragraph + a 2-up bordered panel `WE DO` / `WE DON'T` (1px seams, list per the HTML).

### 8. About (secondary by design)
Light ground, 56/48px, 1px bottom rule. Grid `120px 5fr 4fr`: 150px striped portrait placeholder, `N°005 — FOUNDER` + "Harold Sirven" 30px + 16px bio (52ch), mono data list `BASED / PRACTICE / ELSEWHERE` with LinkedIn · X · GitHub links. Keep this small — it must not read as a personal portfolio.

### 9. Contact
96/48/120px. Mono eyebrow `N°006 —— ● REPLYING THIS WEEK` (green pulse). H2 150px "Tell us what you're **building.**" (lavender band). Grid `6fr 3fr 3fr`, bottom-aligned: `hello@nevris.studio` as Instrument Serif 56px with a 1px underline (mailto), 16px invitation copy, mono availability list (`CLIENT WORK — OPEN`, `PROTOTYPE SPRINTS — OPEN`, `FULL-TIME ROLES — TALKING`).

### 10. Footer + nav capsule
Footer: 1px top rule, 20/48/90px (extra bottom space clears the fixed nav), four mono items justified — `NEVRIS STUDIO`, `MONTRÉAL / CA`, `PRODUCT · AI · INTERFACES`, `© 2026`.
Nav: `position: fixed; bottom: 26px; left 50%` translate, capsule `border-radius: 999px`, 1px ink border on `ground`, shadow above. Contents: green pulsing dot + `NEVRIS`, a 1px divider, links `WORK / LAB / STUDIO`, then a filled ink pill `CONTACT` (mailto). No top navigation bar — this capsule is the only nav.

## Interactions & behavior
Built in the mock:
- `nvPulse` — status dots: 2.4s ease-in-out infinite, `opacity 1 → 0.35`, `scale 1 → 0.82` at 50%.
- `nvTicker` — hero marquee: `translateX(0 → -50%)`, 34s linear infinite, content duplicated. Pause on `prefers-reduced-motion` and on hover.
- Link hover: color → `#6A6963`.

Intended but **not** built — implement in code:
- Section entrances: display lines rise into place behind a mask (~600ms, `cubic-bezier(.16,1,.3,1)`), staggered by line; 1px rules draw left→right; the lavender marker band wipes on once (`background-size: 0% → 100%`). Nothing loops.
- Project world transitions: as each full-bleed world enters, its background is already in place — the world should feel like entering a room, then returning to the grey ground. Avoid parallax.
- Léré recognition frame: bracket corners snap in, then the `MATCH 0.97` chip appears ~200ms later; the dashed `SEARCHING…` frame cycles.
- Lab rows: expand in place on click.
- Hover states to add: project `OPEN CASE →` inverts fill; Lab rows take a lavender ground on hover; nav capsule items get the marker band.
- Respect `prefers-reduced-motion: reduce` — hold end states, disable ticker and pulse.

## State management
Static marketing page. Real data worth wiring: local time in the status bar; project status values (`SHIPPED / IN BUILD / PROTOTYPE / EXPERIMENT / CLIENT WORK`) and Lab entries from content files (MDX/CMS) so the "working surface" stays current; Lab row expanded state.

Suggested content model: `Project { number, name, status, kind, year, summary, world (wilder|juno|lere), metrics[], media[] }` · `Experiment { id, name, note, status, date, unlisted }`.

## Responsive
Not designed. The 1440px composition is the source of truth. Recommendation: hold the layout to ~1280–1600px, scale gutters, and collapse the fractional grids to single column below 1024px with display type stepping down (hero 128 → 64px, contact 150 → 56px) — get the breakpoints designed before shipping rather than improvising them.

## Assets
No real imagery yet. Every image slot is a striped CSS placeholder labelled `[ DROP: … ]` — 7 in total (Wilder signal graph; Juno mobile plan view, tester portrait, detail; Léré gallery wall, recognition screen; About portrait). Replace with real product screenshots and photography; keep the 1px ink border and square corners. Fonts are Google Fonts (no licensing action needed). No logo file exists — the wordmark is typeset (Schibsted Grotesk, mono at small sizes) and always paired with a status dot.
