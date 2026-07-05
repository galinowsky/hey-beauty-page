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

### 4. Category pages + salon pages (THE SEO PLAY, v2)
**Superseded 2026-04-12 — CEO decision.** The original plan was one page per service × location (60-80+ pages targeting long-tail keywords like "lifting rzęs Śródmieście Kraków"). That's gone. The framework now is: **3 service categories** (`kosmetologia`, `kosmetyka`, `wlosy` — `inne` exists in the schema but has no dedicated page) × **4 location pages**, with pricing filtered by category + location inside `/cennik/` rather than one page per combination.

- `/uslugi/{category}/` — category landing page (services in that category, across all locations)
- `/salony/{location}/` — salon page (services at that location)
- `/cennik/` — the actual service×location price matrix, filtered client-side by category/location

Long-tail service×location keyword targeting is no longer the strategy; category + location breadth is. If long-tail SEO is revisited later, it would need dedicated pages again — this is a deliberate trade of page count for lower maintenance (388 flat Airtable rows drive everything instead of hand-maintained per-combination pages).

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
├── specialists/         # 8 JSON files (placeholder, photos pending)
└── faq/                 # Global + per-category FAQ items (kosmetologia.json, kosmetyka.json, ...)

src/loaders/
└── airtable.ts           # airtableServicesLoader() + airtableServiceLocationsLoader()
                           # replaces the old services/ and service-locations/ JSON dirs entirely
