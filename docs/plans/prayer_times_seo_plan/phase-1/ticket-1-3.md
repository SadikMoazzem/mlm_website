# Ticket 1-3: Add helper functions for formatting and weekly times

Complexity level: medium

Add helper functions for weekly prayer times calculation and display formatting.

## Actions

### Action 1

Action type: edit file

Path: src/lib/prayer-times-calculator.ts

Description: Add helper functions for weekly calculations and city lookups

```typescript
// Add to existing file:

import { addDays } from 'date-fns'
import { cities } from '@/data/cities'

/**
 * Calculate prayer times for 7 days starting from a given date
 */
export function calculateWeeklyPrayerTimes(
  latitude: number,
  longitude: number,
  startDate: Date = new Date()
): CalculatedPrayerTimes[] {
  const weeklyTimes: CalculatedPrayerTimes[] = []

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDate, i)
    weeklyTimes.push(calculatePrayerTimes(latitude, longitude, date))
  }

  return weeklyTimes
}

/**
 * Get prayer times for a city by its ID from cities.ts
 */
export function getPrayerTimesForCity(
  cityId: string,
  date: Date = new Date()
): CalculatedPrayerTimes | null {
  const city = cities.find((c) => c.id === cityId)
  if (!city) return null

  return calculatePrayerTimes(city.latitude, city.longitude, date)
}

/**
 * Get weekly prayer times for a city
 */
export function getWeeklyPrayerTimesForCity(
  cityId: string,
  startDate: Date = new Date()
): CalculatedPrayerTimes[] | null {
  const city = cities.find((c) => c.id === cityId)
  if (!city) return null

  return calculateWeeklyPrayerTimes(city.latitude, city.longitude, startDate)
}

/**
 * Format time from 24h (HH:mm) to 12h display (h:mm am/pm)
 */
export function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'pm' : 'am'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Top 10 UK cities for static generation
 */
export const TOP_UK_CITIES = [
  'london',
  'birmingham',
  'manchester',
  'bradford',
  'leicester',
  'glasgow',
  'edinburgh',
  'cardiff',
  'dundee',
  'swansea',
] as const

export type TopUKCity = (typeof TOP_UK_CITIES)[number]
```

## Checks

- [ ] Weekly calculation returns 7 days of times
- [ ] City lookup returns null for invalid city IDs
- [ ] Time display format is correct (12-hour with am/pm)

## Coding standards

- docs/coding_standards/typescript/functions.md
- docs/coding_standards/typescript/types.md
