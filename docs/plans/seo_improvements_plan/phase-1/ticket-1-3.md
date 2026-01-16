# Ticket 1-3: Implement Static Params Generation

Complexity level: low

Add generateStaticParams function to pre-generate all city/area combinations at build time.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjids/[city]/[area]/page.tsx`

Action: Add generateStaticParams function

Description: Add function that iterates through all cities and their areas:

```typescript
export async function generateStaticParams() {
  const params: { city: string; area: string }[] = []

  for (const city of cities) {
    for (const area of city.areas) {
      params.push({
        city: city.id,
        area: area.id,
      })
    }
  }

  return params
}
```

This will pre-generate pages like:
- `/masjids/london/east-london`
- `/masjids/london/west-london`
- `/masjids/birmingham/birmingham-central`
- etc.

## Checks

- [ ] Function returns array of all city/area combinations
- [ ] Build generates static pages for all areas
- [ ] No duplicate params generated

## Coding standards

N/A
