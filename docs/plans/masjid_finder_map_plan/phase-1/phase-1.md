# Phase 1: Project Setup & Core Map

## Goals

Set up the foundational route structure, install dependencies, and create a basic full-screen Mapbox map that renders masjid markers from the tileset. This establishes the core map functionality that all other features build upon.

### Tickets

- [x] Ticket 1: Install Vaul dependency and create route structure
- [x] Ticket 2: Create Mapbox tileset configuration
- [x] Ticket 3: Create MasjidFinderMap component with tileset rendering
- [x] Ticket 4: Create finder page with full-screen layout
- [ ] Run quality checks (lint, build)
- [ ] Verify UI with Playwright: navigate to /masjids/finder, check map renders with markers

### Notes

**Tileset Configuration (from app-v2):**
```typescript
TILESET_ID = 'mlmadmin.uk-masjids'
TILESET_URL = 'mapbox://mlmadmin.uk-masjids'
SOURCE_LAYER = 'masjids'
```

**Layer Strategy:**
- CircleLayer for `type === 'hall'` (teal circles)
- SymbolLayer for other types (mosque icons)
- Text labels appear at zoom 14+

**Important:** Use dynamic import for map component to avoid SSR issues with Mapbox GL JS.

### Dependency Graph

```
Ticket 1 (setup)
    ↓
Ticket 2 (tileset config)
    ↓
Ticket 3 (map component)
    ↓
Ticket 4 (page)
    ↓
Quality checks
    ↓
Playwright verification
```

All tickets are sequential - each depends on the previous.
