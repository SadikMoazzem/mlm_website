# Ticket 2-2: Create LocationHeader Sub-component

Complexity level: medium

Create the LocationHeader component that displays the hero section with location name, country, date, and key statistics.

## Actions

### Action 1

Action type: create file

Path: `src/components/location/LocationHeader.tsx`

Description: Create the LocationHeader component with:

**Props:**
```typescript
interface LocationHeaderProps {
  location: ResolvedLocation
  date: Date
  stats: {
    masjidCount?: number
    areaCount?: number
  }
}
```

**UI Elements:**
- Icon (Building2 from lucide-react)
- Location name as h1 (e.g., "London" or "East London")
- Subtitle with country and parent city if area (e.g., "England" or "London, England")
- Formatted date (e.g., "Friday, 17 January 2025")
- Stats bar showing:
  - For cities: "X Areas" and "Y+ Masjids"
  - For areas: "Within Xkm radius" and "Y masjids found"
  - For dynamic: "Y masjids found"

**Styling:**
- Follow existing hero section patterns from `/prayer-times/[city]` and `/masjids/[city]`
- Use consistent icon colors: `text-primary-600 dark:text-primary-400`
- Use `bg-bg-card` for stats bar with border

## Checks

- [ ] Renders correctly for KnownCity (shows area count)
- [ ] Renders correctly for KnownArea (shows parent city, radius)
- [ ] Renders correctly for DynamicLocation
- [ ] Date formats correctly
- [ ] Stats display correct values
- [ ] Responsive on mobile

## Coding standards

N/A - Follow existing component patterns
