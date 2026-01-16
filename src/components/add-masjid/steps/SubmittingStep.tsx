'use client';

import React from 'react';

/**
 * SubmittingStep Component
 *
 * Displays a loading state whilst submitting the masjid/hall data.
 * Shows an animated spinner and a message to indicate progress.
 */
export default function SubmittingStep() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Animated Spinner */}
      <div className="relative w-20 h-20 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary-200 rounded-full" />

        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin" />

        {/* Inner pulse */}
        <div className="absolute inset-3 bg-primary-100 rounded-full animate-pulse" />
      </div>

      {/* Loading Message */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Submitting your masjid...
      </h3>

      <p className="text-gray-600 text-center max-w-sm">
        Please wait whilst we process your submission.
      </p>
    </div>
  );
}
