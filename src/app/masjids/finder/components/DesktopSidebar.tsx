'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapIcon } from 'lucide-react';
import { LocationSearch } from './LocationSearch';
import { FilterChips } from './FilterChips';
import { MasjidCard } from './MasjidCard';
import { useFinderStore } from '../store/useFinderStore';
import type { Coordinates, MasjidFeature } from '../types';

interface DesktopSidebarProps {
  onMasjidSelect: (masjid: MasjidFeature) => void;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 */
function calculateDistance(from: Coordinates, to: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * DesktopSidebar Component
 *
 * Left sidebar for desktop view containing:
 * - Back button and title
 * - Location search
 * - Filter chips
 * - Scrollable masjid list
 */
export function DesktopSidebar({ onMasjidSelect }: DesktopSidebarProps) {
  const visibleMasjids = useFinderStore((state) => state.visibleMasjids);
  const selectedMasjidId = useFinderStore((state) => state.selectedMasjidId);
  const center = useFinderStore((state) => state.center);
  const searchedLocation = useFinderStore((state) => state.searchedLocation);

  // Sort masjids by distance from reference point
  const sortedMasjids = useMemo(() => {
    const refPoint = searchedLocation?.coordinates || center;

    return [...visibleMasjids]
      .map((masjid) => ({
        ...masjid,
        distance: calculateDistance(refPoint, masjid.coordinates),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [visibleMasjids, center, searchedLocation]);

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-[400px] xl:w-[440px] h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800">
        {/* Back button and title */}
        <div className="flex items-center gap-3 p-4">
          <Link
            href="/masjids"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Find Masjids
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Search and explore nearby masjids
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <LocationSearch />
        </div>

        {/* Filters */}
        <div className="px-4 pb-4">
          <FilterChips />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <MapIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {sortedMasjids.length} masjid{sortedMasjids.length !== 1 ? 's' : ''} found
          </span>
        </div>
        {searchedLocation && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            near {searchedLocation.name.split(',')[0]}
          </span>
        )}
      </div>

      {/* Scrollable Masjid List */}
      <div className="flex-1 overflow-y-auto">
        {sortedMasjids.length > 0 ? (
          <div className="p-4 space-y-3">
            {sortedMasjids.map((masjid) => (
              <MasjidCard
                key={masjid.id}
                masjid={masjid}
                isSelected={masjid.id === selectedMasjidId}
                onClick={() => onMasjidSelect(masjid)}
                distance={masjid.distance}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <MapIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pan or zoom the map to find masjids in this area
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DesktopSidebar;
