# Ticket 1-2: Create prayer time calculation utility with UK method and Shafi Asr

Complexity level: medium

Create a utility module that calculates prayer times using Adhan.js with UK Moonsighting Committee method and Shafi Asr madhab.

## Actions

### Action 1

Action type: create file

Path: src/lib/prayer-times-calculator.ts

Description: Create the main prayer times calculation utility using Adhan.js

```typescript
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

const UK_TIMEZONE = 'Europe/London'

export interface CalculatedPrayerTimes {
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

/**
 * Calculate prayer times for a location using UK Moonsighting Committee method
 * and Shafi Asr (shadow length = 1x object height)
 */
export function calculatePrayerTimes(
  latitude: number,
  longitude: number,
  date: Date
): CalculatedPrayerTimes {
  const coordinates = new Coordinates(latitude, longitude)

  // UK Moonsighting Committee method - designed for UK high latitudes
  const params = CalculationMethod.MoonsightingCommittee()
  params.madhab = Madhab.Shafi // Mithl 1 (shadow = 1x object height)

  const prayerTimes = new PrayerTimes(coordinates, date, params)

  return {
    date: format(date, 'yyyy-MM-dd'),
    fajr: formatInTimeZone(prayerTimes.fajr, UK_TIMEZONE, 'HH:mm'),
    sunrise: formatInTimeZone(prayerTimes.sunrise, UK_TIMEZONE, 'HH:mm'),
    dhuhr: formatInTimeZone(prayerTimes.dhuhr, UK_TIMEZONE, 'HH:mm'),
    asr: formatInTimeZone(prayerTimes.asr, UK_TIMEZONE, 'HH:mm'),
    maghrib: formatInTimeZone(prayerTimes.maghrib, UK_TIMEZONE, 'HH:mm'),
    isha: formatInTimeZone(prayerTimes.isha, UK_TIMEZONE, 'HH:mm'),
  }
}
```

## Checks

- [ ] TypeScript compiles without errors
- [ ] Function returns correctly formatted times
- [ ] Times are in Europe/London timezone (handles BST/GMT)

## Coding standards

- docs/coding_standards/typescript/functions.md
- docs/coding_standards/typescript/types.md
