'use client';

import { Check, Plus, Mail } from 'lucide-react';
import Image from 'next/image';

import { CapturedImage, ImagePeriod } from '@/hooks/usePrayerTimesImageFlow';

interface ReviewStepProps {
  images: CapturedImage[];
  maxImages: number;
  canSubmit: boolean;
  contactEmail: string;
  onImageTap: (imageId: string) => void;
  onAddAnother: () => void;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
}

const PERIOD_LABELS: Record<ImagePeriod, string> = {
  month: 'Month',
  week: 'Week',
  day: 'Day',
};

export default function ReviewStep({
  images,
  maxImages,
  canSubmit,
  contactEmail,
  onImageTap,
  onAddAnother,
  onEmailChange,
  onSubmit,
}: ReviewStepProps) {
  const canAddMore = images.length < maxImages;

  // Handle empty state
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-gray-500 mb-4">No images added yet</p>
        <button
          onClick={onAddAnother}
          className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-xl font-medium transition-colors"
        >
          Add an Image
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[70vh]">
      {/* Header */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Your Images ({images.length}/{maxImages})
        </h2>
        <p className="text-sm text-gray-500">Tap an image to edit</p>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onImageTap(image.id)}
              className="relative rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {/* Image thumbnail */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.previewUrl}
                  alt={`Prayer timetable ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                />

                {/* Number badge - top left */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-900/70 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">{index + 1}</span>
                </div>

                {/* Valid checkmark - top right */}
                {image.validation?.isValid && image.period && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Info below image */}
              <div className="p-2 bg-white">
                <p className="text-sm font-medium text-gray-900">
                  {image.period ? PERIOD_LABELS[image.period] : 'Select period'}
                </p>
                {image.validation?.isValid && (
                  <p className="text-xs text-gray-500">
                    {image.validation.detectedPrayers.length} prayers found
                  </p>
                )}
              </div>
            </button>
          ))}

          {/* Add more card */}
          {canAddMore && (
            <button
              onClick={onAddAnother}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-500 bg-gray-50 hover:bg-primary-50 flex flex-col items-center justify-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Plus className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Add Image</span>
            </button>
          )}
        </div>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1.5" />
            Email for follow-up (optional)
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
            canSubmit
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Check className="w-5 h-5" />
          Submit {images.length} {images.length === 1 ? 'Image' : 'Images'}
        </button>
        {!canSubmit && images.length > 0 && (
          <p className="text-center text-sm text-gray-500 mt-2">
            All images need a period selected
          </p>
        )}
      </div>
    </div>
  );
}
