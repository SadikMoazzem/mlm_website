'use client';

import { Loader2 } from 'lucide-react';

interface SubmittingStepProps {
  progress: { current: number; total: number };
}

export default function SubmittingStep({ progress }: SubmittingStepProps) {
  const { current, total } = progress;
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full mx-auto text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Submitting...</h2>

        {/* Progress text */}
        <p className="text-gray-600 mb-4">
          Uploading image {current} of {total}
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-gray-200 mb-4 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Warning text */}
        <p className="text-gray-400 text-sm">
          Please don&apos;t close this page
        </p>
      </div>
    </div>
  );
}
