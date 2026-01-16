'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { AddMasjidStep } from '@/types/add-masjid';
import { StepIndicator } from './StepIndicator';

/**
 * Props for the StepPanel component
 */
export interface StepPanelProps {
  /** The current step in the flow */
  currentStep: AddMasjidStep;
  /** Title for the current step */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Content to render inside the panel */
  children: React.ReactNode;
  /** Whether to show the back button */
  showBack?: boolean;
  /** Whether to show the next button */
  showNext?: boolean;
  /** Whether the next button is disabled */
  nextDisabled?: boolean;
  /** Custom label for the next button */
  nextLabel?: string;
  /** Custom label for the back button */
  backLabel?: string;
  /** Callback when back button is clicked */
  onBack?: () => void;
  /** Callback when next button is clicked */
  onNext?: () => void;
  /** Optional CSS classes for the container */
  className?: string;
}

/**
 * Animation variants for step content transitions
 */
const contentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * StepPanel component provides a consistent container for step content
 *
 * Features:
 * - Step indicator at the top showing progress
 * - Title and optional subtitle
 * - Scrollable content area
 * - Navigation buttons at the bottom (Back / Next)
 * - Framer Motion transitions for step content
 */
export function StepPanel({
  currentStep,
  title,
  subtitle,
  children,
  showBack = false,
  showNext = true,
  nextDisabled = false,
  nextLabel = 'Next',
  backLabel = 'Back',
  onBack,
  onNext,
  className = '',
}: StepPanelProps) {
  // Determine if we're in a terminal state (success/submitting)
  const isTerminalState =
    currentStep === AddMasjidStep.SUCCESS ||
    currentStep === AddMasjidStep.SUBMITTING;

  // Ref for the content container
  const contentRef = useRef<HTMLDivElement>(null);

  // Focus management: focus on first focusable element when step changes
  useEffect(() => {
    if (!contentRef.current) return;

    // Wait for content to render before focusing
    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      // Find first focusable element (input, button, select, textarea, etc.)
      const focusable = contentRef.current.querySelector<HTMLElement>(
        'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusable) {
        focusable.focus();
      } else {
        // If no focusable element, focus the content container itself
        contentRef.current.setAttribute('tabindex', '-1');
        contentRef.current.focus();
        contentRef.current.removeAttribute('tabindex');
      }
    }, 300); // Match animation duration

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div
      className={`
        flex flex-col h-full bg-white
        ${className}
      `}
    >
      {/* Exit link - top right corner */}
      <div className="flex-shrink-0 px-6 pt-4 flex justify-end">
        <Link
          href="/"
          className="
            flex items-center gap-1.5 px-3 py-1.5 rounded-md
            text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50
            transition-colors duration-200
          "
        >
          <X className="w-4 h-4" />
          <span>Exit</span>
        </Link>
      </div>

      {/* Step indicator - hidden during terminal states */}
      {!isTerminalState && (
        <div className="flex-shrink-0 px-6 pt-2 pb-4">
          <StepIndicator currentStep={currentStep} />
        </div>
      )}

      {/* Header with title */}
      <div className="flex-shrink-0 px-6 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scrollable content area with animations */}
      <div className="flex-1 overflow-y-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            ref={contentRef}
            key={currentStep}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons - hidden during terminal states */}
      {!isTerminalState && (showBack || showNext) && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-4">
            {/* Back button */}
            {showBack ? (
              <button
                type="button"
                onClick={onBack}
                className="
                  flex items-center gap-2 px-4 py-2.5
                  text-gray-600 hover:text-gray-900
                  transition-colors duration-200
                "
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{backLabel}</span>
              </button>
            ) : (
              <div /> // Spacer to maintain layout
            )}

            {/* Next button */}
            {showNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={nextDisabled}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-lg
                  font-medium transition-all duration-200
                  ${nextDisabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700'
                  }
                `}
              >
                <span>{nextLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StepPanel;
