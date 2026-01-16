'use client';

import React, { useState } from 'react';
import { Building2, Warehouse, Check } from 'lucide-react';
import type { VenueType } from '@/types/add-masjid';

/**
 * Props for the TypeSelectionStep component
 */
export interface TypeSelectionStepProps {
  /** Currently selected venue type */
  selectedType: VenueType | null;
  /** Callback when user selects a venue type */
  onTypeSelect: (type: VenueType) => void;
}

/**
 * Step 3: Type Selection
 *
 * Allows the user to select between two venue types:
 * - Masjid: Permanent mosque/masjid
 * - Prayer Hall: Temporary prayer space (community centre, university, etc.)
 *
 * Features:
 * - Two large selection cards displayed side by side (stack on mobile)
 * - Each card shows icon, title, and description
 * - Selected state: primary color border + checkmark badge
 * - Hover state for desktop
 * - Auto-advance to next step on selection
 */
const TypeSelectionStep: React.FC<TypeSelectionStepProps> = ({
  selectedType,
  onTypeSelect,
}) => {
  const [hoveredType, setHoveredType] = useState<VenueType | null>(null);

  /**
   * Handle type selection - automatically advances to next step
   */
  const handleTypeSelect = (type: VenueType) => {
    onTypeSelect(type);
  };

  /**
   * Venue type options configuration
   */
  const venueTypes: Array<{
    type: VenueType;
    icon: typeof Building2;
    title: string;
    description: string;
  }> = [
    {
      type: 'masjid',
      icon: Building2,
      title: 'Masjid',
      description: 'A permanent mosque or masjid with regular prayer facilities',
    },
    {
      type: 'hall',
      icon: Warehouse,
      title: 'Prayer Hall',
      description: 'A temporary prayer space like a community centre, university, or workplace',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center text-gray-600">
        <p className="text-sm">
          Choose the type of venue you are adding to help us categorise it correctly
        </p>
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venueTypes.map((venue) => {
          const isSelected = selectedType === venue.type;
          const isHovered = hoveredType === venue.type;
          const Icon = venue.icon;

          return (
            <button
              key={venue.type}
              type="button"
              onClick={() => handleTypeSelect(venue.type)}
              onMouseEnter={() => setHoveredType(venue.type)}
              onMouseLeave={() => setHoveredType(null)}
              className={`
                relative p-6 border-2 rounded-xl transition-all duration-200 text-center
                ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-lg'
                    : isHovered
                    ? 'border-primary-300 bg-primary-25 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              {/* Checkmark Badge - only shown when selected */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={`
                  w-16 h-16 rounded-full flex items-center justify-center transition-colors
                  ${
                    isSelected
                      ? 'bg-primary-100'
                      : isHovered
                      ? 'bg-primary-50'
                      : 'bg-gray-100'
                  }
                `}
                >
                  <Icon
                    className={`
                    w-8 h-8 transition-colors
                    ${
                      isSelected
                        ? 'text-primary-600'
                        : isHovered
                        ? 'text-primary-500'
                        : 'text-gray-500'
                    }
                  `}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className={`
                text-lg font-semibold mb-2 transition-colors
                ${isSelected ? 'text-primary-900' : 'text-gray-900'}
              `}
              >
                {venue.title}
              </h3>

              {/* Description */}
              <p
                className={`
                text-sm transition-colors
                ${isSelected ? 'text-primary-700' : 'text-gray-600'}
              `}
              >
                {venue.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Note:</strong> You can update this information later if needed. This helps us
          display accurate details to users searching for prayer spaces.
        </p>
      </div>
    </div>
  );
};

export default TypeSelectionStep;
