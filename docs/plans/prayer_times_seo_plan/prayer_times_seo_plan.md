# Prayer Times SEO Implementation Plan

## Overview

Create location-specific prayer times pages for top 10 UK cities with proper Adhan.js integration using UK Moonsighting Committee method and Shafi Asr (Mithl 1). Pages will show calculated prayer times for each city, link to nearby masjids, and be optimized for "prayer times in [city]" searches. Also adds LocalBusiness schema and SearchAction schema for improved Google visibility.

### Features

- Static prayer times pages for top 10 UK cities (`/prayer-times/[city]`)
- Proper Adhan.js calculation using UK Moonsighting Committee method (Method 8) and Shafi Asr
- Daily prayer times with next 7 days preview
- LocalBusiness schema for masjids on city/area pages
- SearchAction schema for Google site search integration
- Enhanced area page H1 tags with "Prayer Times" keywords

## Top 10 UK Cities (Static Pages)

1. London (51.5074, -0.1278)
2. Birmingham (52.4862, -1.8904)
3. Manchester (53.4808, -2.2426)
4. Bradford (53.7960, -1.7594)
5. Leicester (52.6369, -1.1398)
6. Glasgow (55.8642, -4.2518)
7. Edinburgh (55.9533, -3.1883)
8. Cardiff (51.4816, -3.1791)
9. Dundee (56.4620, -2.9707)
10. Swansea (51.6214, -3.9436)

## Calculation Parameters

- **Method**: UK Moonsighting Committee (`CalculationMethod.MoonsightingCommittee()` - value 8)
- **Asr Madhab**: Shafi (`Madhab.Shafi`) - shadow length = 1x object height
- **High Latitude Rule**: Built into Moonsighting Committee method (handles UK summer/winter extremes)
- **Timezone**: Europe/London (handles BST/GMT automatically)

## Assumptions

- Adhan.js library will be installed for server-side calculations
- Prayer times calculated at build time for static generation
- ISR with 1-day revalidation for daily time updates
- Client-side calculation fallback for other cities not in top 10

## Dependencies

- `adhan` npm package for prayer time calculations
- `date-fns` and `date-fns-tz` for date/timezone handling
- Existing `src/data/cities.ts` for city coordinates
- Existing page patterns from `/prayer-times/page.tsx`

## Risks & Considerations

- **Timezone Handling**: UK switches between GMT and BST; must use `Europe/London` timezone
- **High Latitude**: UK summer has very late Isha times; Moonsighting Committee method handles this
- **SEO Cannibalization**: Use canonical tags to prevent `/prayer-times/london` competing with `/prayer-times`
- **Accuracy**: Calculated times may differ slightly from masjid-published times; display disclaimer

## Phases

- [x] Phase 1: Adhan.js Integration & Prayer Time Utility ✅
- [x] Phase 2: City-Specific Prayer Times Pages (Top 10) ✅
- [x] Phase 3: LocalBusiness Schema for City/Area Pages ✅
- [ ] Phase 4: SearchAction Schema & Area Page H1 Enhancement
