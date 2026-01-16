/**
 * PDF to image conversion utilities
 * Uses pdfjs-dist for browser-based PDF processing
 */

const MAX_PAGES = 12; // Match max images limit
const MAX_WIDTH = 1920; // Max render width for reasonable OCR quality

// Use a specific version to ensure CDN compatibility
const PDFJS_VERSION = '4.4.168';

/**
 * Dynamically load pdfjs-dist from CDN to avoid webpack bundling issues
 */
async function loadPdfJs(): Promise<typeof import('pdfjs-dist')> {
  // Check if already loaded
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).pdfjsLib) {
    return (window as unknown as Record<string, unknown>).pdfjsLib as typeof import('pdfjs-dist');
  }

  // Load from CDN
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.mjs`;
    script.type = 'module';

    // Use legacy build for better compatibility
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
    script.type = 'text/javascript';

    script.onload = () => {
      const pdfjsLib = (window as unknown as Record<string, unknown>).pdfjsLib as typeof import('pdfjs-dist');
      if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
        resolve(pdfjsLib);
      } else {
        reject(new Error('Failed to load pdf.js'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load pdf.js script'));
    document.head.appendChild(script);
  });
}

/**
 * Converts a PDF file into an array of JPEG images (one per page)
 */
export async function convertPdfToImages(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<File[]> {
  const pdfjsLib = await loadPdfJs();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pageCount = Math.min(pdf.numPages, MAX_PAGES);
  const images: File[] = [];

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    onProgress?.(pageNum, pageCount);

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });

    // Calculate scale to fit within MAX_WIDTH while maintaining aspect ratio
    const scale = Math.min(MAX_WIDTH / viewport.width, 2); // Cap at 2x for quality
    const scaledViewport = page.getViewport({ scale });

    // Create canvas for rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get canvas context');
    }

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    // Render page to canvas
    await page.render({
      canvasContext: context,
      viewport: scaledViewport,
      canvas: canvas,
    }).promise;

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to convert canvas to blob'));
        },
        'image/jpeg',
        0.85 // Quality setting
      );
    });

    // Create File object with meaningful name
    const baseName = file.name.replace(/\.pdf$/i, '');
    const imageFile = new File(
      [blob],
      `${baseName}_page_${pageNum}.jpg`,
      { type: 'image/jpeg' }
    );

    images.push(imageFile);
  }

  return images;
}

/**
 * Checks if a file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

/**
 * Gets the number of pages in a PDF file
 */
export async function getPdfPageCount(file: File): Promise<number> {
  const pdfjsLib = await loadPdfJs();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  return pdf.numPages;
}
