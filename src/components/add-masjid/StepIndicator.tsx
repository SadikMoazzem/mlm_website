'use client';

import React from 'react';
import { AddMasjidStep } from '@/types/add-masjid';

/**
 * Props for the StepIndicator component
 */
export interface StepIndicatorProps {
  /** The current step in the flow */
  currentStep: AddMasjidStep;
  /** Optional CSS classes */
  className?: string;
}

/**
 * Ordered list of steps for the Add Masjid flow
 * Used to determine step indices and completion status
 */
const STEP_ORDER: AddMasjidStep[] = [
  AddMasjidStep.LOCATION,
  AddMasjidStep.NEARBY_CHECK,
  AddMasjidStep.TYPE_SELECTION,
  AddMasjidStep.DETAILS,
  AddMasjidStep.SUCCESS,
];

/**
 * Human-readable labels for each step
 */
const STEP_LABELS: Record<AddMasjidStep, string> = {
  [AddMasjidStep.LOCATION]: 'Location',
  [AddMasjidStep.NEARBY_CHECK]: 'Nearby Check',
  [AddMasjidStep.TYPE_SELECTION]: 'Type',
  [AddMasjidStep.DETAILS]: 'Details',
  [AddMasjidStep.SUBMITTING]: 'Submitting',
  [AddMasjidStep.SUCCESS]: 'Done',
  [AddMasjidStep.ERROR]: 'Error',
};

/**
 * StepIndicator component displays 5 dots showing progress through the Add Masjid flow
 *
 * Features:
 * - Completed steps are filled with the primary colour
 * - Current step is highlighted with a ring
 * - Future steps are empty/outlined
 * - Accessible with ARIA labels
 */
export function StepIndicator({ currentStep, className = '' }: StepIndicatorProps) {
  // Get the index of the current step
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  // Handle submitting step as part of details step visually
  const effectiveIndex = currentStep === AddMasjidStep.SUBMITTING ? 3 : currentIndex;

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="navigation"
      aria-label="Step progress"
    >
      {STEP_ORDER.map((step, index) => {
        const isCompleted = index < effectiveIndex;
        const isCurrent = index === effectiveIndex;
        const label = STEP_LABELS[step];

        return (
          <div
            key={step}
            className="flex items-center"
          >
            {/* Step dot */}
            <div
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                ${isCompleted
                  ? 'bg-primary-500'
                  : isCurrent
                    ? 'bg-primary-500 ring-2 ring-primary-200 ring-offset-1'
                    : 'bg-gray-200 border border-gray-300'
                }
              `}
              role="listitem"
              aria-label={`Step ${index + 1}: ${label}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
            />
            {/* Connector line between dots (except after the last one) */}
            {index < STEP_ORDER.length - 1 && (
              <div
                className={`
                  w-6 h-0.5 mx-1 transition-all duration-200
                  ${index < effectiveIndex ? 'bg-primary-500' : 'bg-gray-200'}
                `}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
