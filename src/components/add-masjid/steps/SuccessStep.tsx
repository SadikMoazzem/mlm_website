'use client';

import React from 'react';
import { Check, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SuccessStepProps {
  /**
   * Callback to add another masjid
   */
  onAddAnother: () => void;
}

/**
 * SuccessStep Component
 *
 * Displays a success message after the masjid/hall submission is complete.
 * Shows what happens next and provides options to add another or return home.
 */
export default function SuccessStep({ onAddAnother }: SuccessStepProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Success Icon */}
      <div className="relative mb-6">
        {/* Background circle with gradient */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
        </div>

        {/* Animated ring */}
        <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping" />
      </div>

      {/* Thank You Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Thank you!
      </h2>

      {/* Confirmation Message */}
      <p className="text-lg text-gray-700 mb-4 max-w-md">
        We&apos;ll review your submission and add it to the map soon.
      </p>

      {/* What Happens Next Section */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8 max-w-lg w-full text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <svg
            className="w-5 h-5 text-primary-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          What happens next?
        </h3>

        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 mt-0.5">1.</span>
            <span>Our team will review your submission for accuracy</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 mt-0.5">2.</span>
            <span>We&apos;ll verify the location and details you provided</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 mt-0.5">3.</span>
            <span>Once approved, the masjid will appear on the map</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 mt-0.5">4.</span>
            <span>This usually takes 1-2 business days</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={onAddAnother}
          className="flex-1 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
        >
          Add Another
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex-1 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
