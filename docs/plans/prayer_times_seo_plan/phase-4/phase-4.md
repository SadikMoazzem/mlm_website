# Phase 4: SearchAction Schema & Area Page H1 Enhancement

## Goals

Add SearchAction schema to enable Google Sitelinks Search Box and enhance area page H1 tags to include "Prayer Times" keyword for better ranking on prayer-related searches.

### Tickets

- [ ] Add SearchAction schema to homepage
- [ ] Handle `?search=` query param on /masjids page for SearchAction
- [ ] Update area page H1 tags to include "Prayer Times"
- [ ] Update sitemap to include city prayer times pages
- [ ] Run quality checks (lint, build)
- [ ] Verify UI with Playwright: final checks on prayer times and area pages

### Dependencies

```
ticket-4-1 ─► ticket-4-2 ─┬─► ticket-4-5 ─► ticket-4-6
             ticket-4-3 ─┤
             ticket-4-4 ─┘
```

### Notes

**SearchAction Schema:**
Enables Google to show a search box directly in search results for your site.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://mylocalmasjid.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://mylocalmasjid.com/masjids?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Area Page H1 Enhancement:**
Current: "Masjids in East London"
New: "Masjids & Prayer Times in East London"

This helps rank for both "masjids in east london" and "prayer times east london" searches.
