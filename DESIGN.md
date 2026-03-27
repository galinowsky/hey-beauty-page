# Design System — Hey Beauty

## Product Context
- **What this is:** SEO-optimized marketing website for Hey Beauty, a beauty salon franchise in Kraków
- **Who it's for:** Women 18-50 seeking premium beauty and aesthetic medicine treatments
- **Space/industry:** Beauty salons / aesthetic medicine, local business in Kraków, Poland
- **Project type:** Marketing site (Astro 5 SSG, Tailwind CSS 4)

## Aesthetic Direction
- **Direction:** Editorial/Magazine — "A fashion lookbook that happens to book beauty appointments"
- **Decoration level:** Minimal — typography and B&W photography carry everything
- **Mood:** Refined authority. Not warm and friendly, not cold and clinical. The quiet confidence of a fashion house that doesn't need to explain itself. The user should feel like they opened a magazine, not a salon booking page.
- **Reference sites:** kwbeauty.pl (bold B&W editorial), lustre.pl (whitespace, premium feel)

## Typography
- **Display/Hero:** Cormorant Garamond (Regular 400, Medium 500) — softer, organic editorial serif. More refined and curved than high-contrast Didone fonts, closer to the salon's physical vibe. Use LARGE (clamp 3rem-8rem), tracked tight (-0.01em). For headings that need more weight, use Medium 500 max.
- **Body:** DM Sans (Regular 400, Medium 500) — clean geometric sans-serif with excellent readability on service descriptions and long-form content. Set at 16-18px, line-height 1.7.
- **UI/Labels:** Space Grotesk (Medium 500, SemiBold 600) — technical edge that echoes the franchise's 1.0/2.0/3.0 naming convention. Use for navigation, buttons, labels, metadata. Always uppercase with letter-spacing 2-4px for buttons.
- **Data/Tables:** Space Grotesk (tabular-nums supported) — for prices, durations, ratings
- **Code/Version numbers:** JetBrains Mono (Regular 400, Medium 500) — ONLY for version identifiers ("Hey Beauty 2.0"). This is a brand signature, not a utility choice. No other salon uses monospace. Use sparingly.
- **Loading:** Google Fonts CDN
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
- **Scale:**
  ```
  Hero:      clamp(3rem, 8vw, 6rem) / Cormorant Garamond 400
  H1:        clamp(2.5rem, 6vw, 4rem) / Cormorant Garamond 400
  H2:        clamp(2rem, 4vw, 3rem) / Cormorant Garamond 400
  H3:        1.5rem / Cormorant Garamond 500
  H4:        1.25rem / DM Sans 600
  Body:      1rem (16px) / DM Sans 400 / line-height: 1.7
  Body-lg:   1.125rem (18px) / DM Sans 400 / line-height: 1.7
  Small:     0.875rem / DM Sans 400
  Caption:   0.75rem / Space Grotesk 500 / uppercase / letter-spacing: 2px
  Button:    0.75rem / Space Grotesk 600 / uppercase / letter-spacing: 3px
  Nav:       0.8125rem / Space Grotesk 500 / uppercase / letter-spacing: 2px
  Mono:      0.875rem / JetBrains Mono 400
  ```

## Color
- **Approach:** Restrained monochromatic — B&W core with one accent color
- **Background:** `#FFFFFF` — pure white, the canvas
- **Surface:** `#F6F5F3` — stone cream for alternating sections, card backgrounds. Bridge to loyalty app's existing palette.
- **Primary text:** `#0A0A0A` — near-black, slightly warm. Never pure #000.
- **Muted text:** `#71717A` — for captions, metadata, secondary information
- **Border:** `#E4E4E7` — subtle dividers, card edges
- **Accent (Oxblood):** `#6B1D2A` — the single point of heat on the monochrome canvas. Use ONLY for primary CTAs (booking buttons), active states, and editorial punctuation. Like a lipstick mark on a white page.
- **Accent hover:** `#4A1019` — darkened accent for hover/press states
- **Semantic:**
  - Success: `#4A6B5A` (Sage) — booking confirmed, availability
  - Warning: `#C4783A` (Burnt Amber) — limited slots, seasonal notices
  - Error: `#9B3B4D` (Dried Rose) — form errors, intentionally close to accent to stay in palette
  - Info: `#3B5998` — informational banners
- **Dark mode strategy:** Invert surfaces (bg: `#0A0A0A`, surface: `#171717`, text: `#FAFAFA`, muted: `#A1A1AA`, border: `#27272A`). Accent shifts to lighter rose `#D4546A`. Reduce image opacity to 90% to prevent eye strain against dark backgrounds.

## Spacing
- **Base unit:** 8px
- **Density:** Spacious — this is a luxury marketing site, every element must breathe
- **Scale:**
  ```
  2xs:  2px    (borders, hairlines)
  xs:   4px    (tight gaps)
  sm:   8px    (inline elements, icon gaps)
  md:   16px   (default component padding)
  lg:   24px   (card padding, section gaps)
  xl:   32px   (between components)
  2xl:  48px   (section padding on mobile)
  3xl:  64px   (between sections)
  4xl:  80px   (section padding on desktop)
  5xl:  120px  (hero padding, major section breaks)
  ```
