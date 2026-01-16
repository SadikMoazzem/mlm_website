'use client';

import React from 'react';
import { AlertCircle, RefreshCw, Mail } from 'lucide-react';

interface ErrorStepProps {
  /**
   * The error message to display
   */
  errorMessage?: string;

  /**
   * Callback to retry the submission
   */
  onRetry: () => void;
}

/**
 * ErrorStep Component
 *
 * Displays an error message when submission fails.
 * Provides options to retry the submission or contact support.
 */
export default function ErrorStep({ errorMessage, onRetry }: ErrorStepProps) {
  const handleContactSupport = () => {
    const subject = encodeURIComponent('Add Masjid Submission Issue');
    const body = encodeURIComponent(
      `Hello,\n\nI encountered an issue whilst submitting a masjid to My Local Masjid.\n\nError: ${errorMessage || 'Unknown error'}\n\nPlease help me resolve this issue.\n\nThank you.`
    );

    window.open(`mailto:support@mylocalmasjid.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Error Icon */}
      <div className="relative mb-6">
        {/* Background circle */}
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-red-600" strokeWidth={2.5} />
        </div>
      </div>

      {/* Error Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Something went wrong
      </h2>

      {/* Error Message */}
      <p className="text-lg text-gray-700 mb-2 max-w-md">
        We couldn&apos;t submit your masjid at this time.
      </p>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-lg w-full">
          <p className="text-sm text-red-800">
            <strong>Error:</strong> {errorMessage}
          </p>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-8 max-w-md">
        Please try again, or contact support if the problem persists.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>

        <button
          type="button"
          onClick={handleContactSupport}
          className="flex-1 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Contact Support
        </button>
      </div>
    </div>
  );
}
