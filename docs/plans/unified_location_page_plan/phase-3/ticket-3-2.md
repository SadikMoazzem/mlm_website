# Ticket 3-2: Create Metadata Generation for SEO

Complexity level: medium

Create the metadata generation function for the location page. This ensures proper SEO with location-specific titles, descriptions, and keywords.

## Actions

### Action 1

Action type: create file

Path: `src/app/location/[slug]/metadata.ts`

Description: Create a separate metadata file (or include in page.tsx) with `generateMetadata` function:

**Function:**
```typescript
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await resolveLocationBySlug(slug)

  if (!result.success || !result.location) {
    return { title: 'Location Not Found' }
  }

  const location = result.location
  const todayTimes = calculatePrayerTimes(location.latitude, location.longitude, new Date())

  // Generate title based on location type
  const title = `Prayer Times & Masjids in ${location.name} | MyLocalMasjid`

  // Generate description with actual prayer times
  const description = `Find prayer times and ${location.type === 'city' ? `${(location as KnownCity).areas.length} areas with` : ''} masjids in ${location.name}. Today's Fajr at ${formatTimeDisplay(todayTimes.fajr)}, Dhuhr at ${formatTimeDisplay(todayTimes.dhuhr)}, Asr at ${formatTimeDisplay(todayTimes.asr)}.`

  return {
    title,
    description,
    keywords: generateLocationKeywords(location),
    openGraph: { ... },
    twitter: { ... },
    alternates: {
      canonical: `/location/${slug}`
    }
  }
}
```

**Keywords function:**
```typescript
function generateLocationKeywords(location: ResolvedLocation): string[] {
  const base = [
    `prayer times ${location.name}`,
    `masjids in ${location.name}`,
    `mosques in ${location.name}`,
    `${location.name} prayer times`,
    `${location.name} masjids`,
    `fajr time ${location.name}`,
    `salah times ${location.name}`,
  ]

  if (location.type === 'city') {
    // Add area-specific keywords
    base.push(...location.areas.map(a => `masjids ${a.name}`))
  }

  if (location.type === 'area') {
    // Add parent city keywords
    base.push(`${location.parentCity.name} ${location.name} masjids`)
  }

  return base
}
```

## Checks

- [ ] Title includes location name
- [ ] Description includes actual prayer times
- [ ] Keywords are location-specific
- [ ] Canonical URL is correct
- [ ] OpenGraph and Twitter cards work
- [ ] Unknown locations get reasonable defaults

## Coding standards

N/A - Follow existing metadata patterns from `/prayer-times/[city]`
