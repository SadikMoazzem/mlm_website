# Phase 3: New /for-masjids B2B Landing Page

## Goals

Create a dedicated B2B landing page at `/for-masjids` that consolidates content from the current homepage solutions section, `/solutions/*` pages, and `/how-we-integrate` page into a single comprehensive page for masjid administrators.

### Tickets

- [x] Create ForMasjidsHero component
- [x] Create ProductsShowcase component (Admin, Website, Screen)
- [x] Create HowItWorks component (3 steps)
- [x] Create IntegrationOptions component (from how-we-integrate)
- [x] Create MasjidCTA component (final call-to-action)
- [x] Create /for-masjids page assembling all components
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: navigate to /for-masjids, check all sections

### Dependencies

```
ticket-3-1 ─┬─► ticket-3-6 ─► ticket-3-7 ─► ticket-3-8
ticket-3-2 ─┤
ticket-3-3 ─┤
ticket-3-4 ─┤
ticket-3-5 ─┘
```

### Notes

- Consolidate content from:
  - Current homepage ComprehensiveSolutionSection
  - /solutions/admin features
  - /solutions/website features
  - /how-we-integrate embed selector and content
- Hero: "The Complete Digital Solution for Your Masjid"
- Emphasize: Free forever, no technical skills needed, setup in minutes
- Products: Admin Portal, Masjid Website, Digital Screen (coming soon)
- Include demo links where available
