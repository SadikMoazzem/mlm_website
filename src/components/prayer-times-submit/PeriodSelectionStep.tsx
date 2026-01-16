'use client';

import { CalendarDays, CalendarRange, Calendar, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

import { CapturedImage, ImagePeriod } from '@/hooks/usePrayerTimesImageFlow';

interface PeriodSelectionStepProps {
  image: CapturedImage;
  onSelectPeriod: (period: ImagePeriod) => void;
}

interface PeriodOption {
  value: ImagePeriod;
  label: string;
  description: string;
  icon: typeof CalendarDays;
}

const PERIOD_OPTIONS: PeriodOption[] = [
  {
    value: 'month',
    label: 'Full Month',
    description: 'Covers an entire month of prayer times',
    icon: CalendarDays,
  },
  {
    value: 'week',
    label: 'Week',
    description: 'Covers about 7 days of prayer times',
    icon: CalendarRange,
  },
  {
    value: 'day',
    label: 'Single Day',
    description: 'Covers just one day of prayer times',
    icon: Calendar,
  },
];

export function PeriodSelectionStep({ image, onSelectPeriod }: PeriodSelectionStepProps) {
  const validation = image.validation;

  return (
    <div className="flex min-h-screen flex-col bg-secondary-100 px-4 py-6 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        {/* Success Banner */}
        {validation?.isValid && (
          <div className="overflow-hidden rounded-xl bg-green-50 p-4 shadow-sm dark:bg-green-900/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
              <div className="flex-1">
                <p className="font-semibold text-green-900 dark:text-green-100">
                  Detected! Found {validation.detectedPrayers.length} prayers,{' '}
                  {validation.detectedTimes.length} times
                </p>
                {validation.message && (
                  <p className="mt-1 text-sm text-green-800 dark:text-green-200">
                    {validation.message}
                  </p>
                )}
              </div>
              {/* Small Thumbnail */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 border-green-200 dark:border-green-700">
                <Image
                  src={image.previewUrl}
                  alt="Timetable preview"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            What period does this timetable cover?
          </h2>
        </div>

        {/* Period Options */}
        <div className="space-y-4">
          {PERIOD_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => onSelectPeriod(option.value)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-primary-500 hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400"
                style={{ minHeight: '60px' }}
                type="button"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-500 dark:bg-primary-900/30 dark:text-primary-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
