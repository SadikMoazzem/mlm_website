export interface OcrValidationResult {
  isValid: boolean;
  confidence: number;
  detectedPrayers: string[];
  detectedTimes: string[];
  detectedMonths: string[];
  rawText: string;
  message: string;
}

// Prayer name keywords in multiple languages
const PRAYER_KEYWORDS_ENGLISH = [
  'fajr',
  'fajar',
  'fajir',
  'dhuhr',
  'zuhr',
  'zohr',
  'duhr',
  'asr',
  'asar',
  'maghrib',
  'magrib',
  'maghreb',
  'isha',
  'esha',
  'ishaa',
  'sunrise',
  'shuruq',
  'ishraq',
  'jummah',
  'jumma',
  'jumuah',
  'friday',
  'prayer',
  'salah',
  'salat',
  'namaz',
  'jamaat',
  'jamat',
  'congregation',
  'timetable',
  'schedule',
  'times',
];

const PRAYER_KEYWORDS_ARABIC = [
  'فجر',
  'ظهر',
  'عصر',
  'مغرب',
  'عشاء',
  'شروق',
  'جمعة',
  'صلاة',
  'جماعة',
];

const PRAYER_KEYWORDS_URDU = ['نماز', 'فجر', 'ظہر', 'عصر', 'مغرب', 'عشاء'];

const ALL_PRAYER_KEYWORDS = [
  ...PRAYER_KEYWORDS_ENGLISH,
  ...PRAYER_KEYWORDS_ARABIC,
  ...PRAYER_KEYWORDS_URDU,
];

// Month names for date detection
const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
  'jan',
  'feb',
  'mar',
  'apr',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
  // Islamic months
  'muharram',
  'safar',
  'rabi',
  'jumada',
  'rajab',
  'shaban',
  'ramadan',
  'shawwal',
  'dhul',
];

// Time pattern regex - matches formats like "5:30", "05:30", "5:30 AM", "17:30"
const TIME_PATTERN = /\b\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?\b/g;

/**
 * Initialize Tesseract worker with dynamic import to avoid SSR issues
 */
const initTesseract = async () => {
  const Tesseract = await import('tesseract.js');
  return Tesseract.createWorker('eng', 1, {
    logger: (m) => console.log(m), // Optional progress logging
  });
};

/**
 * Normalize various prayer name spellings to standard English names
 */
function normalizePrayerName(keyword: string): string | null {
  const lowerKeyword = keyword.toLowerCase();

  // Fajr variations
  if (['fajr', 'fajar', 'fajir', 'فجر'].includes(lowerKeyword)) {
    return 'Fajr';
  }

  // Dhuhr variations
  if (['dhuhr', 'zuhr', 'zohr', 'duhr', 'ظهر', 'ظہر'].includes(lowerKeyword)) {
    return 'Dhuhr';
  }

  // Asr variations
  if (['asr', 'asar', 'عصر'].includes(lowerKeyword)) {
    return 'Asr';
  }

  // Maghrib variations
  if (['maghrib', 'magrib', 'maghreb', 'مغرب'].includes(lowerKeyword)) {
    return 'Maghrib';
  }

  // Isha variations
  if (['isha', 'esha', 'ishaa', 'عشاء', 'عشا'].includes(lowerKeyword)) {
    return 'Isha';
  }

  // Sunrise
  if (['sunrise', 'shuruq', 'ishraq', 'شروق'].includes(lowerKeyword)) {
    return 'Sunrise';
  }

  // Jummah
  if (['jummah', 'jumma', 'jumuah', 'friday', 'جمعة'].includes(lowerKeyword)) {
    return 'Jummah';
  }

  return null;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Validates an image to check if it contains prayer timetable information
 * using Tesseract.js for OCR
 */
export async function validatePrayerTimetableImage(
  imageFile: File
): Promise<OcrValidationResult> {
  let worker: Awaited<ReturnType<typeof initTesseract>> | null = null;

  try {
    // Initialize Tesseract worker
    worker = await initTesseract();

    // Run OCR on the image
    const result = await worker.recognize(imageFile);
    const rawText = result.data.text.toLowerCase();

    // Find detected prayer keywords
    const detectedPrayers: string[] = [];
    for (const keyword of ALL_PRAYER_KEYWORDS) {
      if (rawText.includes(keyword.toLowerCase())) {
        // Normalize to English prayer name for display
        const normalizedPrayer = normalizePrayerName(keyword);
        if (normalizedPrayer && !detectedPrayers.includes(normalizedPrayer)) {
          detectedPrayers.push(normalizedPrayer);
        }
      }
    }

    // Find time patterns
    const timeMatches = rawText.match(TIME_PATTERN) || [];
    const detectedTimes = Array.from(new Set(timeMatches));

    // Find month names
    const detectedMonths: string[] = [];
    for (const month of MONTH_NAMES) {
      if (rawText.includes(month.toLowerCase())) {
        detectedMonths.push(capitalizeFirst(month));
      }
    }

    // Calculate confidence score
    let confidence = 0;

    // Prayer keywords found (max 40 points)
    if (detectedPrayers.length >= 5) {
      confidence += 40;
    } else if (detectedPrayers.length >= 3) {
      confidence += 30;
    } else if (detectedPrayers.length >= 1) {
      confidence += 15;
    }

    // Time patterns found (max 35 points)
    if (detectedTimes.length >= 7) {
      confidence += 35;
    } else if (detectedTimes.length >= 5) {
      confidence += 30;
    } else if (detectedTimes.length >= 3) {
      confidence += 20;
    } else if (detectedTimes.length >= 1) {
      confidence += 10;
    }

    // Month/date context found (max 15 points)
    if (detectedMonths.length > 0) {
      confidence += 15;
    }

    // Header keywords found (max 10 points)
    const headerKeywords = [
      'timetable',
      'schedule',
      'prayer times',
      'salah times',
      'namaz',
    ];
    const hasHeader = headerKeywords.some((kw) => rawText.includes(kw));
    if (hasHeader) {
      confidence += 10;
    }

    // Determine validity - threshold is 50
    const isValid = confidence >= 50;

    // Generate user-friendly message
    let message = '';
    if (isValid) {
      message = `Prayer timetable detected! Found ${detectedPrayers.length} prayer names and ${detectedTimes.length} times.`;
    } else if (confidence >= 30) {
      message =
        'This might be a prayer timetable, but we could not clearly identify enough prayer times.';
    } else if (detectedTimes.length > 0) {
      message =
        'We found some times, but could not identify this as a prayer timetable.';
    } else {
      message =
        'This does not appear to be a prayer timetable. Please take a clearer picture of a prayer schedule.';
    }

    return {
      isValid,
      confidence,
      detectedPrayers,
      detectedTimes,
      detectedMonths,
      rawText: rawText.substring(0, 500), // Truncate for storage
      message,
    };
  } catch (error) {
    console.error('[OCR] Validation failed:', error);
    return {
      isValid: false,
      confidence: 0,
      detectedPrayers: [],
      detectedTimes: [],
      detectedMonths: [],
      rawText: '',
      message: 'Failed to analyse image. Please try again with a clearer picture.',
    };
  } finally {
    // Clean up worker to avoid memory leaks
    if (worker) {
      await worker.terminate();
    }
  }
}
