# Architecture — Hey Beauty Website

## What This Is

SEO-optimized marketing website for Hey Beauty, a beauty salon franchise with 4 locations in Kraków. Built to dominate local Google search and AI crawlers (ChatGPT, Perplexity).

## Tech Stack

| Component | Choice | Why |
|-----------|--------|-----|
| Framework | Astro 5 (SSG) | Zero JS by default = best Lighthouse scores. Content-first site doesn't need React/Vue hydration. |
| Styling | Tailwind CSS 4 | CSS custom properties for all design tokens. One variable change = entire site update. |
| Hosting | Cloudflare Pages | Free tier, edge CDN, automatic HTTPS, static hosting. No adapter needed for pure SSG. |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans, Space Grotesk, JetBrains Mono) | See DESIGN.md for rationale. |
| Data | JSON content collections (committed to git) | Site builds without network access. Changes visible in diffs. No CMS dependency. |
| Booking | Booksy (external) | All CTAs link to Booksy with UTM tracking. No booking system to build. |
| Languages | Polish (default, no prefix), English (/en/), Ukrainian (/uk/) | V1 is Polish only. Architecture supports all 3. |

## Key Decisions

### 1. SSG over SSR
All pages pre-rendered at build time. No Cloudflare adapter needed. A beauty salon site has no user-specific content. SSR would add complexity for zero benefit. If search is needed later, SSR can be added per-route.

### 2. JSON content collections (not Markdown)
This is structured data (prices, coordinates, opening hours), not prose. JSON + Zod schemas give type safety. Markdown would force us to parse frontmatter for every field.

### 3. File-based i18n routing with translated URL slugs
Astro's built-in i18n can prefix paths (`/pl/`, `/en/`) but can't translate URL segments. We use file-based routing so each locale has its own page file at the correct translated path:

```
pages/uslugi/wlosy.astro          → /uslugi/wlosy/          (PL canonical)
pages/en/services/hair.astro      → /en/services/hair/       (EN)
pages/uk/posluhy/volossia.astro   → /uk/posluhy/volossia/    (UK)
```

Every locale page is a 3-line wrapper: `<HairContent lang="uk" />`. All logic lives in `src/components/pages/`. Adding a language means creating N × 3-line wrapper files.

**Slug translation map** lives in `src/i18n/routes.ts`. It's the single source of truth for all URL segment translations. `localizePath(plPath, lang)` and `hreflangUrls(plPath, site)` both read from it — you never manually construct translated URLs anywhere else.

**Language switcher** works by calling `toCanonicalPlPath(currentUrl, currentLang)` to reverse-translate the current URL back to Polish, then `localizePath(plPath, targetLang)` for each target language. This means the switcher stays correct as new pages are added, as long as slugs are in `routes.ts`.

### 4. Service-location cross-pages (THE SEO PLAY)
Every service × location combination gets its own page. "Lifting rzęs" at "Hey Beauty 2.0" = `/salony/hey-beauty-2-0/lifting-rzes/`. Each targets a long-tail keyword like "lifting rzęs Śródmieście Kraków". Most salons have 5 pages. We have 60-80+. This is the whole SEO strategy.

### 5. Booksy data committed to git (not fetched at build)
A scraper populates `src/data/` JSON files. These are committed. The site builds without Booksy API access. Changes are visible in git diffs. Data can be manually corrected after scraping.

### 6. Pure B&W color palette
No accent color. All buttons and CTAs are black on white. The salon's brand is monochromatic (black, white, cream). Color comes from photography only. This was an explicit design review decision (the initial oxblood accent didn't match the brand's social media presence).

### 7. Hybrid image strategy
Hero/service photos are self-hosted (downloaded from Booksy, optimized by Astro). Social proof sections may embed live Instagram feeds for freshness. Self-hosting prevents CDN dependency for core visual content.

### 8. CSS-only interactions
FAQ accordion uses `<details>` (zero JS). Scroll-reveal animations use CSS `animation-timeline: view()`. Mobile menu is the only JavaScript on the site. This keeps Lighthouse performance at 95+.

## Content Architecture

```
src/data/
├── locations/           # 4 JSON files (one per salon)
├── services/            # 23 JSON files (one per treatment type)
├── service-locations/   # 33 JSON files: {locationSlug}--{serviceSlug}.json
├── specialists/         # 8 JSON files (placeholder, photos pending)
└── faq/                 # Global + per-service FAQ items
```

### Data Model

Three tables joined at **build time** via `getCollection()`. No database, no API at runtime.

```
locations               services                service-locations
─────────               ────────                ─────────────────
slug (PK)               slug (PK)               locationSlug (FK → locations)
name                    name                    serviceSlug  (FK → services)
shortName               category                priceMin          ← always required
booksyId                description             priceMax?         ← set when Booksy shows a range
booksyUrl               duration.min            priceNote?        ← e.g. "cena zależy od długości"
address                 duration.max            duration          ← minutes (single value, typical)
coordinates             priceRange.min          available
openingHours            priceRange.max          booksyDirectUrl?
rating                  booksySlug
sortOrder               sortOrder
```

