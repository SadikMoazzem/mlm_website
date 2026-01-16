# Ticket 2-1: Create dynamic route /prayer-times/[city]/page.tsx

Complexity level: high

Create the main city prayer times page with calculated times, weekly forecast, and nearby masjids section.

## Actions

### Action 1

Action type: create directory

Path: src/app/prayer-times/[city]

Description: Create the dynamic route directory for city prayer times pages

### Action 2

Action type: create file

Path: src/app/prayer-times/[city]/page.tsx

Description: Create the city prayer times page component with server-side rendering

Key features:
- Server component that calculates prayer times at request time
- Displays today's prayer times prominently
- Shows 7-day forecast table
- Links to nearby masjids in the city
- Includes download app CTA
- Method disclaimer at bottom

Structure:
```tsx
// Server component
export default async function CityPrayerTimesPage({ params }) {
  const city = getCityById(params.city)
  if (!city) notFound()

  const todayTimes = calculatePrayerTimes(city.latitude, city.longitude, new Date())
  const weeklyTimes = calculateWeeklyPrayerTimes(city.latitude, city.longitude)

  return (
    <div>
      <CityPrayerTimesHeader city={city} todayTimes={todayTimes} />
      <TodayPrayerTimesGrid times={todayTimes} />
      <WeeklyPrayerTimesTable weeklyTimes={weeklyTimes} />
      <NearbyMasjidsSection cityId={city.id} />
      <DownloadAppCTA />
      <MethodDisclaimer />
    </div>
  )
}
```

## Checks

- [x] Page renders correctly for valid city slugs
- [x] 404 returned for invalid city slugs
- [x] Prayer times display correctly
- [x] Dark mode styling works

## Coding standards

- docs/coding_standards/react/components.md
- docs/coding_standards/nextjs/app-router.md
