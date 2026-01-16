# Ticket 1: Create MasjidsMapContext with reducer pattern

Complexity level: high

Create the central state management context for the masjid finder map. This context manages map center, selected masjid, filters, and coordinates updates across all components.

## Actions

### Action 1: Create MasjidsMapContext

Action type: create file

Path: `src/app/masjids/finder/context/MasjidsMapContext.tsx`

Description: Create the context with reducer pattern, mirroring the app-v2 implementation. Include:

**State:**
- `center`: Current map center coordinates
- `searchedLocation`: Pin location from search (name + coordinates)
- `selectedMasjidId`: Currently selected masjid ID
- `activeFilters`: Object with filter toggles (womensArea, parking, madhab, type)
- `visibleMasjids`: Array of masjids currently visible on map
- `visibleCount`: Count of visible masjids
- `isInitialized`: Whether context has been initialized with location

**Actions:**
- `setCenter(coords, locationName?)`: Set map center, optionally with search pin
- `clearSearchedLocation()`: Remove search pin from map
- `selectMasjid(id | null)`: Select/deselect a masjid
- `setFilter(key, value)`: Update a single filter
- `clearFilters()`: Reset all filters
- `updateVisibleMasjids(masjids)`: Update visible masjids list

**Computed:**
- `filterExpression`: Mapbox filter expression computed from activeFilters

**buildFilterExpression helper:**
```typescript
const buildFilterExpression = (filters: ActiveFilters): FilterExpression | undefined => {
  const conditions: any[] = [];

  if (filters.womensArea) {
    conditions.push(['==', ['coalesce', ['get', 'has_women_area'], false], true]);
  }
  if (filters.parking) {
    conditions.push(['==', ['coalesce', ['get', 'has_parking'], false], true]);
  }
  if (filters.madhab) {
    conditions.push(['==', ['coalesce', ['get', 'madhab'], ''], filters.madhab]);
  }
  if (filters.type) {
    conditions.push(['==', ['get', 'type'], filters.type]);
  }

  if (conditions.length === 0) return undefined;
  if (conditions.length === 1) return conditions[0];
  return ['all', ...conditions];
};
```

### Action 2: Create useMasjidsMap hook

Action type: included in Action 1

Description: Export a `useMasjidsMap()` hook that throws if used outside provider:

```typescript
export const useMasjidsMap = () => {
  const context = useContext(MasjidsMapContext);
  if (!context) {
    throw new Error('useMasjidsMap must be used within MasjidsMapProvider');
  }
  return context;
};
```

## Checks

- Context exports `MasjidsMapProvider` and `useMasjidsMap`
- TypeScript compiles without errors
- `buildFilterExpression` correctly generates Mapbox expressions
- Filter expression updates when activeFilters change

## Coding standards

N/A
