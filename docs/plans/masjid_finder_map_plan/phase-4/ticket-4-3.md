# Ticket 3: Integrate filters with context and map

Complexity level: medium

Connect the filter components to the context and ensure the map updates when filters change.

## Actions

### Action 1: Update MasjidsMapContext with filter actions

Action type: edit file

Path: `src/app/masjids/finder/context/MasjidsMapContext.tsx`

Description: Ensure the context has proper filter actions:
- `setFilter(key, value)`: Update a single filter
- `clearFilters()`: Reset all filters to undefined
- `filterExpression`: Computed Mapbox expression from activeFilters

Verify `buildFilterExpression` handles all filter types correctly.

### Action 2: Add FilterChips to MapHeader

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Update the page to include FilterChips in the MapHeader:

```tsx
function FinderContent() {
  // ... existing code ...

  const {
    // ... existing destructuring ...
    activeFilters,
    visibleCount,
    setFilter,
    clearFilters,
  } = useMasjidsMap();

  // ... handlers ...

  return (
    <div className="h-full w-full relative">
      <MapHeader
        searchValue={searchedLocation?.name}
        onSearchClick={() => setIsSearchOpen(true)}
      >
        <FilterChips
          filters={activeFilters}
          onFilterChange={setFilter}
          onClearAll={clearFilters}
          visibleCount={visibleCount}
        />
      </MapHeader>

      {/* ... rest of content ... */}
    </div>
  );
}
```

### Action 3: Update MasjidFinderMap to apply filters

Action type: edit file

Path: `src/app/masjids/finder/components/MasjidFinderMap.tsx`

Description: Ensure the map component applies the filter expression to layers when it changes:

```typescript
// In map initialization, after adding layers
useEffect(() => {
  const map = mapRef.current;
  if (!map || !map.isStyleLoaded()) return;

  // Get combined filter for each layer
  const hallFilter = filterExpression
    ? ['all', ['==', ['get', 'type'], 'hall'], filterExpression]
    : ['==', ['get', 'type'], 'hall'];

  const masjidFilter = filterExpression
    ? ['all', ['!=', ['get', 'type'], 'hall'], filterExpression]
    : ['!=', ['get', 'type'], 'hall'];

  // Apply to layers
  if (map.getLayer(LAYER_IDS.POINTS)) {
    map.setFilter(LAYER_IDS.POINTS, hallFilter);
  }
  if (map.getLayer(LAYER_IDS.SYMBOLS)) {
    map.setFilter(LAYER_IDS.SYMBOLS, masjidFilter);
  }
  if (map.getLayer(LAYER_IDS.LABELS)) {
    map.setFilter(LAYER_IDS.LABELS, hallFilter);
  }
}, [filterExpression]);
```

### Action 4: Refresh visible masjids when filters change

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Add effect to refresh visible masjids when filters change:

```typescript
// In FinderContent component
useEffect(() => {
  // Trigger a refresh of visible masjids when filters change
  // The map will update automatically, but we need to re-query features
  if (mapRef.current) {
    // Small delay to let map apply filters
    setTimeout(() => {
      // Call the refresh function from useVisibleMasjids
    }, 100);
  }
}, [filterExpression]);
```

## Checks

- Filter chips appear in header below search
- Clicking a toggle chip updates context and map
- Selecting dropdown option updates context and map
- Markers are filtered correctly on map
- Visible masjids count updates after filtering
- Clear all button resets filters
- Filters persist during map panning

## Coding standards

N/A
