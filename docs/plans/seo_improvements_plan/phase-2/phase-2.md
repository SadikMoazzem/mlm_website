# Phase 2: Enhanced City Pages & Metadata

## Goals

Improve existing city pages (`/masjids/[city]`) with better metadata, internal linking to area pages, and enhanced content structure.

### Tickets

- [x] Update city page to link to new area pages
- [x] Enhance city page metadata with more keywords
- [x] Add masjid count statistics to city page
- [x] Run quality checks (lint, build)

### Dependencies

```
ticket-2-1 ─┬─► ticket-2-3 (can run in parallel)
            │
ticket-2-2 ─┘

ticket-2-3 ─► ticket-2-4
```

### Notes

- City pages should now link to `/masjids/{city}/{area}` instead of `/masjids/near/...`
- Add total masjid count per city (sum of area counts from cities.ts)
- Keywords should include all area names within the city
- Keep existing breadcrumb structure
