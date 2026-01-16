'use client'

import { useRef } from 'react'
import { Camera, Upload } from 'lucide-react'
import { validateImageFile } from '@/lib/image-utils'

interface CaptureStepProps {
  imageCount: number
  maxImages: number
  onImageCaptured: (file: File) => void
}

// Accept images, PDFs, and CSVs
const ACCEPTED_FILE_TYPES = 'image/*,.pdf,.csv,application/pdf,text/csv'

export default function CaptureStep({ onImageCaptured }: CaptureStepProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate the file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    // Call the callback with valid file
    onImageCaptured(file)

    // Reset the input so the same file can be selected again if needed
    if (event.target) {
      event.target.value = ''
    }
  }

  const handleTakePhotoClick = () => {
    cameraInputRef.current?.click()
  }

  const handleUploadFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 pb-10">
      {/* Camera Icon Circle */}
      <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mb-7">
        <Camera className="w-12 h-12 text-primary-500" strokeWidth={2} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-2">
        Upload Prayer Timetable
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 text-center mb-8">
        Take a photo or upload a file
      </p>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Take photo"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload file"
      />

      {/* Take Photo Button */}
      <button
        onClick={handleTakePhotoClick}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 px-5 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-colors"
        type="button"
        aria-label="Take photo of prayer timetable"
      >
        <Camera className="w-5 h-5" strokeWidth={2.5} />
        <span>Take Photo</span>
      </button>

      {/* Upload File Button */}
      <button
        onClick={handleUploadFileClick}
        className="w-full bg-white border border-gray-200 text-gray-800 py-3.5 px-5 rounded-xl font-semibold flex items-center justify-center gap-2.5 mt-3 hover:bg-gray-50 transition-colors"
        type="button"
        aria-label="Upload image, PDF, or CSV file"
      >
        <Upload className="w-5 h-5" strokeWidth={2.5} />
        <span>Upload File</span>
      </button>

      {/* Helper text */}
      <p className="text-xs text-gray-400 text-center mt-4">
        Images, PDFs, and CSV files supported
      </p>
    </div>
  )
}
