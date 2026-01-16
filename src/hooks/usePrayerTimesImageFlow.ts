import { useCallback, useState, useMemo, useEffect, useRef } from 'react';

import { validatePrayerTimetableImage, OcrValidationResult } from '@/lib/ocr-validation';
import { compressImage, revokePreviewUrl, isPdfFile, isCsvFile, isImageFile } from '@/lib/image-utils';
import { convertPdfToImages } from '@/lib/pdf-utils';
import { validateCsvFile } from '@/lib/csv-validation';

export type PrayerTimesImageStep =
  | 'capture'
  | 'analyzing'
  | 'period_selection'
  | 'review'
  | 'image_detail'
  | 'submitting'
  | 'success';

export type ImagePeriod = 'month' | 'week' | 'day';

export type FileType = 'image' | 'pdf_page' | 'csv';

export interface CapturedImage {
  id: string;
  file: File;
  previewUrl: string;
  validation: OcrValidationResult | null;
  period: ImagePeriod | null;
  isAnalyzing: boolean;
  fileType: FileType;
  originalFileName?: string; // For PDF pages, track the source PDF name
}

interface UploadedImage {
  url: string;
  period: ImagePeriod;
  detectedPrayers: string[];
  detectedTimes: string[];
}

const MAX_IMAGES = 12;

const STEP_ORDER: PrayerTimesImageStep[] = [
  'capture',
  'analyzing',
  'period_selection',
  'review',
  'image_detail',
  'submitting',
  'success',
];

/**
 * Helper function to retry an async operation with exponential backoff
 */
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Get user-friendly error message from error type
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'Unable to connect. Please check your internet connection.';
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      return 'Upload timed out. Please try again.';
    }
    if (error.message.includes('413') || error.message.includes('too large')) {
      return 'File too large. Please try a smaller image.';
    }
    if (error.message.includes('401') || error.message.includes('403')) {
      return 'Upload not authorized. Please try again.';
    }
    if (error.message.includes('500') || error.message.includes('server')) {
      return 'Something went wrong. Please try again later.';
    }
  }

  return 'Failed to submit. Please try again.';
}

/**
 * Custom hook to manage the prayer times image submission flow.
 *
 * Mirrors the mobile app's usePrayerTimesImageFlow hook for consistency.
 */
