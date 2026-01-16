'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';

import { MasjidData } from '@/types/api';
import { usePrayerTimesImageFlow } from '@/hooks/usePrayerTimesImageFlow';
import CaptureStep from '@/components/prayer-times-submit/CaptureStep';
import AnalyzingStep from '@/components/prayer-times-submit/AnalyzingStep';
import { PeriodSelectionStep } from '@/components/prayer-times-submit/PeriodSelectionStep';
import ReviewStep from '@/components/prayer-times-submit/ReviewStep';
import ImageDetailStep from '@/components/prayer-times-submit/ImageDetailStep';
import SubmittingStep from '@/components/prayer-times-submit/SubmittingStep';
import SuccessStep from '@/components/prayer-times-submit/SuccessStep';
import ErrorAlert from '@/components/prayer-times-submit/ErrorAlert';

interface PrayerTimesSubmitClientProps {
  masjid: MasjidData;
}

// Steps that show in the progress indicator
const VISIBLE_STEPS = ['capture', 'analyzing', 'period_selection', 'review'];

export function PrayerTimesSubmitClient({ masjid }: PrayerTimesSubmitClientProps) {
  const router = useRouter();
  const flow = usePrayerTimesImageFlow(masjid.id);

  const currentStepIndex = VISIBLE_STEPS.indexOf(flow.currentStep);
  const isFirstStep = flow.currentStep === 'capture' && flow.images.length === 0;
  const showHeader = !['success', 'submitting'].includes(flow.currentStep);
  const isTerminalState = ['success', 'submitting'].includes(flow.currentStep);

  // Handle browser back/refresh during submission
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (flow.currentStep === 'submitting' || flow.images.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [flow.currentStep, flow.images.length]);

  const handleBack = () => {
    if (isFirstStep) {
      // Go back to masjid page
      router.back();
    } else if (flow.currentStep === 'analyzing' || flow.currentStep === 'period_selection') {
      // Remove current image and go back
      if (flow.currentImage) {
        flow.removeImage(flow.currentImage.id);
      }
      if (flow.images.length > 1) {
        flow.goToStep('review');
      } else {
        flow.goToStep('capture');
      }
    } else if (flow.currentStep === 'review') {
      flow.goToStep('capture');
    } else if (flow.currentStep === 'image_detail') {
      flow.backFromImageDetail();
    } else {
      flow.goBack();
    }
  };

  const handleDismissSuccess = () => {
    // Navigate to masjid page
    router.push(`/masjid/${masjid.id}/${encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  const handleSubmitMore = () => {
    flow.resetFlow();
  };

  const handleRetryFromAnalyzing = () => {
    // Remove current image and go back to capture
    if (flow.currentImage) {
      flow.removeImage(flow.currentImage.id);
    }
    flow.goToStep('capture');
  };

  const handleRemoveFromAnalyzing = () => {
    if (flow.currentImage) {
      flow.removeImage(flow.currentImage.id);
    }
    if (flow.images.length > 1) {
      flow.goToStep('review');
    } else {
      flow.goToStep('capture');
    }
  };

  const renderStep = () => {
    switch (flow.currentStep) {
      case 'capture':
        return (
          <CaptureStep
            imageCount={flow.images.length}
            maxImages={flow.maxImages}
            onImageCaptured={flow.addImage}
          />
        );

      case 'analyzing':
        if (!flow.currentImage) return null;
        return (
          <AnalyzingStep
            image={flow.currentImage}
            onRetry={handleRetryFromAnalyzing}
            onRemove={handleRemoveFromAnalyzing}
            isConvertingPdf={flow.isConvertingPdf}
            pdfConversionProgress={flow.pdfConversionProgress}
          />
        );

      case 'period_selection':
        if (!flow.currentImage) return null;
        return (
          <PeriodSelectionStep
            image={flow.currentImage}
            onSelectPeriod={flow.setCurrentImagePeriod}
          />
        );

      case 'review':
        return (
          <ReviewStep
            images={flow.images}
            maxImages={flow.maxImages}
            canSubmit={flow.canSubmit}
            contactEmail={flow.contactEmail}
            onImageTap={flow.viewImageDetail}
            onAddAnother={flow.addAnotherImage}
            onEmailChange={flow.setContactEmail}
            onSubmit={flow.submitImages}
          />
        );

      case 'image_detail':
        if (!flow.currentImage) return null;
        return (
          <ImageDetailStep
            image={flow.currentImage}
            onChangePeriod={(period) => flow.setPeriodForImage(flow.currentImage!.id, period)}
            onRemove={() => {
              flow.removeImage(flow.currentImage!.id);
              if (flow.images.length > 1) {
                flow.goToStep('review');
              } else {
                flow.goToStep('capture');
              }
            }}
            onBack={flow.backFromImageDetail}
          />
        );

      case 'submitting':
        return <SubmittingStep progress={flow.uploadProgress} />;

      case 'success':
        return (
          <SuccessStep
            imageCount={flow.images.length}
            masjidName={masjid.name}
            onDismiss={handleDismissSuccess}
            onSubmitMore={handleSubmitMore}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Desktop: Centered panel layout */}
      <div className="flex-1 flex flex-col md:items-center md:justify-center md:py-8">
        {/* Panel container - full width on mobile, centered card on desktop */}
        <div className="flex-1 md:flex-initial w-full md:max-w-xl md:min-h-[600px] bg-white md:rounded-xl md:shadow-lg flex flex-col overflow-hidden">
          {/* Exit link - desktop only, top right */}
          {showHeader && (
            <div className="hidden md:flex justify-end px-4 pt-3">
              <Link
                href={`/masjid/${masjid.id}/${encodeURIComponent(masjid.name.toLowerCase().replace(/\s+/g, '-'))}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Exit</span>
              </Link>
            </div>
          )}

          {/* Header with back button - mobile style */}
          {showHeader && (
            <header className="md:hidden bg-primary-500 text-white px-4 py-4 flex items-center justify-between shadow-sm">
              <button
                onClick={handleBack}
                className="p-2 -ml-2 hover:bg-primary-600 rounded-lg transition-colors"
                aria-label={isFirstStep ? 'Close' : 'Go back'}
              >
                {isFirstStep ? (
                  <X className="w-6 h-6" />
                ) : (
                  <ArrowLeft className="w-6 h-6" />
                )}
              </button>
              <h1 className="font-semibold text-lg">Prayer Times</h1>
              <div className="w-10" /> {/* Spacer for centering */}
            </header>
          )}

          {/* Desktop header with masjid name and back button */}
          {showHeader && (
            <div className="hidden md:block px-6 pt-2 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handleBack}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                  aria-label={isFirstStep ? 'Close' : 'Go back'}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Submit Prayer Times</h1>
              </div>
              <p className="text-gray-600 text-sm">{masjid.name}</p>
            </div>
          )}

          {/* Progress dots */}
          {showHeader && currentStepIndex >= 0 && (
            <div className="flex justify-center gap-2 py-3 bg-white border-b border-gray-100 md:border-t">
              {VISIBLE_STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStepIndex ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Error alert */}
          {flow.submissionError && (
            <div className="px-4 md:px-6 pt-4">
              <ErrorAlert
                message={flow.submissionError}
                onRetry={flow.submitImages}
                onDismiss={flow.clearError}
              />
            </div>
          )}

          {/* Main content area */}
          <div className={`flex-1 w-full ${isTerminalState ? '' : 'py-6 md:py-8'}`}>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
