# Ticket 3-1: Create BreadcrumbList Schema Utility Function

Complexity level: medium

Create a utility function to generate BreadcrumbList JSON-LD schema for consistent breadcrumb structured data across all pages.

## Actions

### Action 1

Action type: create file

Path: `src/lib/schema-utils.ts`

Description: Create schema utility functions:

```typescript
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
```

Also add ItemList schema generator:

```typescript
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
```

## Checks

- [x] Functions compile without TypeScript errors
- [x] Generated JSON-LD is valid schema.org format
- [x] URLs include full domain

## Coding standards

N/A
