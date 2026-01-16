'use client';

import React, { useMemo } from 'react';
import { ChevronUp, ChevronDown, MapIcon } from 'lucide-react';
import { MasjidCard } from './MasjidCard';
import { useFinderStore } from '../store/useFinderStore';
import type { Coordinates, MasjidFeature } from '../types';

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
 * MasjidListPanel Component
 *
 * Bottom panel showing list of visible masjids.
 * Can be collapsed or expanded.
 */
export function MasjidListPanel() {
  const visibleMasjids = useFinderStore((state) => state.visibleMasjids);
  const selectedMasjidId = useFinderStore((state) => state.selectedMasjidId);
  const center = useFinderStore((state) => state.center);
  const searchedLocation = useFinderStore((state) => state.searchedLocation);
  const isListExpanded = useFinderStore((state) => state.isListExpanded);
  const setListExpanded = useFinderStore((state) => state.setListExpanded);
  const setSelectedMasjidId = useFinderStore((state) => state.setSelectedMasjidId);

  // Sort masjids by distance from reference point (searched location or map center)
  const sortedMasjids = useMemo(() => {
    const refPoint = searchedLocation?.coordinates || center;

    return [...visibleMasjids]
      .map((masjid) => ({
        ...masjid,
        distance: calculateDistance(refPoint, masjid.coordinates),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [visibleMasjids, center, searchedLocation]);

  const handleToggle = () => {
    setListExpanded(!isListExpanded);
  };

  const handleMasjidClick = (masjid: MasjidFeature) => {
    setSelectedMasjidId(masjid.id);
  };

  // Don't render if no masjids
  if (sortedMasjids.length === 0) {
    return null;
  }

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out ${
        isListExpanded ? 'h-[60vh]' : 'h-auto'
      }`}
    >
      {/* Panel Container */}
      <div className="h-full rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Handle Bar */}
        <button
          onClick={handleToggle}
          className="flex w-full items-center justify-center py-3 focus:outline-none"
        >
          <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 pb-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <MapIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {sortedMasjids.length} masjid{sortedMasjids.length !== 1 ? 's' : ''} nearby
            </span>
          </div>
          <button
            onClick={handleToggle}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isListExpanded ? (
              <>
                <ChevronDown className="h-4 w-4" />
                Collapse
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4" />
                Expand
              </>
            )}
          </button>
        </div>

        {/* List Content */}
        <div
          className={`overflow-y-auto px-4 py-3 ${
            isListExpanded ? 'h-[calc(60vh-80px)]' : 'max-h-[200px]'
          }`}
        >
          <div className="space-y-3">
            {sortedMasjids.slice(0, isListExpanded ? undefined : 3).map((masjid) => (
              <MasjidCard
                key={masjid.id}
                masjid={masjid}
                isSelected={masjid.id === selectedMasjidId}
                onClick={() => handleMasjidClick(masjid)}
                distance={masjid.distance}
              />
            ))}

            {/* Show more indicator when collapsed */}
            {!isListExpanded && sortedMasjids.length > 3 && (
              <button
                onClick={() => setListExpanded(true)}
                className="w-full py-2 text-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View {sortedMasjids.length - 3} more masjids
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasjidListPanel;
