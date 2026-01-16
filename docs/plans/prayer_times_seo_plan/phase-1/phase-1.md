# Phase 1: Adhan.js Integration & Prayer Time Utility

## Goals

Install Adhan.js library and create a utility module for calculating prayer times using UK Moonsighting Committee method with Shafi Asr. This utility will be used by both static city pages and dynamic calculations.

### Tickets

- [x] Install adhan and date-fns-tz dependencies
- [x] Create prayer time calculation utility with UK method and Shafi Asr
- [x] Add helper functions for formatting and weekly times
- [x] Run quality checks (lint, build)

### Dependencies

```
ticket-1-1 ─► ticket-1-2 ─► ticket-1-3 ─► ticket-1-4
```

### Notes

**Adhan.js Configuration:**
```typescript
import { CalculationMethod, Madhab, PrayerTimes, Coordinates } from 'adhan'

// UK Moonsighting Committee method
const params = CalculationMethod.MoonsightingCommittee()
params.madhab = Madhab.Shafi // Shadow length = 1x object height

const coordinates = new Coordinates(latitude, longitude)
const prayerTimes = new PrayerTimes(coordinates, date, params)
```

**Time Formatting:**
- Use `date-fns-tz` for timezone-aware formatting
- Format as HH:mm (24-hour) for consistency
- Display in 12-hour format (h:mm a) on UI

**Utility Functions Needed:**
- `calculatePrayerTimes(lat, lng, date)` - single day calculation
- `calculateWeeklyPrayerTimes(lat, lng, startDate)` - 7 days
- `formatPrayerTime(date, timezone)` - timezone-aware formatting
- `getPrayerTimesForCity(cityId)` - wrapper using cities.ts data
