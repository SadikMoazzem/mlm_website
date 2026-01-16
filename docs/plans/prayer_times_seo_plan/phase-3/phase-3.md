# Phase 3: LocalBusiness Schema for City/Area Pages

## Goals

Add LocalBusiness structured data to city and area pages to improve visibility in Google Maps and local search results for individual masjids.

### Tickets

- [x] Create LocalBusiness schema component for masjid cards
- [x] Add LocalBusiness schema to area pages
- [x] Add ItemList schema with LocalBusiness items to city pages
- [x] Run quality checks (lint, build)
- [x] Verify schema with Google Rich Results Test

### Dependencies

```
ticket-3-1 ─┬─► ticket-3-4 ─► ticket-3-5
ticket-3-2 ─┤
ticket-3-3 ─┘
```

### Notes

**LocalBusiness Schema Structure:**
```json
{
  "@context": "https://schema.org",
  "@type": "Mosque",
  "name": "East London Mosque",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "82-92 Whitechapel Road",
    "addressLocality": "London",
    "postalCode": "E1 1JQ",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5177,
    "longitude": -0.0665
  },
  "url": "https://mylocalmasjid.com/masjid/123/east-london-mosque",
  "telephone": "+44 20 7247 1357",
  "openingHours": "Mo-Su 05:00-23:00"
}
```

**ItemList for City Pages:**
Wraps multiple LocalBusiness items in an ItemList for better organization.

**Validation:**
- Test with: https://search.google.com/test/rich-results
- Check for warnings about missing recommended fields
