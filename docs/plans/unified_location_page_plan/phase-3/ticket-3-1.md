# Ticket 3-1: Create the /location/[slug] Route Page

Complexity level: high

Create the main route page that renders the unified location profile. This page resolves the location, fetches necessary data, and renders the LocationProfile component.

## Actions

### Action 1

Action type: create directory

Path: `src/app/location/[slug]/`

Description: Create the route directory

### Action 2

Action type: create file

Path: `src/app/location/[slug]/page.tsx`

Description: Create the main page component with:

**Interface:**
```typescript
interface LocationPageProps {
  params: Promise<{ slug: string }>
}
```

**Data Fetching (server component):**
1. Resolve location using `resolveLocationBySlug(slug)`
2. If not found, call `notFound()`
3. Calculate prayer times using `calculatePrayerTimes(lat, lng, today)`
4. Calculate weekly prayer times using `calculateWeeklyPrayerTimes(lat, lng, today)`
5. For KnownArea and DynamicLocation: fetch masjids using `getNearestMasajid`
   - Use location coordinates and appropriate radius (area.radiusKm or 5km default)

**Rendering:**
```tsx
export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const result = await resolveLocationBySlug(slug)

  if (!result.success || !result.location) {
    notFound()
  }

  const location = result.location
  const today = new Date()
  const prayerTimes = calculatePrayerTimes(location.latitude, location.longitude, today)
  const weeklyPrayerTimes = calculateWeeklyPrayerTimes(location.latitude, location.longitude, today)

  // Fetch masjids for areas and dynamic locations
  let masjids: MasjidData[] = []
  if (location.type !== 'city') {
    const radius = location.type === 'area' ? location.radiusKm : 5
    const response = await getNearestMasajid({
      latitude: location.latitude,
      longitude: location.longitude,
      radius_km: radius,
      page: 1,
      size: 15
    })
    masjids = response.data?.masjids || []
  }

  return (
    <LocationProfile
      location={location}
      prayerTimes={prayerTimes}
      weeklyPrayerTimes={weeklyPrayerTimes}
      masjids={masjids}
    />
  )
}
```

## Checks

- [ ] `/location/london` renders city with areas
- [ ] `/location/east-london` renders area with masjids
- [ ] `/location/unknown-slug` shows 404 or attempts geocoding
- [ ] Prayer times display correctly
- [ ] No console errors
- [ ] TypeScript compiles

## Coding standards

N/A - Follow existing route patterns
