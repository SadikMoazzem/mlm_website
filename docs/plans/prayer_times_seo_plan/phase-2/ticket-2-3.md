# Ticket 2-3: Add static params generation for top 10 cities

Complexity level: low

Add generateStaticParams to pre-render the top 10 UK city prayer times pages at build time.

## Actions

### Action 1

Action type: edit file

Path: src/app/prayer-times/[city]/page.tsx

Description: Add generateStaticParams and ISR configuration

```typescript
import { TOP_UK_CITIES } from '@/lib/prayer-times-calculator'

// Generate static params for top 10 UK cities
export function generateStaticParams() {
  return TOP_UK_CITIES.map((city) => ({
    city,
  }))
}

// Revalidate every 24 hours (times change daily)
export const revalidate = 86400

// Also allow dynamic params for cities not in top 10
export const dynamicParams = true
```

## Checks

- [x] Build generates 10 static pages
- [x] Pages revalidate after 24 hours
- [x] Non-top-10 cities still work dynamically

## Coding standards

- docs/coding_standards/nextjs/app-router.md
