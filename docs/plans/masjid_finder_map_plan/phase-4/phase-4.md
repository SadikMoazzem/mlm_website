# Phase 4: Filtering System

## Goals

Implement the filter chips UI and dynamic Mapbox filtering. Users can filter masjids by Women's Area, Parking, Madhab, and Type. Filters apply instantly to the map markers.

### Tickets

- [ ] Ticket 1: Create FilterChips component
- [ ] Ticket 2: Create filter dropdown components (Madhab, Type)
- [ ] Ticket 3: Integrate filters with context and map
- [ ] Run quality checks (lint, build)
- [ ] Verify UI with Playwright: test filter chips toggle, dropdown opens

### Notes

**Filter Types:**
- **Women's Area**: Toggle chip (on/off)
- **Parking**: Toggle chip (on/off)
- **Madhab**: Dropdown (Hanafi, Shafi, All)
- **Type**: Dropdown (Masjid, Hall, All)

**Mapbox Filter Expressions:**
```typescript
// Women's Area filter
['==', ['coalesce', ['get', 'has_women_area'], false], true]

// Parking filter
['==', ['coalesce', ['get', 'has_parking'], false], true]

// Madhab filter
['==', ['coalesce', ['get', 'madhab'], ''], 'hanafi']

// Combined with 'all'
['all', filter1, filter2, ...]
```

### Dependency Graph

```
Ticket 1 (chips UI) ────┐
                        ├──→ Ticket 3 (integration)
Ticket 2 (dropdowns) ───┘

Ticket 1 and 2 can run in parallel
Ticket 3 depends on both
```
