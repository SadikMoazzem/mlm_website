interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mylocalmasjid.com'}${item.url}`
    }))
  }
}

// Example usage:
// generateBreadcrumbSchema([
//   { name: 'Home', url: '/' },
//   { name: 'Masjids', url: '/masjids' },
//   { name: 'London', url: '/masjids/london' },
//   { name: 'East London', url: '/masjids/london/east-london' }
// ])

interface ListItem {
  name: string
  url: string
  position: number
}

export function generateItemListSchema(items: ListItem[], name: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "numberOfItems": items.length,
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mylocalmasjid.com'}${item.url}`
    }))
  }
}
