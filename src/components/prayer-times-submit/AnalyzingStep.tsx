'use client';

import { RotateCcw, Trash2, FileText, Table } from 'lucide-react';
import { CapturedImage } from '@/hooks/usePrayerTimesImageFlow';

interface AnalyzingStepProps {
  image: CapturedImage;
  onRetry: () => void;
  onRemove: () => void;
  isConvertingPdf?: boolean;
  pdfConversionProgress?: { current: number; total: number };
}

export default function AnalyzingStep({
  image,
  onRetry,
  onRemove,
  isConvertingPdf = false,
  pdfConversionProgress = { current: 0, total: 0 },
}: AnalyzingStepProps) {
  const { isAnalyzing, validation, fileType } = image;
  const isError = !isAnalyzing && !isConvertingPdf && validation && !validation.isValid;
  const isCsv = fileType === 'csv';
  const isPdfPage = fileType === 'pdf_page';

  // Render document icon for CSVs (no visual preview)
  const renderPreview = () => {
    if (isCsv) {
      return (
        <div className="w-32 h-32 rounded-lg bg-gray-100 flex flex-col items-center justify-center shadow-md">
          <Table className="w-16 h-16 text-gray-500" />
          <span className="text-sm text-gray-600 mt-2">{image.file.name}</span>
        </div>
      );
    }

    if (isPdfPage && !image.previewUrl) {
      return (
        <div className="w-32 h-32 rounded-lg bg-gray-100 flex flex-col items-center justify-center shadow-md">
          <FileText className="w-16 h-16 text-gray-500" />
          <span className="text-sm text-gray-600 mt-2">PDF Page</span>
        </div>
      );
    }

    return (
      <div className="relative w-full max-w-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.previewUrl}
          alt="Prayer timetable being analyzed"
          className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-md"
        />
        {isPdfPage && image.originalFileName && (
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {image.originalFileName}
          </div>
        )}
        {isError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-bold">✕</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
      {/* Preview */}
      <div className="mb-8">
        {renderPreview()}
      </div>

      {/* PDF Conversion State */}
      {isConvertingPdf && (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Converting PDF...</h2>
          <p className="text-gray-600 text-center">
            {pdfConversionProgress.total > 0
              ? `Processing page ${pdfConversionProgress.current} of ${pdfConversionProgress.total}`
              : 'Preparing pages...'}
          </p>

          {/* Progress bar for PDF conversion */}
          {pdfConversionProgress.total > 0 && (
            <div className="w-full max-w-xs">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-300"
                  style={{
                    width: `${(pdfConversionProgress.current / pdfConversionProgress.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && !isConvertingPdf && (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isCsv ? 'Validating CSV...' : 'Analyzing...'}
          </h2>
          <p className="text-gray-600 text-center">
            {isCsv ? 'Checking for prayer times data' : 'Checking for prayer times'}
          </p>

          {/* Spinner Animation */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex flex-col items-center w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">
            {isCsv ? 'Invalid CSV Data' : 'Not a Prayer Timetable'}
          </h2>
          <p className="text-red-600 text-center px-4">{validation?.message}</p>

          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-emerald-700 active:bg-emerald-800 shadow-md hover:shadow-lg min-h-[44px]"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg min-h-[44px]"
          >
            <Trash2 className="w-5 h-5" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
