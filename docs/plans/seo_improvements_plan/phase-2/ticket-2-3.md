# Ticket 2-3: Add Masjid Count Statistics to City Page

Complexity level: low

Add total masjid count display on city pages by summing area counts from cities.ts.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjids/[city]/page.tsx`

Action: Add total masjid count calculation and display

Description: Calculate total masjids from area counts:

```typescript
// In the component, calculate total
const totalMasjids = city.areas.reduce((sum, area) => sum + area.masjid_count, 0)

// Update the stats display section to show:
<div className="flex items-center">
  <Users className="w-5 h-5 mr-2 text-emerald-600" />
  <span>{totalMasjids}+ Masjids</span>
</div>
```

This provides valuable content for both users and search engines.

## Checks

- [x] Total count displays correctly
- [x] Count is sum of all area masjid_counts
- [x] Display matches existing stat styling

## Coding standards

N/A
