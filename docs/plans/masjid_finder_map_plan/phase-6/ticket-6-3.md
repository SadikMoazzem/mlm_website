# Ticket 3: Add loading states and error handling

Complexity level: medium

Add comprehensive loading states, error boundaries, and graceful error handling throughout the finder feature.

## Actions

### Action 1: Create MapErrorBoundary component

Action type: create file

Path: `src/app/masjids/finder/components/MapErrorBoundary.tsx`

Description: Create an error boundary for the map component:

```tsx
'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map error:', error, errorInfo);
    // Could send to error tracking service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 max-w-md">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Map failed to load
            </h2>
            <p className="text-gray-600 mb-6">
              There was a problem loading the map. This might be due to a network issue or browser compatibility.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Action 2: Add loading states to components

Action type: edit multiple files

Description: Add loading states and skeletons:

**MasjidSidePanel loading state:**
```tsx
{isLoading && (
  <div className="space-y-2 p-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
    ))}
  </div>
)}
```

**MapHeader loading state for count:**
```tsx
{isLoading ? (
  <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
) : (
  <div className="...">
    {visibleCount} masjids
  </div>
)}
```

### Action 3: Handle geolocation errors gracefully

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Show user-friendly messages for geolocation errors:

```tsx
const handleGPSClick = async () => {
  const coords = await getCurrentPosition();
  if (coords) {
    setCenter(coords);
    clearSearchedLocation();
  } else if (permission === 'denied') {
    // Show toast or inline message
    setLocationError('Location access denied. Please enable location in your browser settings.');
  }
};

// Show error banner if location is denied
{locationError && (
  <div className="absolute top-20 left-4 right-4 z-20 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
    <p className="text-sm text-amber-700">{locationError}</p>
    <button onClick={() => setLocationError(null)} className="ml-auto">
      <X className="w-4 h-4" />
    </button>
  </div>
)}
```

### Action 4: Wrap map with error boundary

Action type: edit file

Path: `src/app/masjids/finder/page.tsx`

Description: Wrap the dynamically imported map with error boundary:

```tsx
<MapErrorBoundary>
  <MasjidFinderMap ... />
</MapErrorBoundary>
```

## Checks

- Map error shows friendly message with retry button
- Loading skeletons appear while data loads
- Geolocation denial shows helpful message
- Network errors are handled gracefully
- Error boundary catches and reports errors
- User can recover from error states

## Coding standards

N/A
