import imageCompression from 'browser-image-compression'

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
const SUPPORTED_DOCUMENT_TYPES = ['application/pdf', 'text/csv']
const SUPPORTED_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_DOCUMENT_TYPES]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_PDF_SIZE = 50 * 1024 * 1024 // 50MB for PDFs (multi-page documents can be larger)

export interface CompressedImage {
  file: File
  previewUrl: string
  originalSize: number
  compressedSize: number
}

export async function compressImage(file: File): Promise<CompressedImage> {
  const options = {
    maxSizeMB: 1,           // Compress to 1MB max
    maxWidthOrHeight: 1920, // Reasonable for OCR
    useWebWorker: true,     // Don't block UI
    fileType: 'image/jpeg'  // Standardise format
  }

  const compressed = await imageCompression(file, options)
  const previewUrl = URL.createObjectURL(compressed)

  return {
    file: compressed,
    previewUrl,
    originalSize: file.size,
    compressedSize: compressed.size
  }
}

export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url)
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!SUPPORTED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPEG, PNG, WebP image, PDF, or CSV file' }
  }

  // PDFs have a higher size limit
  if (isPdfFile(file)) {
    if (file.size > MAX_PDF_SIZE) {
      return { valid: false, error: 'PDF must be less than 50MB' }
    }
  } else if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File must be less than 10MB' }
  }

  return { valid: true }
}

/**
 * Checks if a file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}

/**
 * Checks if a file is a CSV
 */
export function isCsvFile(file: File): boolean {
  return file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')
}

/**
 * Checks if a file is an image (not PDF or CSV)
 */
export function isImageFile(file: File): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(file.type)
}
