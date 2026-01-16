# Ticket 2-1: Create LocationProfile Main Component Structure

Complexity level: high

Create the main LocationProfile component that orchestrates the unified location page layout. This component conditionally renders different sections based on the location type.

## Actions

### Action 1

Action type: create directory

Path: `src/components/location/`

Description: Create the location components directory

### Action 2

Action type: create file

Path: `src/components/location/LocationProfile.tsx`

Description: Create the main LocationProfile component with:

**Props:**
```typescript
interface LocationProfileProps {
  location: ResolvedLocation
  prayerTimes: CalculatedPrayerTimes
  weeklyPrayerTimes: CalculatedPrayerTimes[]
  masjids?: MasjidData[]
}
```

**Structure:**
1. Breadcrumb navigation (Home > Location Name)
2. LocationHeader - hero section with name, stats
3. TodayPrayerTimesGrid - reuse from `@/components/prayer-times`
4. WeeklyPrayerTimesTable - reuse from `@/components/prayer-times`
5. Conditional content based on location type:
   - `KnownCity`: AreasGrid showing all areas
   - `KnownArea`: MasjidsList showing masjids in area
   - `DynamicLocation`: MasjidsList or LocationComingSoon
6. Download App CTA
7. MethodDisclaimer - reuse from `@/components/prayer-times`

**JSON-LD Schema:**
- BreadcrumbList schema
- LocalBusiness schema for the location

### Action 3

Action type: create file

Path: `src/components/location/index.ts`

Description: Create barrel export file:
```typescript
export { LocationProfile } from './LocationProfile'
export { LocationHeader } from './LocationHeader'
export { AreasGrid } from './AreasGrid'
export { MasjidsList } from './MasjidsList'
export { LocationComingSoon } from './LocationComingSoon'
```

## Checks

- [ ] Component renders without errors for all location types
- [ ] Breadcrumb shows correct navigation
- [ ] Prayer times sections render correctly
- [ ] Conditional sections show based on location type
- [ ] TypeScript compiles without errors

## Coding standards

N/A - Follow existing component patterns in `src/components/`
