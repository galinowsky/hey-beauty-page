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

### 3. File-based i18n routing (not Astro's built-in)
Astro's built-in i18n can prefix paths (/pl/, /en/) but can't translate URL segments (uslugi vs services). We need `/uslugi/lifting-rzes` in Polish and `/en/services/lash-lifting` in English. File-based routing (pages/ for PL, pages/en/ for EN) handles this.

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
├── services/            # ~15 JSON files (one per treatment)
├── service-locations/   # Cross-references: {location}--{service}.json
└── faq/                 # Global + per-service FAQ items
```

## Page Generation

```
Template                              → Generated Pages
─────────────────────────────────────────────────────
pages/index.astro                     → /
pages/salony/index.astro              → /salony/
pages/salony/[location].astro         → /salony/hey-beauty-1-0/, etc. (4 pages)
pages/uslugi/index.astro              → /uslugi/
pages/uslugi/[service].astro          → /uslugi/lifting-rzes/, etc. (~15 pages)
pages/salony/[location]/[service].astro → /salony/hey-beauty-2-0/lifting-rzes/ (40-60 pages)
pages/{static}.astro                  → /o-nas/, /kontakt/, /faq/, /404, etc.
pages/robots.txt.ts                   → /robots.txt
pages/llms.txt.ts                     → /llms.txt
```

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

## Related Projects

- **hey-beauty/** (sibling directory) — Vue 3 loyalty app (MVP). Separate codebase. Integration via URL linking only (for now).
- **Booksy profiles** — 4 locations: [1.0](https://booksy.com/pl-pl/104242), [2.0](https://booksy.com/pl-pl/111132), [3.0](https://booksy.com/pl-pl/251875), [Zabłocie](https://booksy.com/pl-pl/306187)
- **Instagram** — [@heybeauty_krk](https://instagram.com/heybeauty_krk) (5,600+ followers)
