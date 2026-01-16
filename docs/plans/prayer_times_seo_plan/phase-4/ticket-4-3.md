# Ticket 4-3: Update area page H1 tags to include "Prayer Times"

Complexity level: low

Update the H1 heading on area pages to include "Prayer Times" keyword for better SEO ranking.

## Actions

### Action 1

Action type: edit file

Path: src/app/masjids/[city]/[area]/page.tsx

Description: Update the H1 heading text

Current H1:
```tsx
<h1>Masjids in {area.name}</h1>
```

New H1:
```tsx
<h1>Masjids & Prayer Times in {area.name}</h1>
```

### Action 2

Action type: edit file

Path: src/app/masjids/[city]/[area]/metadata.ts

Description: Update title and description to include "Prayer Times"

Current title pattern:
```
Masjids in East London | MyLocalMasjid
```

New title pattern:
```
Masjids & Prayer Times in East London | MyLocalMasjid
```

Update description to mention prayer times availability.

## Checks

- [ ] H1 updated on area pages
- [ ] Metadata title updated
- [ ] No duplicate H1 tags on page

## Coding standards

- docs/coding_standards/seo/on-page.md
