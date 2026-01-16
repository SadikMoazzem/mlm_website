import { MasjidData } from '@/types/api'

interface MasjidLocalBusinessSchemaProps {
  masjid: MasjidData
}

function formatMasjidSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function MasjidLocalBusinessSchema({ masjid }: MasjidLocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Mosque',
    '@id': `https://mylocalmasjid.com/masjid/${masjid.id}`,
    name: masjid.name,
    description: `${masjid.name} is a mosque in ${masjid.location?.city || 'the UK'}`,
    url: `https://mylocalmasjid.com/masjid/${masjid.id}/${formatMasjidSlug(masjid.name)}`,
    address: masjid.location ? {
      '@type': 'PostalAddress',
      streetAddress: masjid.location.full_address,
      addressLocality: masjid.location.city,
      addressCountry: masjid.location.country || 'GB',
    } : undefined,
    geo: masjid.location ? {
      '@type': 'GeoCoordinates',
      latitude: masjid.location.latitude,
      longitude: masjid.location.longitude,
    } : undefined,
    image: masjid.logo_url || undefined,
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
