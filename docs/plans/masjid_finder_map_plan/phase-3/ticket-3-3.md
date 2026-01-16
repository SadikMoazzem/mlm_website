# Ticket 3: Create useGeolocation hook and GPS button

Complexity level: medium

Create a hook for browser geolocation and a GPS button component that centers the map on the user's location.

## Actions

### Action 1: Create useGeolocation hook

Action type: create file

Path: `src/app/masjids/finder/hooks/useGeolocation.ts`

Description: Create a hook that wraps the browser Geolocation API:

```typescript
'use client';

import { useState, useCallback } from 'react';
import { Coordinates } from '../types';

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
  permission: 'granted' | 'denied' | 'prompt' | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
    permission: null,
  });

  const getCurrentPosition = useCallback(async (): Promise<Coordinates | null> => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocation not supported' }));
      return null;
    }

    setState((s) => ({ ...s, isLoading: true, error: null }));

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setState({
            coordinates: coords,
            error: null,
            isLoading: false,
            permission: 'granted',
          });
          resolve(coords);
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          let permission: 'denied' | 'prompt' = 'prompt';

          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location permission denied';
            permission = 'denied';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = 'Location unavailable';
          } else if (error.code === error.TIMEOUT) {
            errorMessage = 'Location request timed out';
          }

          setState({
            coordinates: null,
            error: errorMessage,
            isLoading: false,
            permission,
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000, // Cache for 1 minute
        }
      );
    });
  }, []);

  return {
    ...state,
    getCurrentPosition,
  };
}
```

### Action 2: Create GPSButton component

Action type: create file

Path: `src/app/masjids/finder/components/GPSButton.tsx`

Description: Create a floating GPS button that triggers geolocation:

```tsx
'use client';

import { Navigation, Loader2 } from 'lucide-react';

interface GPSButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export default function GPSButton({ onClick, isLoading, className }: GPSButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200
        flex items-center justify-center
        hover:bg-gray-50 active:bg-gray-100
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
        ${className}
      `}
      aria-label="Center on my location"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
      ) : (
        <Navigation className="w-5 h-5 text-emerald-600" />
      )}
    </button>
  );
}
```

**Positioning:** The button should be positioned absolute, bottom-right of the map, above the list panel when collapsed.

## Checks

- Hook returns coordinates on success
- Hook handles permission denied gracefully
- Hook handles geolocation errors
- GPS button shows loading state while fetching
- Button is accessible with proper ARIA label
- Button styling matches map UI

## Coding standards

N/A
