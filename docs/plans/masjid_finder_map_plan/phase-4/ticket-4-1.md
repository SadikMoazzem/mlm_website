# Ticket 1: Create FilterChips component

Complexity level: medium

Create the horizontal scrolling filter chips container with toggle and dropdown chips.

## Actions

### Action 1: Create FilterChips container component

Action type: create file

Path: `src/app/masjids/finder/components/FilterChips.tsx`

Description: Create a horizontally scrollable container for filter chips:

```tsx
'use client';

import { X } from 'lucide-react';
import { ActiveFilters } from '../types';
import FilterToggleChip from './FilterToggleChip';
import FilterDropdownChip from './FilterDropdownChip';

interface FilterChipsProps {
  filters: ActiveFilters;
  onFilterChange: (key: keyof ActiveFilters, value: any) => void;
  onClearAll: () => void;
  visibleCount: number;
}

export default function FilterChips({
  filters,
  onFilterChange,
  onClearAll,
  visibleCount,
}: FilterChipsProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
      {/* Visible count badge */}
      <div className="flex-shrink-0 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
        {visibleCount} masjids
      </div>

      {/* Toggle chips */}
      <FilterToggleChip
        label="Women's Area"
        icon="👩"
        isActive={filters.womensArea || false}
        onChange={(active) => onFilterChange('womensArea', active)}
      />

      <FilterToggleChip
        label="Parking"
        icon="🅿️"
        isActive={filters.parking || false}
        onChange={(active) => onFilterChange('parking', active)}
      />

      {/* Dropdown chips */}
      <FilterDropdownChip
        label="Madhab"
        value={filters.madhab}
        options={[
          { value: '', label: 'All' },
          { value: 'hanafi', label: 'Hanafi' },
          { value: 'shafi', label: 'Shafi' },
        ]}
        onChange={(value) => onFilterChange('madhab', value || undefined)}
      />

      <FilterDropdownChip
        label="Type"
        value={filters.type}
        options={[
          { value: '', label: 'All' },
          { value: 'masjid', label: 'Masjid' },
          { value: 'hall', label: 'Hall' },
        ]}
        onChange={(value) => onFilterChange('type', value || undefined)}
      />

      {/* Clear all button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm transition-colors"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}
```

### Action 2: Create FilterToggleChip component

Action type: create file

Path: `src/app/masjids/finder/components/FilterToggleChip.tsx`

Description: Create a toggle chip component:

```tsx
'use client';

interface FilterToggleChipProps {
  label: string;
  icon?: string;
  isActive: boolean;
  onChange: (active: boolean) => void;
}

export default function FilterToggleChip({
  label,
  icon,
  isActive,
  onChange,
}: FilterToggleChipProps) {
  return (
    <button
      onClick={() => onChange(!isActive)}
      className={`
        flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        transition-colors border
        ${isActive
          ? 'bg-emerald-600 text-white border-emerald-600'
          : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
        }
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
```

## Checks

- Chips render horizontally with scroll
- Toggle chips change appearance when active
- Clear button only shows when filters are active
- Visible count updates correctly
- Horizontal scroll works on mobile

## Coding standards

N/A