### Pricing Model

Booksy lists many variants per service (by hair length, stylist tier, add-ons). We model **price ranges** — not individual variants:

- `priceMin` — required, lowest Booksy variant
- `priceMax` — optional, highest Booksy variant
- Display rule: `"150 zł"` when min === max, `"150–290 zł"` when different
- Booking CTA always links to the Booksy page where users pick their variant

### Locations × Services Matrix

| | HB 1.0 | HB 2.0 | HB 3.0 | Zabłocie |
|---|:---:|:---:|:---:|:---:|
| Manicure hybrydowy | ✓ | — | ✓ | ✓ |
| Uzupełnienie żelowe | — | — | — | ✓ |
| Komplet hybrydowy | — | — | — | ✓ |
| Pedicure frezarkowy | ✓ | ✓ | ✓ | ✓ |
| Lifting rzęs | — | ✓ | — | ✓ |
| Henna pudrowa | — | ✓ | — | ✓ |
| Regulacja brwi | — | ✓ | — | ✓ |
| Koloryzacja rzęs | — | ✓ | — | — |
| Farba brwi | — | ✓ | — | ✓ |
| Włosy — Keratyna | — | — | — | ✓ |
| Diamentowa Keratyna | — | — | — | ✓ |
| Autorski Zabieg HB | — | — | — | ✓ |
| Botox Premium (włosy) | — | — | — | ✓ |
| Rekonstrukcja włosów | — | — | — | ✓ |
| Pakiet Rekonstrukcji | — | — | — | ✓ |
| Odbudowa Molekularna | — | — | — | ✓ |
| Dermapen 4.0 | — | ✓ | — | — |
| RF Radiofrekwencja mikroigłowa | — | ✓ | — | — |
| Masaż Kobido | — | ✓ | — | — |
| Konsultacja kosmetologiczna | — | ✓ | — | — |
| Oczyszczanie skóry | — | ✓ | — | — |
| Ergolift | — | ✓ | — | — |
| Fala uderzeniowa STORZ | — | ✓ | — | — |

> Data source: Booksy screenshots (manual). To be replaced by Airtable export — see below.

### Service Categories

| Category slug | Display name | Salon(s) |
|---|---|---|
| `wlosy` | Włosy | Zabłocie |
| `brwi-i-rzesy` | Brwi i rzęsy | HB 2.0, Zabłocie |
| `stylizacja-paznokci` | Paznokcie | HB 1.0, 2.0, 3.0, Zabłocie |
| `zabiegi-twarzy` | Zabiegi twarzy | HB 2.0 |
| `zabiegi-ciala` | Zabiegi ciała | HB 2.0 |

## Page Generation

```
Template                                  → Generated Pages
────────────────────────────────────────────────────────────
pages/index.astro                         → /
pages/cennik.astro                        → /cennik/
pages/o-nas.astro                         → /o-nas/
pages/salony/index.astro                  → /salony/
pages/salony/[location].astro             → /salony/hey-beauty-1-0/, etc. (4 pages)
pages/uslugi/index.astro                  → /uslugi/
pages/uslugi/[service].astro              → /uslugi/lifting-rzes/, etc. (23 pages)
pages/salony/[location]/[service].astro   → /salony/hey-beauty-2-0/lifting-rzes/ (33 pages)
pages/{static}.astro                      → /kontakt/, /faq/, /404, etc.
pages/robots.txt.ts                       → /robots.txt
pages/llms.txt.ts                         → /llms.txt
en/, uk/                                  → partial English + Ukrainian subtrees
```

**Current total: ~65 pre-rendered HTML pages.**

## Design System

