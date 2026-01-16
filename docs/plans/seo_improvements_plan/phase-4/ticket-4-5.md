# Ticket 4-5: Add "Getting There" Section to Masjid Pages

Complexity level: medium

Add a "Getting There" content section with location information and directions context.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjid/[id]/[name]/MasjidRedirectClient.tsx`

Action: Add Getting There content section

Description: Add section with location details:

```typescript
import { generateGettingThereContent } from '@/lib/content-generators'

const gettingThereContent = masjidData ? generateGettingThereContent(masjidData) : null

// Add section:
{gettingThereContent && (
  <section className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      Getting to {displayName}
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed mb-3">
      {gettingThereContent}
    </p>
    {/* Link to Google Maps */}
    {masjidData?.location && (
      <a
        href={getGoogleMapsUrl(masjidData)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700"
      >
        <MapPin className="w-4 h-4 mr-1" />
        View on Google Maps
      </a>
    )}
  </section>
)}
```

This helps match searches like "how to get to [masjid]" or "directions to [masjid]".

## Checks

- [ ] Section renders when location data exists
- [ ] Section does not render if no location
- [ ] Google Maps link works correctly
- [ ] Address displays properly

## Coding standards

N/A
