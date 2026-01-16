# Phase 6: Redirects, Cleanup & Final Polish

## Goals

Set up redirects for old URLs, clean up unused components, update sitemap, and do final polish on all pages.

### Tickets

- [x] Add redirects for old URLs (/how-we-integrate, etc.)
- [x] Update sitemap with new pages
- [x] Clean up unused components and old hero sections
- [x] Update all pages for dark mode consistency
- [x] Run quality checks (lint, build)
- [x] Final Playwright verification of entire site

### Dependencies

```
ticket-6-1 ─┬─► ticket-6-4 ─► ticket-6-5 ─► ticket-6-6
ticket-6-2 ─┤
ticket-6-3 ─┘
```

### Notes

- /how-we-integrate → /for-masjids (301 redirect)
- /solutions/* pages remain as detailed pages (linked from /for-masjids)
- Remove old HeroSection and ComprehensiveSolutionSection if no longer used
- Ensure all pages support dark mode
- Update sitemap to include new pages
