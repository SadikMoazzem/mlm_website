# Phase 1: Server-Rendered Area Pages

## Goals

Create server-rendered area pages at `/masjids/[city]/[area]` that fetch real masjid data from the API. These pages will be indexable by Google and target "masjids in [area]" searches.

### Tickets

- [x] Create area page route and component (`/masjids/[city]/[area]/page.tsx`)
- [x] Add metadata generation for area pages
- [x] Implement static params generation for all city/area combinations
- [x] Create MasjidListItem component for displaying masjids in list
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: navigate to `/masjids/london/east-london`, check masjid list renders

### Dependencies

```
ticket-1-1 ─┬─► ticket-1-3 (needs route first)
            │
ticket-1-2 ─┘

ticket-1-4 ─► (independent, can run in parallel with 1-1, 1-2)

ticket-1-3 ─► ticket-1-5 ─► ticket-1-6
```

### Notes

- Use ISR with 7-day revalidation (`export const revalidate = 604800`)
- Fetch top 15 masjids using existing `getNearestMasajid` from api-client
- Area coordinates and radius come from `cities.ts`
- Include breadcrumb navigation: Find Masjids > {City} > {Area}
- Link each masjid to its detail page `/masjid/[id]/[name]`
