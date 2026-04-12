# Media Strategy — Hey Beauty

## Current state (2026-04-12)

**Photos in git. Videos in git (temporary).**

R2 integration is planned but not yet needed — waiting on content from the social media manager before setting it up.

---

## Photos — git (permanent)

Photos stay in git because:
- Astro optimizes them at build time (auto WebP/AVIF, responsive srcset)
- 50-70 compressed photos ≈ 30-50MB — well within GitHub limits
- Zero infrastructure required

**Naming convention:** `public/images/{category}/{descriptive-name}.{ext}`

---

## Videos — git (temporary) → R2 (when content arrives)

Videos currently live in `public/videos/` in the repo. This is fine for now while video count is small.

**Trigger to set up R2:** when the social media manager delivers video content. At that point the volume will justify the setup.

### R2 setup (~15 min, when needed)

1. Create R2 bucket in Cloudflare dashboard (`hey-beauty-media`, enable public access)
2. Upload videos: `wrangler r2 object put hey-beauty-media/videos/...`
3. Update video `src` references in code to use R2 URL
4. Remove videos from `public/videos/`, commit

### R2 URL pattern
`https://pub-{hash}.r2.dev/videos/{filename}` (or custom domain `media.hey-beauty.pl` later)

---

## Limits to know

| Limit | Value |
|-------|-------|
| GitHub max file size | 100MB |
| Cloudflare Pages max file | 25MB — videos over this must be on R2 |
| R2 free tier storage | 10GB/month |
| R2 free tier reads | 10M/month |

---

## Decision log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-30 | Photos in git, videos on R2 | Planned split based on size concerns |
| 2026-04-12 | Videos in git for now | No social media content yet; R2 setup deferred until content arrives |
