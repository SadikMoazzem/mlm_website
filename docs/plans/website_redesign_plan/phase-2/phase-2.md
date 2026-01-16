# Phase 2: New Homepage (Consumer-First)

## Goals

Create a new consumer-first homepage focused on app downloads, prayer time access, and masjid discovery. Replace the current B2B-focused hero with a user-centric design that prioritizes finding prayer times and downloading the app.

### Tickets

- [x] Create new ConsumerHero component
- [x] Create QuickCityAccess component for city shortcuts
- [x] Create FeatureHighlights component (3 key benefits)
- [x] Create AppShowcase component with screenshots
- [x] Create ForMasjidsTeaser component (compact B2B section)
- [x] Update homepage to use new components
- [x] Run quality checks (lint, build)
- [x] Verify UI with Playwright: navigate to homepage, check new sections render

### Dependencies

```
ticket-2-1 ─┬─► ticket-2-6 ─► ticket-2-7 ─► ticket-2-8
ticket-2-2 ─┤
ticket-2-3 ─┤
ticket-2-4 ─┤
ticket-2-5 ─┘
```

### Notes

- Hero headline: "Never Miss Salah"
- Subheadline: "Find accurate prayer times and local masjids, instantly"
- Primary CTAs: Download App + Find Near Me
- Social proof stats: 2300+ masjids, 4.8★ rating, 100% free
- Feature highlights: Real Jamaat Times, Privacy First, Works Offline
- All components must support dark mode
- Reuse existing StoreButton and FindNearMeButton components