export function usePrayerTimesImageFlow(masjidId?: string) {
  // State
  const [currentStep, setCurrentStep] = useState<PrayerTimesImageStep>('capture');
  const [images, setImages] = useState<CapturedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactEmail, setContactEmail] = useState('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [isConvertingPdf, setIsConvertingPdf] = useState(false);
  const [pdfConversionProgress, setPdfConversionProgress] = useState({ current: 0, total: 0 });

  // Store images ref for cleanup to avoid stale closure
  const imagesRef = useRef<CapturedImage[]>([]);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => {
        revokePreviewUrl(img.previewUrl);
      });
    };
  }, []);

  const generateImageId = () => `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  /**
   * Clear submission error
   */
  const clearError = useCallback(() => {
    setSubmissionError(null);
  }, []);

  /**
   * Add a single image (internal helper)
   */
  const addSingleImage = useCallback(
    async (
      file: File,
      fileType: FileType,
      originalFileName?: string
    ): Promise<{ success: boolean; isValid?: boolean; message?: string; imageId?: string; error?: string }> => {
      try {
        // Compress if it's an image or PDF page
        let processedFile = file;
        let previewUrl: string;

        if (fileType === 'csv') {
          // CSVs don't need compression, create a simple preview URL
          previewUrl = ''; // No visual preview for CSVs
          processedFile = file;
        } else {
          const compressed = await compressImage(file);
          processedFile = compressed.file;
          previewUrl = compressed.previewUrl;
        }

        const newImage: CapturedImage = {
          id: generateImageId(),
          file: processedFile,
          previewUrl,
          validation: null,
          period: null,
          isAnalyzing: true,
          fileType,
          originalFileName,
        };

        setImages((prev) => [...prev, newImage]);

        // Validate based on file type
        let validation: OcrValidationResult;
        if (fileType === 'csv') {
          validation = await validateCsvFile(file);
        } else {
          validation = await validatePrayerTimetableImage(processedFile);
        }

        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id ? { ...img, validation, isAnalyzing: false } : img
          )
        );

        return {
          success: true,
          isValid: validation.isValid,
          message: validation.message,
          imageId: newImage.id,
        };
      } catch (error) {
        console.error('[PrayerTimesImageFlow] Analysis failed:', error);
        return { success: false, error: 'Analysis failed' };
      }
    },
    []
  );

  /**
   * Add a new file (image, PDF, or CSV) and start analyzing it
   * PDFs are converted to multiple images (one per page)
   * CSVs are validated directly without OCR
   */
  const addImage = useCallback(
    async (file: File) => {
      const remainingSlots = MAX_IMAGES - images.length;
      if (remainingSlots <= 0) {
        return { success: false, error: 'Maximum images reached' };
      }

      try {
        // Handle PDF files - convert to images
        if (isPdfFile(file)) {
          setIsConvertingPdf(true);
          setPdfConversionProgress({ current: 0, total: 0 });
          setCurrentStep('analyzing');

          try {
            const pdfImages = await convertPdfToImages(file, (current, total) => {
              setPdfConversionProgress({ current, total });
            });

            // Limit to remaining slots
            const imagesToProcess = pdfImages.slice(0, remainingSlots);

            if (imagesToProcess.length === 0) {
              setIsConvertingPdf(false);
              return { success: false, error: 'Could not extract pages from PDF' };
            }

            setIsConvertingPdf(false);

            // Process each page - need majority to be valid
            let validCount = 0;
            let lastResult: { success: boolean; isValid?: boolean; message?: string; imageId?: string; error?: string } | null = null;

            for (const pageImage of imagesToProcess) {
              const result = await addSingleImage(pageImage, 'pdf_page', file.name);
              lastResult = result;
              if (result.isValid) {
                validCount++;
              }
              setCurrentImageIndex((prev) => prev + 1);
            }

            // Check if majority of pages are valid
            const majorityValid = validCount > imagesToProcess.length / 2;

            if (majorityValid) {
              setCurrentStep('period_selection');
              return { success: true, isValid: true, imageId: lastResult?.imageId };
            } else {
              // Stay on analyzing to show which pages failed
              return {
                success: true,
                isValid: false,
                message: `Only ${validCount} of ${imagesToProcess.length} pages appear to contain prayer times.`,
                imageId: lastResult?.imageId,
              };
            }
          } catch (error) {
            setIsConvertingPdf(false);
            console.error('[PrayerTimesImageFlow] PDF conversion failed:', error);
            return { success: false, error: 'Failed to process PDF. Please try a different file.' };
          }
        }

        // Handle CSV files - validate directly
        if (isCsvFile(file)) {
          setCurrentStep('analyzing');
          setCurrentImageIndex(images.length);

          const result = await addSingleImage(file, 'csv');

          if (result.isValid) {
            setCurrentStep('period_selection');
          }

          return result;
        }

        // Handle regular images
        if (isImageFile(file)) {
          setCurrentStep('analyzing');
          setCurrentImageIndex(images.length);

          const result = await addSingleImage(file, 'image');

          if (result.isValid) {
            setCurrentStep('period_selection');
          }

          return result;
        }

        return { success: false, error: 'Unsupported file type' };
      } catch (error) {
        console.error('[PrayerTimesImageFlow] Add file failed:', error);
        return { success: false, error: 'Failed to process file' };
      }
    },
    [images.length, addSingleImage]
  );

  /**
   * Remove an image by ID
   */
  const removeImage = useCallback(
    (imageId: string) => {
      setImages((prev) => {
        const imageToRemove = prev.find((img) => img.id === imageId);
        if (imageToRemove) {
          // Clean up preview URL to avoid memory leaks
          revokePreviewUrl(imageToRemove.previewUrl);
        }

        const newImages = prev.filter((img) => img.id !== imageId);
        if (currentImageIndex >= newImages.length && newImages.length > 0) {
          setCurrentImageIndex(newImages.length - 1);
        } else if (newImages.length === 0) {
          setCurrentImageIndex(0);
          setCurrentStep('capture');
        }
        return newImages;
      });
    },
    [currentImageIndex]
  );

  /**
   * Set period for an image
   */
  const setPeriodForImage = useCallback((imageId: string, period: ImagePeriod) => {
    setImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, period } : img)));
  }, []);

  /**
   * Set period for current image and advance to review
   */
  const setCurrentImagePeriod = useCallback(
    (period: ImagePeriod) => {
      const currentImage = images[currentImageIndex];
      if (currentImage) {
        setPeriodForImage(currentImage.id, period);
        setCurrentStep('review');
      }
    },
    [images, currentImageIndex, setPeriodForImage]
  );

  /**
   * Check if can add more images
   */
  const canAddMoreImages = useMemo(() => {
    return images.length < MAX_IMAGES;
  }, [images.length]);

  /**
   * Check if all images are valid and have periods selected
   */
  const canSubmit = useMemo(() => {
    if (images.length === 0) return false;
    return images.every(
      (img) => img.validation?.isValid && img.period !== null && !img.isAnalyzing
    );
  }, [images]);

  /**
   * Get current image being worked on
   */
  const currentImage = useMemo(() => {
    return images[currentImageIndex] || null;
  }, [images, currentImageIndex]);

  /**
   * Navigate to next step
   */
  const goNext = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  }, [currentStep]);

  /**
   * Navigate to previous step
   */
  const goBack = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    }
  }, [currentStep]);

  /**
   * Go to specific step
   */
  const goToStep = useCallback((step: PrayerTimesImageStep) => {
    setCurrentStep(step);
  }, []);

  /**
   * Go back to capture to add another image
   */
  const addAnotherImage = useCallback(() => {
    setCurrentStep('capture');
  }, []);

  /**
   * View details of a specific image
   */
  const viewImageDetail = useCallback(
    (imageId: string) => {
      const index = images.findIndex((img) => img.id === imageId);
      if (index !== -1) {
        setCurrentImageIndex(index);
        setCurrentStep('image_detail');
      }
    },
    [images]
  );

  /**
   * Go back from image detail to review
   */
  const backFromImageDetail = useCallback(() => {
    setCurrentStep('review');
  }, []);

  /**
   * Reset the flow
   */
  const resetFlow = useCallback(() => {
    // Clean up all preview URLs
    images.forEach((img) => {
      revokePreviewUrl(img.previewUrl);
    });

    setImages([]);
    setCurrentImageIndex(0);
    setCurrentStep('capture');
    setContactEmail('');
    setSubmissionError(null);
    setUploadProgress({ current: 0, total: 0 });
  }, [images]);

  /**
   * Submit all images to S3 and then to the feedback API
   */
  const submitImages = useCallback(async () => {
    if (!masjidId) {
      setSubmissionError('No masjid selected');
      return false;
    }

    if (!canSubmit) {
      setSubmissionError('Please ensure all images are valid and have a period selected');
      return false;
    }

    setCurrentStep('submitting');
    setSubmissionError(null);
    setUploadProgress({ current: 0, total: images.length });

    try {
      const uploadedImages: UploadedImage[] = [];

      // Upload each image to S3
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        setUploadProgress({ current: i + 1, total: images.length });

        // Wrap each upload in retry logic
        const uploadResult = await withRetry(async () => {
          // 1. Get presigned URL
          const presignRes = await fetch('/api/files/presign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              masjid_id: masjidId,
              filename: `prayer_times_${Date.now()}_${i}.jpg`,
              file_category: 'prayer_times_checkins',
              content_type: 'image/jpeg',
            }),
          });

          if (!presignRes.ok) {
            throw new Error(`Presign failed: ${presignRes.status}`);
          }

          const { presigned_url, public_url } = await presignRes.json();

          // 2. Upload to S3
          const uploadRes = await fetch(presigned_url, {
            method: 'PUT',
            body: image.file,
            headers: { 'Content-Type': 'image/jpeg' },
          });

          if (!uploadRes.ok) {
            throw new Error(`S3 upload failed: ${uploadRes.status}`);
          }

          return { public_url };
        });

        uploadedImages.push({
          url: uploadResult.public_url,
          period: image.period!,
          detectedPrayers: image.validation?.detectedPrayers || [],
          detectedTimes: image.validation?.detectedTimes || [],
        });
      }

      // 3. Submit feedback with all uploaded images
      const feedbackRes = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'masjid_check_in',
          masjid_id: masjidId,
          data: {
            prayer_times_images: uploadedImages,
            contact_email: contactEmail || undefined,
            source: 'website',
          },
        }),
      });

      if (!feedbackRes.ok) {
        throw new Error(`Feedback submission failed: ${feedbackRes.status}`);
      }

      setCurrentStep('success');
      return true;
    } catch (error) {
      console.error('[PrayerTimesImageFlow] Submit failed:', error);
      setSubmissionError(getErrorMessage(error));
      setCurrentStep('review');
      return false;
    }
  }, [masjidId, canSubmit, images, contactEmail]);

  return {
    // State
    currentStep,
    images,
    currentImageIndex,
    currentImage,
    contactEmail,
    submissionError,
    uploadProgress,
    isConvertingPdf,
    pdfConversionProgress,

    // Computed
    canAddMoreImages,
    canSubmit,
    maxImages: MAX_IMAGES,

    // Actions
    addImage,
    removeImage,
    setPeriodForImage,
    setCurrentImagePeriod,
    setCurrentImageIndex,
    setContactEmail,
    clearError,
    goNext,
    goBack,
    goToStep,
    addAnotherImage,
    viewImageDetail,
    backFromImageDetail,
    submitImages,
    resetFlow,
  };
}