- **Rule:** When in doubt, go bigger. `p-4` → `p-6`, `gap-4` → `gap-8`. Luxury = breathing room.

## Layout
- **Approach:** Creative-editorial — asymmetric grids for marketing sections, magazine-style full-bleed imagery, strict grid for service/location data pages
- **Grid:** 12-column grid. Marketing pages can break the grid. Data pages (services, locations) stay on grid.
- **Max content width:** 1200px (max-w-7xl equivalent)
- **Breakpoints:** Mobile-first. sm:640px, md:768px, lg:1024px, xl:1280px
- **Border radius:**
  ```
  none: 0px     (editorial images, hero sections — sharp edges = fashion)
  sm:   2px     (small UI elements)
  md:   4px     (buttons, inputs)
  lg:   8px     (cards)
  full: 9999px  (avatars, pills, badges)
  ```
- **Border radius philosophy:** Lean sharp. Rounded corners feel friendly/approachable. Sharp corners feel editorial/fashion. Default to `rounded-none` or `rounded-sm` for cards and images. Reserve `rounded-lg` for special elements.

## Motion
- **Approach:** Intentional — subtle entrance animations and scroll-driven reveals. No bounce, no wiggle, no playful animations.
- **Easing:**
  - Enter: `cubic-bezier(0.16, 1, 0.3, 1)` — fast deceleration, snappy
  - Exit: `ease-in`
  - Move: `ease-in-out`
- **Duration:**
  - Micro: 100ms (hover states, button press)
  - Short: 200ms (fade in/out, color transitions)
  - Medium: 400ms (reveal-on-scroll, parallax)
  - Long: 600ms (page transitions, hero entrance)
- **Patterns:**
  - Fade-up on scroll (opacity 0 → 1, translateY 20px → 0) — for service cards, section content
  - Parallax on hero section — subtle (0.3x speed)
  - No animation on critical CTAs — booking buttons appear instantly
  - Hover: opacity shift (90%) on images, color transition on buttons

## Photography
- **Treatment:** Grayscale (filter: grayscale(100%)) for all imagery. B&W is the brand voice.
- **Cropping:** Editorial. Off-center, unexpected crops. Not centered portraits. Fashion photography principles.
- **Aspect ratios:** 3:4 (portrait, service cards), 16:9 (hero, full-bleed), 1:1 (location thumbnails)
- **Placeholder strategy (V1):** Pull photos from Booksy profiles. Apply grayscale filter via CSS.

## Brand Signatures (what makes Hey Beauty different from every other salon)
1. **Typography-first hero.** No stock photo above the fold. "Hey Beauty" set massive in Playfair Display. Photography enters on scroll.
2. **Version numbers in JetBrains Mono.** 1.0, 2.0, 3.0 as visible navigation tabs. Franchise structure as brand theater.
3. **Oxblood as the only color.** Everything else is black, white, gray, cream. The accent is rare and meaningful.
4. **Sharp corners.** Not the rounded-everything trend. Fashion editorial = sharp edges.
5. **Monogram emblem.** The "HB" oval from the logo should appear in the footer and as a favicon.

## Configurability
All visual decisions are implemented through CSS custom properties and Tailwind config. Swapping any of these is a one-line change:
- **Fonts:** `--font-display`, `--font-body`, `--font-ui`, `--font-mono` in CSS + Tailwind `fontFamily` config
- **Colors:** All colors as CSS custom properties (`--bg`, `--text`, `--accent`, etc.) + Tailwind `colors` config
- **Border radius:** Tailwind `borderRadius` config
- **Spacing scale:** Tailwind `spacing` config

After visiting the actual salons, the design may shift softer/more curved. The system is built to accommodate this without refactoring.

## Anti-Patterns (never do this)
- No purple/violet gradients
- No 3-column icon grids with colored circles
- No centered-everything layouts with uniform spacing
- No rounded-everything (bubbly UI)
- No gradient CTAs
- No stock-photo hero sections
- No decorative blobs, circles, or abstract shapes
- No bounce/wiggle/playful animations
- No pastel colors (pink, lavender, mint — this is not a "soft" salon)
- No Montserrat, Poppins, Open Sans, Lato (too generic)
- No native alert()/confirm() — use styled components

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Initial design system created | Created by /design-consultation based on office-hours design doc, competitive research, brand logo analysis |
| 2026-03-27 | Cormorant Garamond chosen over Playfair Display | Cormorant's softer, more organic feel matches the salon's physical vibe. Playfair was too sharp/aggressive. Font is a single CSS variable — easy to swap later. |
| 2026-03-27 | Oxblood (#6B1D2A) accent chosen | Single point of heat on monochrome canvas. Subagent described it as "the lipstick stain on the page." |
| 2026-03-27 | Typography-only hero (Risk #2) accepted | No salon in Kraków does this. Fashion-house level brand confidence. |
| 2026-03-27 | JetBrains Mono for version numbers (Risk #3) accepted | Turns franchise naming into distinctive brand element. |
| 2026-03-27 | Sharp corners over rounded | Editorial/fashion aesthetic demands sharp edges. Rounded = approachable, sharp = authoritative. |
