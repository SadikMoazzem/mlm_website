# Phase 2: State Management & Map Integration

## Goals

Implement the MasjidsMapContext for centralized state management and integrate it with the map component. This establishes the data flow patterns for map center, selected masjid, filters, and visible masjids tracking.

### Tickets

- [ ] Ticket 1: Create MasjidsMapContext with reducer pattern
- [ ] Ticket 2: Create useVisibleMasjids hook
- [ ] Ticket 3: Integrate context with map component
- [ ] Run quality checks (lint, build)

### Notes

**State Structure (from app-v2):**
```typescript
interface MasjidsMapState {
  center: Coordinates | null;
  searchedLocation: SearchedLocation | null;
  selectedMasjidId: string | null;
  activeFilters: ActiveFilters;
  filterExpression: FilterExpression | undefined;
  visibleMasjids: MasjidFeature[];
  visibleCount: number;
  isInitialized: boolean;
}
```

**Key Patterns:**
- Use reducer pattern for predictable state updates
- Compute `filterExpression` from `activeFilters` using useMemo
- `buildFilterExpression()` helper to create Mapbox expressions
- Debounce visible masjids updates on map move

### Dependency Graph

```
Ticket 1 (context)
    ↓
Ticket 2 (useVisibleMasjids hook) ←── depends on context
    ↓
Ticket 3 (integration)
    ↓
Quality checks
```

Tickets 1 and 2 can run in parallel after Ticket 1 creates the basic context structure.
