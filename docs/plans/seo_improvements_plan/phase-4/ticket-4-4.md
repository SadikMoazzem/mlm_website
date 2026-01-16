# Ticket 4-4: Add "Facilities & Services" Section to Masjid Pages

Complexity level: medium

Add a "Facilities & Services" content section that describes available facilities in natural language.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjid/[id]/[name]/MasjidRedirectClient.tsx`

Action: Add Facilities content section

Description: Add section with facility descriptions:

```typescript
import { generateFacilitiesContent } from '@/lib/content-generators'

const facilitiesContent = masjidData ? generateFacilitiesContent(masjidData) : null
const activeFacilities = masjidData?.facilities?.filter(f => f.status === 'open') || []

// Add section:
{(facilitiesContent || activeFacilities.length > 0) && (
  <section className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      Facilities at {displayName}
    </h2>
    {facilitiesContent && (
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {facilitiesContent}
      </p>
    )}
    {activeFacilities.length > 0 && (
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {activeFacilities.map(facility => (
          <li key={facility.name}>{facility.name}</li>
        ))}
      </ul>
    )}
  </section>
)}
```

This helps match searches like "facilities at [masjid]" or "[masjid] women's section".

## Checks

- [ ] Section renders when facilities exist
- [ ] Section does not render if no facilities
- [ ] Facility list displays correctly
- [ ] Content reads naturally

## Coding standards

N/A
