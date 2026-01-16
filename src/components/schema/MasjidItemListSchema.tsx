import { MasjidData } from '@/types/api'

interface MasjidItemListSchemaProps {
  masjids: MasjidData[]
  listName: string
  listUrl: string
}

export function MasjidItemListSchema({ masjids, listName, listUrl }: MasjidItemListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: listUrl,
    numberOfItems: masjids.length,
    itemListElement: masjids.map((masjid, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Mosque',
        '@id': `https://mylocalmasjid.com/masjid/${masjid.id}`,
        name: masjid.name,
        url: `https://mylocalmasjid.com/masjid/${masjid.id}/${encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))}`,
        address: masjid.location ? {
          '@type': 'PostalAddress',
          addressLocality: masjid.location.city,
          addressCountry: 'GB',
        } : undefined,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
