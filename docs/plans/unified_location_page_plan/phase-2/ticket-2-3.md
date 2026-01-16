# Ticket 2-3: Create AreasGrid Sub-component for Cities

Complexity level: medium

Create the AreasGrid component that displays a grid of area cards for known cities. Each card links to the area's location page.

## Actions

### Action 1

Action type: create file

Path: `src/components/location/AreasGrid.tsx`

Description: Create the AreasGrid component with:

**Props:**
```typescript
interface AreasGridProps {
  citySlug: string
  cityName: string
  areas: Area[]  // From cities.ts
}
```

**UI Elements:**
- Section title: "Browse Areas in {cityName}"
- Grid of AreaCard components (2 cols mobile, 3 cols desktop)
- Each AreaCard shows:
  - MapPin icon
  - Area name
  - Masjid count ("X masjids")
  - Links to `/location/{area.id}`
- "Add Your Masjid" CTA at bottom if areas exist

**Styling:**
- Container: `bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)]`
- Grid: `grid grid-cols-2 sm:grid-cols-3 gap-3`
- Cards: hover effect with border color change

**Note:** Reuse/adapt the AreaCard pattern from existing `/masjids/[city]/page.tsx`

## Checks

- [x] Renders grid of areas correctly
- [x] Links point to `/location/{areaId}`
- [x] Masjid counts display correctly
- [x] Responsive grid layout works
- [x] Hover states work correctly

## Coding standards

N/A - Follow existing grid patterns from `/masjids/[city]/page.tsx`
