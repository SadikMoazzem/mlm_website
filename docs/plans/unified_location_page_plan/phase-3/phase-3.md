# Phase 3: Create the /location/[slug] Route with Pre-rendering

## Goals

Create the main route at `/location/[slug]` that uses the LocationProfile component. Implement static generation for known cities and areas, with dynamic rendering for unknown locations. Include SEO metadata generation.

### Tickets

- [x] Ticket 3-1: Create the /location/[slug] route page
- [x] Ticket 3-2: Create metadata generation for SEO
- [x] Ticket 3-3: Add static params generation and ISR configuration
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: navigate to /location/london, check prayer times and areas render

### Notes

Route behavior by location type:
- **KnownCity** (e.g., `/location/london`): Pre-rendered, shows areas grid
- **KnownArea** (e.g., `/location/east-london`): Pre-rendered, fetches masjids via API
- **DynamicLocation** (e.g., `/location/bristol`): Server-rendered, geocodes + fetches masjids

Data fetching strategy:
- Prayer times: Always calculated server-side using `calculatePrayerTimes`
- Masjids: Fetched via `getNearestMasajid` for areas and dynamic locations
- Location data: Resolved via `resolveLocationBySlug`

ISR Configuration:
- Known cities/areas: Revalidate weekly (604800 seconds)
- Dynamic locations: No caching (server-rendered on demand)

### Dependency Diagram

```
ticket-3-1 (route page)
    ↓
ticket-3-2 (metadata) ←→ ticket-3-3 (static params)
    ↓
quality checks
    ↓
Playwright verification
```

Tickets 3-2 and 3-3 can run in parallel after 3-1.
