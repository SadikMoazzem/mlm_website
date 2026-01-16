# Ticket 4-2: Update Internal Links Across the Codebase

Complexity level: medium

Update all internal links that point to legacy routes (`/prayer-times/[city]`, `/masjids/[city]`, `/masjids/[city]/[area]`) to use the new `/location/[slug]` route.

## Actions

### Action 1

Action type: search and edit

Description: Search for and update links in the following patterns:

**Search patterns:**
- `href="/prayer-times/${`
- `href="/masjids/${`
- `href={\`/prayer-times/`
- `href={\`/masjids/`

**Files likely to contain these links:**
- `src/app/page.tsx` (homepage)
- `src/app/prayer-times/page.tsx` (prayer times hub)
- `src/app/masjids/page.tsx` (masjids hub)
- `src/components/prayer-times/*.tsx`
- `src/components/home/*.tsx`
- Any navigation or footer components

**Update pattern:**
```typescript
// Before
href={`/prayer-times/${city.id}`}
href={`/masjids/${city.id}`}
href={`/masjids/${city.id}/${area.id}`}

// After
href={`/location/${city.id}`}
href={`/location/${city.id}`}
href={`/location/${area.id}`}
```

### Action 2

Action type: verify

Description: Run a grep search to ensure no legacy links remain:
```bash
grep -r "href=\"/prayer-times/" src/
grep -r "href=\"/masjids/" src/
grep -r "href={\`/prayer-times/" src/
grep -r "href={\`/masjids/" src/
```

Exclude: Files in `src/app/prayer-times/` and `src/app/masjids/` directories (legacy routes themselves)

## Checks

- [ ] Homepage city links point to `/location/`
- [ ] Prayer times hub links point to `/location/`
- [ ] Masjids hub links point to `/location/`
- [ ] Area cards link to `/location/`
- [ ] No legacy link patterns remain in components
- [ ] All links work correctly

## Coding standards

N/A - Simple string replacements
