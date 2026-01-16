# Phase 2: Build the Unified LocationProfile Component

## Goals

Create the main `LocationProfile` component that renders the unified location page. This component handles three scenarios: known cities (with area breakdown), known areas (with masjid list), and dynamic locations (geocoded with masjid search).

### Tickets

- [x] Ticket 2-1: Create LocationProfile main component structure
- [x] Ticket 2-2: Create LocationHeader sub-component
- [x] Ticket 2-3: Create AreasGrid sub-component for cities
- [x] Ticket 2-4: Create MasjidsList sub-component
- [x] Ticket 2-5: Create LocationComingSoon sub-component for empty areas
- [x] Run quality checks (lint, build)

### Notes

Component hierarchy:
```
LocationProfile
├── LocationHeader (name, country, date, stats)
├── TodayPrayerTimesGrid (reuse existing)
├── WeeklyPrayerTimesTable (reuse existing)
├── AreasGrid (if city with areas)
│   └── AreaCard (for each area)
├── MasjidsList (if area or dynamic location)
│   └── MasjidCard (for each masjid)
├── LocationComingSoon (if no masjids found)
├── DownloadAppCTA (reuse/adapt existing)
└── MethodDisclaimer (reuse existing)
```

Props interface:
```typescript
interface LocationProfileProps {
  location: ResolvedLocation
  prayerTimes: CalculatedPrayerTimes
  weeklyPrayerTimes: CalculatedPrayerTimes[]
  masjids?: MasjidData[]  // For areas and dynamic locations
}
```

### Dependency Diagram

```
ticket-2-1 (main structure)
    ↓
ticket-2-2, ticket-2-3, ticket-2-4, ticket-2-5 (can run in parallel)
    ↓
quality checks
```
