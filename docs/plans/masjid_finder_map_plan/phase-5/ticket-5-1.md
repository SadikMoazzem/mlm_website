# Ticket 1: Create MasjidListCard component

Complexity level: medium

Create a compact card component for displaying masjids in the list view.

## Actions

### Action 1: Create MasjidListCard component

Action type: create file

Path: `src/app/masjids/finder/components/MasjidListCard.tsx`

Description: Create a compact list card for masjids:

```tsx
'use client';

import { MapPin } from 'lucide-react';
import { MasjidFeature, Coordinates } from '../types';
import { formatDistance, getDistanceKm } from '../utils/geo';

interface MasjidListCardProps {
  masjid: MasjidFeature;
  center: Coordinates | null;
  isSelected?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const typeLabels: Record<string, string> = {
  masjid: 'Masjid',
  hall: 'Hall',
  musalla: 'Musalla',
  community_center: 'Community Center',
};

const typeColors: Record<string, string> = {
  masjid: 'bg-emerald-100 text-emerald-700',
  hall: 'bg-blue-100 text-blue-700',
  musalla: 'bg-purple-100 text-purple-700',
  community_center: 'bg-orange-100 text-orange-700',
};

export default function MasjidListCard({
  masjid,
  center,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: MasjidListCardProps) {
  const distance = center ? getDistanceKm(center, masjid.coordinates) : null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        w-full p-3 text-left rounded-xl transition-all
        ${isSelected
          ? 'bg-emerald-50 border-2 border-emerald-500'
          : 'bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="font-semibold text-gray-900 truncate">
            {masjid.name}
          </h3>

          {/* Address */}
          {(masjid.address || masjid.city) && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {masjid.address || masjid.city}
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[masjid.type] || typeColors.masjid}`}>
              {typeLabels[masjid.type] || 'Masjid'}
            </span>

            {masjid.madhab && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                {masjid.madhab.charAt(0).toUpperCase() + masjid.madhab.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Distance */}
        {distance !== null && (
          <div className="flex-shrink-0 text-right">
            <span className="text-sm font-medium text-emerald-600">
              {formatDistance(distance)}
            </span>
          </div>
        )}
      </div>

      {/* Facilities indicators */}
      {(masjid.has_women_area || masjid.has_parking) && (
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          {masjid.has_women_area && <span>👩 Women's Area</span>}
          {masjid.has_parking && <span>🅿️ Parking</span>}
        </div>
      )}
    </button>
  );
}
```

## Checks

- Card renders with all masjid info
- Distance displays correctly
- Type badge shows correct color
- Hover state looks good
- Selected state is visually distinct
- Card is clickable and accessible

## Coding standards

N/A
