'use client';

import { ArrowLeft, Trash2, Check, CalendarDays, CalendarRange, Calendar } from 'lucide-react';
import Image from 'next/image';

import { CapturedImage, ImagePeriod } from '@/hooks/usePrayerTimesImageFlow';

interface ImageDetailStepProps {
  image: CapturedImage;
  onChangePeriod: (period: ImagePeriod) => void;
  onRemove: () => void;
  onBack: () => void;
}

interface PeriodOption {
  value: ImagePeriod;
  label: string;
  icon: typeof CalendarDays;
}

const PERIOD_OPTIONS: PeriodOption[] = [
  { value: 'month', label: 'Full Month', icon: CalendarDays },
  { value: 'week', label: 'Week', icon: CalendarRange },
  { value: 'day', label: 'Single Day', icon: Calendar },
];

export default function ImageDetailStep({
  image,
  onChangePeriod,
  onRemove,
  onBack,
}: ImageDetailStepProps) {
  const { validation, period } = image;
  const isReady = validation?.isValid && period !== null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="font-semibold text-gray-900">Image Details</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-48">
        {/* Large Image Preview */}
        <div className="relative w-full mb-6">
          <div className="relative aspect-[3/4] max-h-[50vh] w-full rounded-xl overflow-hidden bg-gray-200 shadow-md">
            <Image
              src={image.previewUrl}
              alt="Prayer timetable"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />

            {/* Status badge */}
            <div
              className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-sm font-medium ${
                isReady
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 text-yellow-900'
              }`}
            >
              {isReady ? 'Ready' : 'Needs Period'}
            </div>
          </div>
        </div>

        {/* Detection Results Card */}
        {validation?.isValid && (
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Detection Results</h3>
            <div className="flex gap-4 text-sm text-gray-600 mb-2">
              <span>{validation.detectedPrayers.length} prayers</span>
              <span>•</span>
              <span>{validation.detectedTimes.length} times</span>
              <span>•</span>
              <span>{validation.confidence}% confidence</span>
            </div>
            {validation.detectedPrayers.length > 0 && (
              <p className="text-sm text-gray-500">
                {validation.detectedPrayers.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Period Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Period</h3>
          <div className="space-y-2">
            {PERIOD_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = period === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => onChangePeriod(option.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="w-full py-3 rounded-xl border-2 border-red-500 text-red-500 font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
          Remove Image
        </button>

        {/* Done Button */}
        <button
          onClick={onBack}
          className="w-full py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-5 h-5" />
          Done
        </button>
      </div>
    </div>
  );
}
