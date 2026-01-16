'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Car, Users, Navigation, ChevronRight } from 'lucide-react';
import type { MasjidFeature } from '../types';

interface MasjidCardProps {
  masjid: MasjidFeature;
  isSelected?: boolean;
  onClick?: () => void;
  distance?: number; // in km
}

/**
 * MasjidCard Component
 *
 * Compact card showing masjid info with facilities and quick actions.
 */
export function MasjidCard({ masjid, isSelected, onClick, distance }: MasjidCardProps) {
  const formatDistance = (km: number) => {
    if (km < 1) {
      return `${Math.round(km * 1000)}m`;
    }
    return `${km.toFixed(1)} km`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'masjid':
        return 'Masjid';
      case 'hall':
        return 'Prayer Hall';
      case 'musalla':
        return 'Musalla';
      case 'community_center':
        return 'Community Centre';
      default:
        return 'Masjid';
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${masjid.coordinates.latitude},${masjid.coordinates.longitude}`;
    window.open(url, '_blank');
  };

  // Generate slug from masjid name
  const slug = masjid.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border p-4 transition-all ${
        isSelected
          ? 'border-primary-500 bg-primary-50 shadow-md dark:border-primary-400 dark:bg-primary-900/20'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
      }`}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            {masjid.name}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {distance !== undefined ? formatDistance(distance) : masjid.city || 'UK'}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span>{getTypeLabel(masjid.type)}</span>
          </div>
        </div>

        {/* View Details Link */}
        <Link
          href={`/masjid/${masjid.id}/${slug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Facilities Row */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {masjid.has_women_area && (
          <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
            <Users className="h-2.5 w-2.5" />
            Women&apos;s Area
          </span>
        )}
        {masjid.has_parking && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <Car className="h-2.5 w-2.5" />
            Parking
          </span>
        )}
        {masjid.madhab && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            {masjid.madhab.charAt(0).toUpperCase() + masjid.madhab.slice(1)}
          </span>
        )}
      </div>

      {/* Actions Row */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleDirections}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700"
        >
          <Navigation className="h-3 w-3" />
          Directions
        </button>
        <Link
          href={`/masjid/${masjid.id}/${slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MasjidCard;
