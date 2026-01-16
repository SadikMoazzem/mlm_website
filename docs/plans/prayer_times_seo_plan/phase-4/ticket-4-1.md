# Ticket 4-1: Add SearchAction schema to homepage

Complexity level: medium

Add WebSite schema with SearchAction to the homepage to enable Google Sitelinks Search Box.

## Actions

### Action 1

Action type: create file

Path: src/components/schema/WebsiteSearchSchema.tsx

Description: Create component for WebSite schema with SearchAction

```tsx
export function WebsiteSearchSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MyLocalMasjid',
    url: 'https://mylocalmasjid.com',
    description: 'Find masjids, prayer times, and Islamic centres near you across the UK',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://mylocalmasjid.com/masjids?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Action 2

Action type: edit file

Path: src/app/page.tsx

Description: Add WebsiteSearchSchema to homepage

Import and render the schema component at the top of the page content.

## Checks

- [ ] Schema validates in Rich Results Test
- [ ] SearchAction target URL is correct
- [ ] Schema only appears on homepage

## Coding standards

- docs/coding_standards/react/components.md
- docs/coding_standards/seo/structured-data.md
