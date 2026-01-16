# Phase 4: Configure Redirects and Cleanup Legacy Routes

## Goals

Set up 301 redirects from legacy routes to the new unified `/location/[slug]` route. This preserves SEO value from existing indexed pages while consolidating all location traffic to the new unified experience.

### Tickets

- [x] Ticket 4-1: Add redirects in next.config.ts
- [x] Ticket 4-2: Update internal links across the codebase
- [x] Ticket 4-3: Update sitemap.ts for new routes
- [x] Ticket 4-4: Add deprecation comments to legacy route files
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: test redirects work correctly

### Notes

**Redirect mappings:**
```
/prayer-times/:city      →  /location/:city
/masjids/:city           →  /location/:city
/masjids/:city/:area     →  /location/:area
```

**Important considerations:**
- Use 301 (permanent) redirects to transfer SEO value
- Keep legacy route files temporarily with deprecation notices
- Update all internal links to use `/location/` directly
- Update sitemap to generate `/location/` URLs instead of legacy URLs

**Files with internal links to update:**
- Homepage hero/city links
- Prayer times page city links
- Masjids finder page
- Area cards in various components
- Navigation components

### Dependency Diagram

```
ticket-4-1 (redirects config)
    ↓
ticket-4-2 (internal links) ←→ ticket-4-3 (sitemap)
    ↓
ticket-4-4 (deprecation comments)
    ↓
quality checks
    ↓
Playwright verification
```
