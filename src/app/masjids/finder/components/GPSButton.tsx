'use client';

import React, { useState, useCallback } from 'react';
import { Navigation, Loader2 } from 'lucide-react';
import { useFinderStore } from '../store/useFinderStore';

/**
 * GPSButton Component
 *
 * Floating button that gets the user's current location
 * and centers the map on it.
 */
export function GPSButton() {
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSearchedLocation = useFinderStore((state) => state.setSearchedLocation);

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSearchedLocation({
          name: 'Current Location',
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        setIsLocating(false);
      },
      (err) => {
        console.error('[GPSButton] Geolocation error:', err);
        setIsLocating(false);

        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location permission denied');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location unavailable');
            break;
          case err.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('Unable to get location');
        }

        // Clear error after 3 seconds
        setTimeout(() => setError(null), 3000);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [setSearchedLocation]);

  return (
    <div className="relative">
      <button
        onClick={handleGetLocation}
        disabled={isLocating}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 transition-all hover:bg-gray-50 hover:shadow-xl disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        aria-label="Use my current location"
      >
        {isLocating ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Navigation className="h-5 w-5" />
        )}
      </button>

      {/* Error tooltip */}
      {error && (
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {error}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-red-600" />
        </div>
      )}
    </div>
  );
}

export default GPSButton;
