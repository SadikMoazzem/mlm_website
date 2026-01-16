'use client';

import React from 'react';
import { Car, Users, X } from 'lucide-react';
import { useFinderStore, useHasActiveFilters } from '../store/useFinderStore';

interface FilterChip {
  key: 'womensArea' | 'parking';
  label: string;
  icon: React.ElementType;
  activeColor: string;
}

const filterChips: FilterChip[] = [
  {
    key: 'womensArea',
    label: "Women's",
    icon: Users,
    activeColor: 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
  },
  {
    key: 'parking',
    label: 'Parking',
    icon: Car,
    activeColor: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  },
];

/**
 * FilterChips Component
 *
 * Horizontal scrollable list of filter chips for quick filtering.
 * Focuses on the most common filters: Women's Area and Parking.
 */
export function FilterChips() {
  const filters = useFinderStore((state) => state.filters);
  const toggleFilter = useFinderStore((state) => state.toggleFilter);
  const clearFilters = useFinderStore((state) => state.clearFilters);
  const hasActiveFilters = useHasActiveFilters();

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {filterChips.map((chip) => {
        const isActive = filters[chip.key];
        const Icon = chip.icon;

        return (
          <button
            key={chip.key}
            onClick={() => toggleFilter(chip.key)}
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? chip.activeColor
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {chip.label}
            {isActive && <X className="h-3 w-3 ml-0.5" />}
          </button>
        );
      })}

      {/* Clear all filters button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

export default FilterChips;
