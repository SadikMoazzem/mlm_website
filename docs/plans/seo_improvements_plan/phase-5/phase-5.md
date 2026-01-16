# Phase 5: Sitemap & Final Integration

## Goals

Update the sitemap to include all new area pages and verify all SEO improvements are working correctly together.

### Tickets

- [x] Update sitemap to include area pages
- [x] Add area pages to robots.txt Allow list (already allowed by `Allow: /`)
- [x] Run quality checks (lint, build)
- [x] Run full build and verify no errors

### Dependencies

```
ticket-5-1 ─┬─► ticket-5-3 ─► ticket-5-4 ─► ticket-5-5
ticket-5-2 ─┘
```

### Notes

- Sitemap should include all city/area combinations from cities.ts
- Area pages should have priority 0.8 (between city pages at 0.85 and individual masjids at 0.8)
- Verify sitemap is valid XML after changes
- Test representative pages with Google's Rich Results Test
