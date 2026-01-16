'use client';

import { useEffect, useState } from 'react';
import { Check, ArrowRight, Plus } from 'lucide-react';

interface SuccessStepProps {
  imageCount: number;
  masjidName: string;
  onDismiss: () => void;
  onSubmitMore: () => void;
}

export default function SuccessStep({
  imageCount,
  masjidName,
  onDismiss,
  onSubmitMore,
}: SuccessStepProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Checkmark Circle */}
        <div
          className={`w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
            isAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <Check className="w-16 h-16 text-green-500" strokeWidth={3} />
        </div>

        {/* Title */}
        <h1
          className={`text-2xl font-bold text-gray-900 mb-4 transition-all duration-500 delay-200 ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          JazakAllah Khair!
        </h1>

        {/* Message */}
        <p
          className={`text-gray-600 mb-2 transition-all duration-500 delay-300 ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Your {imageCount} prayer timetable {imageCount === 1 ? 'image has' : 'images have'} been
          submitted for review.
        </p>

        <p
          className={`text-gray-500 text-sm mb-8 transition-all duration-500 delay-400 ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          Our team will verify the data and update {masjidName}&apos;s prayer times shortly.
        </p>

        {/* Buttons */}
        <div
          className={`space-y-3 transition-all duration-500 delay-500 ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {/* Primary Button */}
          <button
            onClick={onDismiss}
            className="w-full py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            Back to Masjid
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={onSubmitMore}
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Submit More
          </button>
        </div>
      </div>
    </div>
  );
}
