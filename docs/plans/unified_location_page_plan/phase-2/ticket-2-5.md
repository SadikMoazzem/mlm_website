# Ticket 2-5: Create LocationComingSoon Sub-component

Complexity level: low

Create the LocationComingSoon component displayed when no masjids are found for a location. This encourages users to add masjids to help grow the directory.

## Actions

### Action 1

Action type: create file

Path: `src/components/location/LocationComingSoon.tsx`

Description: Create the LocationComingSoon component with:

**Props:**
```typescript
interface LocationComingSoonProps {
  locationName: string
}
```

**UI Elements:**
- Gradient background card (primary-600 to primary-700)
- Icon (Users or Building2)
- Title: "Masjids Coming Soon"
- Description: "We're expanding our coverage to {locationName}. Help the Muslim community by adding masjids to our directory."
- Primary CTA button: "Add Your Masjid" linking to `/add-masjid`
- Secondary info: "Your contribution helps others find places to pray"

**Styling:**
- Container: `bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center`
- Button: `bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50`
- Follow existing CTA patterns from prayer-times and masjids pages

## Checks

- [x] Renders correctly with location name
- [x] Add Masjid link works
- [x] Styling matches existing CTAs
- [x] Responsive on mobile

## Coding standards

N/A - Follow existing CTA patterns
