# Ticket 1-4: Create MasjidListItem Component

Complexity level: medium

Create a reusable component for displaying masjids in list format, used on area and city pages.

## Actions

### Action 1

Action type: create file

Path: `src/components/masjid/MasjidListItem.tsx`

Description: Create component with the following structure:

```typescript
interface MasjidListItemProps {
  id: string
  name: string
  address: string
  distance?: number // in km
  city?: string
  showDistance?: boolean
}

// Component should render:
// - Link to /masjid/{id}/{slugified-name}
// - Masjid name as heading
// - Address with MapPin icon
// - Distance badge if provided (e.g., "0.5 km")
// - Hover state with subtle background change
// - Clean, accessible markup
```

Styling:
- Use existing Tailwind patterns from the codebase
- Match style of existing masjid cards on city pages
- Include hover state for interactivity
- Mobile-responsive padding

## Checks

- [x] Component renders correctly with all props
- [x] Link navigates to correct masjid page
- [x] Distance displays correctly when provided
- [x] Component is accessible (proper heading levels, link text)
- [x] Hover states work

## Coding standards

N/A
