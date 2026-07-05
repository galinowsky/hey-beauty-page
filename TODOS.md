# TODOS

Items deferred from plan reviews. Each item has full context so it can be picked up in 3 months without re-reading the conversation.

---

## P2 — Build Failure Notifications

**What:** Set up Cloudflare Pages build webhook → Slack or email when a production build fails after a content edit.

**Why:** Non-technical editors save via Decap CMS, the CMS shows "saved" (the commit succeeded), but if the JSON is malformed Astro's build fails and the old site stays up. No one knows. The editor thinks their change went live. It didn't.

**Pros:** Editors get immediate feedback. You don't discover the problem days later.

**Cons:** Requires a Slack webhook or email setup. ~20 min with CC.

**Context:** CF Pages supports outgoing webhooks on build events. Configure in CF Pages Dashboard → Settings → Build Webhooks. Or use GitHub Actions on push-to-main to send a notification after build status is known.

**Depends on:** CMS must be shipped first (this branch). Build notifications are only useful once editors are actively committing.

**Effort:** S (CC: ~20 min)

---

## P2 — Specialists Pages

**What:** Build Astro pages at `/specjalisci/[slug]/` that render specialist profile data.

**Why:** The CMS schema for Specialists is pre-defined in `config.yml` (to avoid a migration later), but there's no front-end. Editors can fill in data that never renders.

**Pros:** Enables the salon to showcase individual specialists with photos, bios, services, and Instagram links. Good for SEO (specialist + treatment + location long-tail keywords).

**Cons:** Requires CEO to confirm the feature and provide content (names, bios, photos).

**Context:** `src/data/specialists/*.json` schema: name, slug, photo (git path or URL), bio, location, services (list), instagram. CMS collection "Specialists" is in `public/admin/config.yml`. Page template needs to be designed (see DESIGN.md for aesthetic direction). Onboarding doc must warn editors not to fill Specialists data until this page is built.

**Depends on:** CMS branch merged (provides the data structure). CEO approval of the feature.

**Effort:** M (CC: ~45 min for page + design)

---

## P3 — News / Aktualności Pages

**What:** Build Astro pages at `/nowosci/[slug]/` for salon news, promotions, and seasonal content.

**Why:** The CMS schema for News is pre-defined in `config.yml`. No Astro front-end exists yet.

**Pros:** Gives the content creator a place to publish promotions and updates. Fresh content helps SEO.

**Cons:** Requires CEO to confirm the feature. Rich text (markdown) content is harder to manage than structured JSON fields.

**Context:** `src/data/news/*.json` schema: title, slug, date, excerpt, content (markdown), image, tags. CMS collection "Aktualności" is in `public/admin/config.yml`. Decap supports a `markdown` widget for the `content` field. Onboarding doc must warn editors not to fill News data until this page is built.

**Depends on:** CMS branch merged. CEO approval. Possibly Specialists page first (to establish the content publishing pattern).

**Effort:** M (CC: ~30 min for page + design)

---

## ~~P1 — serviceLocations Schema: price → priceMin + priceMax~~ SUPERSEDED

**Superseded by:** Airtable integration (2026-04-12). The Airtable loader handles `priceMin: number | null` + `priceMax: number | null` natively. JSON files deleted.

---

## P1 — R2 Video Hosting Setup

**What:** Create Cloudflare R2 bucket for video hosting. Upload existing 3 videos, update code references.

**Why:** Videos cause git repo bloat (binary files stored inefficiently, every version kept forever). 30-50 planned short videos = 60-240MB. Photos stay in git (Astro optimizes them at build time).

**Pros:** Repo stays lean. Videos served from Cloudflare CDN. Free tier (10GB storage, 10M reads/month).

**Cons:** Requires Cloudflare dashboard setup + wrangler CLI for uploads. Manual upload process (no drag-and-drop UI for non-devs, but only Jakub uploads during buildout).

**Context:** See `docs/media-strategy.md` for full plan. Setup: create R2 bucket `hey-beauty-media`, enable public access, upload via `wrangler r2 object put`. Migrate 3 existing videos from `public/videos/`. Custom domain (`media.hey-beauty.pl`) deferred to site launch.

**Depends on:** Nothing. Can be done anytime before adding more videos.

**Effort:** S (CC: ~15 min)

---

## P3 — R2 Photo Migration

**What:** Migrate photos from git to Cloudflare R2 when repo images exceed 200MB or CMS is built.

**Why:** Photos in git work well during buildout (Astro optimizes them). But if the repo grows past 200MB of images, or when CMS needs a media upload mechanism, migrate to R2.

**Pros:** Repo stays lean forever. Photos served from CDN.

**Cons:** Lose Astro's built-in `<Image>` optimization (would need Cloudflare Image Transformations or pre-optimization before upload).

**Context:** Trigger: `du -sh public/images/` exceeds 200MB, OR CMS is built. Migration: upload to R2 bucket, find-and-replace paths in code, remove from git.

**Depends on:** R2 bucket already set up (from video hosting). Enough image content to justify.

**Effort:** S (CC: ~30 min)
