'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Props for the MapErrorBoundary component
 */
interface MapErrorBoundaryProps {
  children: ReactNode;
}

/**
 * State for the MapErrorBoundary component
 */
interface MapErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component for the map
 *
 * Catches errors during map initialization or rendering and displays
 * a fallback UI with retry option.
 */
export class MapErrorBoundary extends Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): MapErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console for debugging
    console.error('Map error boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    // Reset error state to retry rendering the map
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="w-full h-full flex items-center justify-center bg-red-50 dark:bg-red-900/10"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center px-6 py-8 max-w-md">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Map failed to load
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              There was a problem loading the map. This could be due to a network issue or browser compatibility.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              type="button"
              onClick={this.handleRetry}
              className="
                inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                bg-primary-500 text-white font-medium
                hover:bg-primary-600 active:bg-primary-700
                transition-colors duration-200
              "
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try again</span>
            </button>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              You can continue without the map, but location selection will be limited.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;