See DESIGN.md. Key principle: everything is a CSS custom property. Swapping fonts, colors, spacing, or border radius is a one-line change in `src/styles/global.css`.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Astro 5 over Next.js/Nuxt | Content-first site, zero JS by default, best SEO performance |
| 2026-03-27 | Cloudflare Pages over Vercel | Free tier, no adapter needed for SSG, edge CDN |
| 2026-03-27 | Cormorant Garamond for display | Softer serif matching salon's physical vibe. Playfair was too sharp. |
| 2026-03-27 | Killed oxblood accent (#6B1D2A) | Didn't match brand's social media presence. Went pure B&W. |
| 2026-03-27 | CSS scroll-reveal animations | Adds "soft industrial luxury" feel without JavaScript. Uses animation-timeline: view(). |
| 2026-03-27 | Grain texture on surface sections | Subtle film grain overlay for "industrial" texture. Pure CSS via SVG filter. |
| 2026-03-27 | Self-hosted salon photos | Prevents Booksy CDN dependency. Grayscale by default, color on hover. |
| 2026-03-27 | Polish-only for V1 | 60-80 pages × 3 languages = 180-240 variants. Ship PL first, add EN/UK later. |
| 2026-03-28 | Zero-duplication i18n | Page logic in `src/components/pages/` components with `lang` prop. Locale page files are 3-line wrappers. New language = add translations to `ui.ts` + create wrapper files. |
| 2026-03-28 | Translated URL slugs | `/en/services/hair/` not `/en/uslugi/wlosy/`. Slug map in `src/i18n/routes.ts`. `localizePath()` and `hreflangUrls()` read from it automatically. Language switcher uses `toCanonicalPlPath()` to reverse-translate before re-localizing. |
| 2026-03-28 | FAQ translations via separate JSON files | `global-en.json` / `global-uk.json` with `scopeSlug: "en"/"uk"`. Components look up by `scope === "global" && scopeSlug === lang`. Polish FAQ has no scopeSlug (undefined). |
| 2026-03-28 | `price: number` → `priceMin + priceMax` | Booksy shows price ranges (per hair length, stylist tier). Single price was wrong. priceMax is optional so fixed-price services aren't affected. |
| 2026-03-28 | Service-location as a separate cross-ref table | Prices live in service-locations, not embedded in services. This allows the same service to have different prices at different locations — and makes the Airtable migration straightforward. |
| 2026-03-28 | Vanilla JS for cennik filters | Progressive enhancement: prices pre-rendered in HTML, JS updates display via data-* attributes. Page works without JS — prices just don't filter. No framework needed for what is essentially a CSS show/hide. |
| 2026-03-28 | Airtable as future CMS | Staff can update prices without a code deploy. Booksy export → Airtable → Astro API fetch at build time. Still generates static HTML. |

## How to Add a New Page (Recipe)

### New service page (e.g. "manicure")

1. **Content logic** — create `src/components/pages/ManicureContent.astro` with `interface Props { lang: Lang }`. All text goes through `t()`, all links through `lp()`.

2. **Polish page** — `src/pages/uslugi/manicure.astro`:
   ```astro
   ---
   import ManicureContent from "../../components/pages/ManicureContent.astro";
   ---
   <ManicureContent lang="pl" />
   ```

3. **EN page** — `src/pages/en/services/manicure.astro` (same 3 lines, `lang="en"`).

4. **UK page** — `src/pages/uk/posluhy/manicure.astro` (same 3 lines, `lang="uk"`). If the Ukrainian slug differs: `src/pages/uk/posluhy/manikiur.astro`.

5. **Slug map** — add to `src/i18n/routes.ts` if the EN/UK slug differs from Polish:
   ```ts
   en: { ..., "manicure": "manicure" },   // same — can be omitted
   uk: { ..., "manicure": "manikiur" },   // different — must add
   ```

6. **Translations** — add all `t("manicure.*")` keys to `src/i18n/ui.ts` for all 3 locales.

7. **FAQ** (optional) — create `src/data/faq/manicure.json`, `manicure-en.json`, `manicure-uk.json`.

That's it. The language switcher, hreflang tags, and nav active states all work automatically.

### New top-level route (e.g. `/blog/`)

Same as above, but also add `"blog": "blog"` (or translated slug) to `slugMap` in `routes.ts`, and add nav items to `Header.astro` via `t()` + `lp()`.

## Planned: Airtable as CMS

**Problem:** Service/price data lives in JSON files → every price change requires a code deploy.

**Plan:** Airtable as the single editable source of truth. Staff updates prices in Airtable → site rebuilds automatically.

### Airtable table structure (mirrors the JSON model)

| Table | Rows | Key fields |
|---|---|---|
| Locations | 4 | name, slug, booksyUrl, address |
| Services | 23+ | name, slug, category, description, duration |
| ServiceLocations | 33+ | Location (linked), Service (linked), priceMin, priceMax, duration, booksyDirectUrl |

### Migration steps

1. Export all 4 salons from Booksy business dashboard (CSV/Excel)
2. Import into Airtable — three tables above
3. In `astro.config.ts` or a prebuild script, `fetch()` from Airtable REST API at build time
4. Write fetched data to temp JSON files (or pass directly to content collections)
5. Connect Airtable webhook → Cloudflare Pages deploy hook → auto-rebuild on price changes (~30s)

Result: still 100% static HTML — zero runtime dependency on Airtable.

### What's missing before Airtable migration

- HB 1.0 and HB 3.0 full service lists (currently only manicure + pedicure)
- Laminacja brwi — price not visible in screenshots
- Any HB 2.0 services not yet screenshotted (Booksy shows 10+ more under kosmetologia)

## Related Projects

- **hey-beauty/** (sibling directory) — Vue 3 loyalty app (MVP). Separate codebase. Integration via URL linking only (for now).
- **Booksy profiles** — 4 locations: [1.0](https://booksy.com/pl-pl/104242), [2.0](https://booksy.com/pl-pl/111132), [3.0](https://booksy.com/pl-pl/251875), [Zabłocie](https://booksy.com/pl-pl/306187)
- **Instagram** — [@heybeauty_krk](https://instagram.com/heybeauty_krk) (5,600+ followers)
