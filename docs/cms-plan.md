# CMS Plan — Hey Beauty

## Decision

**No CMS for now.** Airtable is the only external data source, used exclusively for service/pricing data.

Decided: 2026-04-12. Previous plan (Decap CMS) was scrapped — overkill for current needs. Airtable provides sufficient structure for the one thing that changes: prices.

---

## Current data flow

```
Booksy export → Airtable (source of truth for services/prices)
                    │
                    ▼ API fetch at build time
              Astro SSG build
                    │
                    ▼
            Static site deployed
```

All other content (specialist bios, location details, FAQ, page copy) is managed directly in the codebase by the developer.

---

## What Airtable handles

- Service names and slugs
- Prices (min/max range)
- Duration
- Per-location availability and Booksy direct URLs

## What stays in code

- Everything else: page content, specialist profiles, location details, navigation, i18n translations, design

---

## CMS revisit trigger

Only revisit CMS tooling if:
- The client needs to edit page copy without developer involvement
- Content volume grows significantly (e.g. blog, news section)

Until then, Airtable + developer edits is sufficient.

---

## Decision log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-29 | Decap CMS planned | Seemed needed for non-dev content editing |
| 2026-04-12 | Decap CMS scrapped, Airtable-only | Page structure still in flux; CMS adds complexity without current value. Airtable covers the only real dynamic data (pricing). |
