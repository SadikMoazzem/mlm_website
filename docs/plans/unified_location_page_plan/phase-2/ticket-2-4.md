# Ticket 2-4: Create MasjidsList Sub-component

Complexity level: medium

Create the MasjidsList component that displays a list of masjids for areas and dynamic locations. This component shows masjid cards with distance, address, and prayer time preview.

## Actions

### Action 1

Action type: create file

Path: `src/components/location/MasjidsList.tsx`

Description: Create the MasjidsList component with:

**Props:**
```typescript
interface MasjidsListProps {
  locationName: string
  masjids: MasjidData[]
  showViewAll?: boolean
  viewAllUrl?: string
}
```

**UI Elements:**
- Section title: "Masjids in {locationName}"
- List of MasjidCard components (vertical stack)
- Each MasjidCard shows:
  - Building2 icon
  - Masjid name (links to `/masjid/{id}/{slug}`)
  - Distance in km (if available)
  - Address
  - Fajr time preview (if current_prayer_times available)
  - ChevronRight indicator
- "View all masjids in {locationName}" button if `showViewAll` is true
- Links to `/masjids/near/{lat}/{lng}` with location params

**Styling:**
- Container: `bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)]`
- Cards: `p-3 bg-bg-primary rounded-xl border border-[var(--border)]` with hover state
- Stack: `space-y-3`

**Note:** Adapt the MasjidCard pattern from existing `/masjids/[city]/[area]/page.tsx`

## Checks

- [ ] Renders list of masjids correctly
- [ ] Masjid links point to correct URLs
- [ ] Distance displays correctly
- [ ] Prayer time preview shows when available
- [ ] View all button works when enabled
- [ ] Empty state not shown (handled by parent)

## Coding standards

N/A - Follow existing card patterns from `/masjids/[city]/[area]/page.tsx`
