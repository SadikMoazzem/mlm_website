# Ticket 4: Create MasjidDetailCard with prayer times

Complexity level: high

Create a detail card that appears when a masjid is selected, showing full information and fetching prayer times.

## Actions

### Action 1: Create useMasjidPrayerTimes hook

Action type: create file

Path: `src/app/masjids/finder/hooks/useMasjidPrayerTimes.ts`

Description: Create a hook to fetch prayer times for a selected masjid:

```typescript
'use client';

import { useState, useEffect } from 'react';

interface PrayerTimes {
  fajr_jammat: string;
  dhuhr_jammat: string;
  asr_jammat: string;
  maghrib_jammat: string;
  isha_jammat: string;
  // Add start times if available
  fajr_start?: string;
  dhuhr_start?: string;
  asr_start?: string;
  maghrib_start?: string;
  isha_start?: string;
}

interface UseMasjidPrayerTimesResult {
  prayerTimes: PrayerTimes | null;
  isLoading: boolean;
  error: string | null;
}

export function useMasjidPrayerTimes(masjidId: string | null): UseMasjidPrayerTimesResult {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!masjidId) {
      setPrayerTimes(null);
      return;
    }

    const fetchPrayerTimes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        const response = await fetch(
          `/api/masjid/${masjidId}/prayer-times?date=${today}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        setPrayerTimes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load prayer times');
        setPrayerTimes(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [masjidId]);

  return { prayerTimes, isLoading, error };
}
```

### Action 2: Create MasjidDetailCard component

Action type: create file

Path: `src/app/masjids/finder/components/MasjidDetailCard.tsx`

Description: Create a detail card with prayer times and actions:

```tsx
'use client';

import { X, Navigation, ExternalLink, Share2, Loader2 } from 'lucide-react';
import { MasjidFeature, Coordinates } from '../types';
import { formatDistance, getDistanceKm } from '../utils/geo';
import { useMasjidPrayerTimes } from '../hooks/useMasjidPrayerTimes';

interface MasjidDetailCardProps {
  masjid: MasjidFeature;
  center: Coordinates | null;
  onClose: () => void;
}

export default function MasjidDetailCard({
  masjid,
  center,
  onClose,
}: MasjidDetailCardProps) {
  const { prayerTimes, isLoading, error } = useMasjidPrayerTimes(masjid.id);
  const distance = center ? getDistanceKm(center, masjid.coordinates) : null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${masjid.coordinates.latitude},${masjid.coordinates.longitude}`;
    window.open(url, '_blank');
  };

  const handleViewPage = () => {
    // Navigate to full masjid page
    window.open(`/masjid/${masjid.id}/${encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))}`, '_blank');
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/masjids/finder?masjid=${masjid.id}`;
    if (navigator.share) {
      await navigator.share({ title: masjid.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      // Could show a toast here
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-lg font-semibold text-gray-900">{masjid.name}</h3>
            {(masjid.address || masjid.city) && (
              <p className="text-sm text-gray-500 mt-1">{masjid.address || masjid.city}</p>
            )}
            {distance !== null && (
              <p className="text-sm font-medium text-emerald-600 mt-1">
                {formatDistance(distance)} away
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prayer Times */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Today's Prayer Times</h4>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
          </div>
        ) : error ? (
          <p className="text-sm text-gray-500 text-center py-2">
            Prayer times unavailable
          </p>
        ) : prayerTimes ? (
          <div className="grid grid-cols-5 gap-2 text-center">
            {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => {
              const key = `${prayer.toLowerCase()}_jammat` as keyof typeof prayerTimes;
              return (
                <div key={prayer}>
                  <p className="text-xs text-gray-500">{prayer}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {prayerTimes[key] || '-'}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-2">
            No prayer times available
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 flex gap-2">
        <button
          onClick={handleDirections}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Directions
        </button>
        <button
          onClick={handleViewPage}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

## Checks

- Card displays masjid information
- Prayer times fetch on selection
- Loading state shows while fetching
- Error state handles failures gracefully
- Directions button opens Google Maps
- View Page button opens masjid page
- Share button copies link or triggers native share
- Close button dismisses card

## Coding standards

N/A
