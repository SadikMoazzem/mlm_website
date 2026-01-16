# Ticket 3-1: Create LocalBusiness schema component for masjid cards

Complexity level: medium

Create a reusable component that generates LocalBusiness (Mosque) structured data for individual masjids.

## Actions

### Action 1

Action type: create file

Path: src/components/schema/MasjidLocalBusinessSchema.tsx

Description: Create component that generates JSON-LD structured data for a masjid

```tsx
import { MasjidData } from '@/types/api'

interface MasjidLocalBusinessSchemaProps {
  masjid: MasjidData
}

export function MasjidLocalBusinessSchema({ masjid }: MasjidLocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Mosque',
    '@id': `https://mylocalmasjid.com/masjid/${masjid.id}`,
    name: masjid.name,
    description: masjid.description || `${masjid.name} is a mosque in ${masjid.location?.city || 'the UK'}`,
    url: `https://mylocalmasjid.com/masjid/${masjid.id}/${encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))}`,
    address: masjid.location ? {
      '@type': 'PostalAddress',
      streetAddress: masjid.location.address,
      addressLocality: masjid.location.city,
      postalCode: masjid.location.postcode,
      addressCountry: 'GB',
    } : undefined,
    geo: masjid.location?.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: masjid.location.coordinates.latitude,
      longitude: masjid.location.coordinates.longitude,
    } : undefined,
    telephone: masjid.contact?.phone,
    email: masjid.contact?.email,
    image: masjid.image_url,
  }

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}
```

## Checks

- [x] Schema validates against schema.org/Mosque
- [x] Handles missing optional fields gracefully
- [x] JSON-LD renders correctly in page source

## Coding standards

- docs/coding_standards/react/components.md
- docs/coding_standards/seo/structured-data.md