```

Services and service-locations are no longer JSON files in git — they're fetched from Airtable at build time (see `docs/cms-plan.md`).

### Data Model

Three collections joined at **build time** via `getCollection()`. Locations are static JSON; services and service-locations come from the Airtable loaders. No database, no API at runtime (Airtable is only hit during `astro build`/`astro dev`).

```
locations               services (Airtable)     service-locations (Airtable)
─────────               ────────────────────    ─────────────────────────────
slug (PK)               slug (PK)               locationSlug (FK → locations)
name                    name                    serviceSlug  (FK → services)
shortName               category                priceMin          ← nullable
booksyId                description             priceMax?         ← nullable, optional
booksyUrl               duration.min/max        duration          ← minutes
address                 priceRange.min/max      available
coordinates             sortOrder
openingHours
rating
sortOrder
```

`category` is one of `kosmetologia | kosmetyka | wlosy | inne` (CEO-confirmed taxonomy, 2026-04-12). Only the first three have a dedicated category page today — see decision #4 above.

### Pricing Model

Booksy lists many variants per service (by hair length, stylist tier, add-ons). We model **price ranges** — not individual variants:

- `priceMin` — required, lowest Booksy variant
- `priceMax` — optional, highest Booksy variant
- Display rule: `"150 zł"` when min === max, `"150–290 zł"` when different
- Booking CTA always links to the Booksy page where users pick their variant

### Locations × Categories Matrix

Superseded — locations no longer map to individual services in this doc, they map to categories. All 388 service×location combinations (which services exist at which salon, at what price) live in Airtable, not here. `/cennik/` is the live, always-current source; don't hand-maintain a matrix in markdown that Airtable already owns.

### Service Categories

| Category slug | Display name | Has a dedicated `/uslugi/{slug}/` page? |
|---|---|:---:|
| `kosmetologia` | Kosmetologia | ✓ |
| `kosmetyka` | Kosmetyka | ✓ |
| `wlosy` | Włosy | ✓ |
| `inne` | Inne | — (catch-all in Airtable schema, no page yet) |

CEO-confirmed taxonomy, replacing the earlier 5-category split (`wlosy`, `brwi-i-rzesy`, `stylizacja-paznokci`, `zabiegi-twarzy`, `zabiegi-ciala`) shown in older versions of this doc.

## Page Generation

```
Template                                  → Generated Pages
────────────────────────────────────────────────────────────
pages/index.astro                         → /
pages/cennik.astro                        → /cennik/                          (price matrix, filterable by category + location)
pages/o-nas.astro                         → /o-nas/
pages/salony/index.astro                  → /salony/
pages/salony/[location].astro             → /salony/hey-beauty-1-0/, etc.     (4 pages)
pages/uslugi/index.astro                  → /uslugi/
pages/uslugi/{category}.astro             → /uslugi/kosmetologia/, etc.       (3 pages: kosmetologia, kosmetyka, wlosy)
pages/{static}.astro                      → /kontakt/, /faq/, /404, etc.
pages/robots.txt.ts                       → /robots.txt
pages/llms.txt.ts                         → /llms.txt
en/, uk/                                  → partial English + Ukrainian subtrees, same category-page shape
```

**Current total: 41 pre-rendered HTML pages** (down from ~65 — see decision #4 above; the per-service and per-service-location pages were removed in favor of category pages).

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
| 2026-04-12 | Decap CMS scrapped, Airtable-only | See `docs/cms-plan.md`. Page structure still in flux, CMS added complexity without value. Airtable already covers the one thing that changes on its own — pricing. |
| 2026-04-12 | Airtable content loaders shipped | 55 JSON files (`services/`, `service-locations/`) replaced by `src/loaders/airtable.ts`, fetching 388 flat records at build time. |
| 2026-04-12 | Per-service × per-location pages → 3 category pages | CEO decision. Dropped the 60-80 page long-tail SEO play for `kosmetologia`/`kosmetyka`/`wlosy` category pages + a filterable `/cennik/` price matrix. Page count 65 → 41. See decision #4. |

## How to Add a New Page (Recipe)

### New category page (e.g. a future "inne" page)

1. **Content logic** — create/extend `src/components/pages/CategoryContent.astro` with `interface Props { lang: Lang; category: string }`. All text goes through `t()`, all links through `lp()`. Services are pulled from the `services`/`serviceLocations` collections filtered by `category`, not per-page content.

2. **Polish page** — `src/pages/uslugi/{category}.astro`:
   ```astro
   ---
   import CategoryContent from "../../components/pages/CategoryContent.astro";
   ---
   <CategoryContent lang="pl" category="inne" />
   ```

3. **EN page** — `src/pages/en/services/{slug}.astro` (same shape, `lang="en"`).

4. **UK page** — `src/pages/uk/posluhy/{slug}.astro` (same shape, `lang="uk"`). Use the Ukrainian slug if it differs.

5. **Slug map** — add to `src/i18n/routes.ts` if the EN/UK slug differs from Polish.

6. **Translations** — add `t("services.{category}.*")` keys to `src/i18n/ui.ts` for all 3 locales.

7. **FAQ** (optional) — create `src/data/faq/{category}.json`, `{category}-en.json`, `{category}-uk.json` (see `faq/kosmetologia.json` / `faq/kosmetyka.json` for the pattern).

That's it. The language switcher, hreflang tags, and nav active states all work automatically.

### New top-level route (e.g. `/blog/`)

Same as above, but also add `"blog": "blog"` (or translated slug) to `slugMap` in `routes.ts`, and add nav items to `Header.astro` via `t()` + `lp()`.

### Adding/removing a service or changing a price

Nothing in this repo. Edit the record in Airtable (base `appxLApX6BHtnXE4h`, Services table `tblEx5r6lgbKKrdJl`) and rebuild — see `docs/cms-plan.md`.

## Airtable as CMS (shipped 2026-04-12)

Service/price data used to live in JSON files → every price change required a code deploy. Now Airtable is the single editable source of truth; a rebuild picks up whatever's in Airtable.

### Airtable table structure

| Table | ID | Rows | Key fields |
|---|---|---|---|
| Services | `tblEx5r6lgbKKrdJl` | 388 (flat: one row per service×location) | name, slug, category, priceMin, priceMax, duration, booksyDirectUrl |
| Salons | `tblLXo7SbbaSkGzQj` | 4 | name, slug, booksyUrl, address |

`src/loaders/airtable.ts` fetches both at build time and normalizes the flat 388 rows into deduplicated `services` (176 unique) + `serviceLocations` (388) content collections. Auth via `AIRTABLE_API_KEY` (PAT, `data.records:read` scope) in `.env` — see `.env.example`.

**Not yet wired:** an Airtable webhook → Cloudflare Pages deploy hook for auto-rebuild on price edits. Today, a price change in Airtable needs a manual rebuild/redeploy to go live. This is the natural next step once the site is actually deployed (see `TODOS.md`).

## Related Projects

- **hey-beauty/** (sibling directory) — Vue 3 loyalty app (MVP). Separate codebase. Integration via URL linking only (for now).
- **Booksy profiles** — 4 locations: [1.0](https://booksy.com/pl-pl/104242), [2.0](https://booksy.com/pl-pl/111132), [3.0](https://booksy.com/pl-pl/251875), [Zabłocie](https://booksy.com/pl-pl/306187)
- **Instagram** — [@heybeauty_krk](https://instagram.com/heybeauty_krk) (5,600+ followers)
