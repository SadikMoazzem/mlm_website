# Ticket 2-2: Create city prayer times metadata with SEO optimization

Complexity level: medium

Create the metadata generation function for city prayer times pages with dynamic SEO content.

## Actions

### Action 1

Action type: create file

Path: src/app/prayer-times/[city]/metadata.ts

Description: Create metadata generation with dynamic prayer times in description

```typescript
import { Metadata } from 'next'
import { getCityById } from '@/data/cities'
import { calculatePrayerTimes, formatTimeDisplay } from '@/lib/prayer-times-calculator'

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = getCityById(params.city)

  if (!city) {
    return {
      title: 'Prayer Times Not Found | MyLocalMasjid',
    }
  }

  const todayTimes = calculatePrayerTimes(city.latitude, city.longitude, new Date())
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const title = `Prayer Times in ${city.name} Today | Salah Times | MyLocalMasjid`
  const description = `Accurate prayer times for ${city.name}, ${city.country} on ${today}. Fajr ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr ${formatTimeDisplay(todayTimes.dhuhr)}, Asr ${formatTimeDisplay(todayTimes.asr)}, Maghrib ${formatTimeDisplay(todayTimes.maghrib)}, Isha ${formatTimeDisplay(todayTimes.isha)}. UK Moonsighting Committee method.`

  return {
    title,
    description,
    keywords: [
      `prayer times ${city.name.toLowerCase()}`,
      `salah times ${city.name.toLowerCase()}`,
      `fajr time ${city.name.toLowerCase()}`,
      `namaz time ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} mosque prayer times`,
    ],
    openGraph: {
      title,
      description,
      url: `https://mylocalmasjid.com/prayer-times/${params.city}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://mylocalmasjid.com/prayer-times/${params.city}`,
    },
  }
}
```

## Checks

- [ ] Metadata includes today's actual prayer times
- [ ] Keywords are lowercase and location-specific
- [ ] Canonical URL is set correctly

## Coding standards

- docs/coding_standards/nextjs/metadata.md
