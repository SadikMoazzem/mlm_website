/**
 * CSV validation utilities for prayer timetable files
 * Validates CSV content by checking for prayer keywords and time patterns
 * without requiring OCR - uses direct text parsing
 */

import type { OcrValidationResult } from './ocr-validation';

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
 * Parse CSV text into rows and cells
 * Handles common delimiters: comma, semicolon, tab
 */
function parseCsv(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());

  // Detect delimiter by counting occurrences in first few lines
  const sampleLines = lines.slice(0, 5).join('\n');
  const commaCount = (sampleLines.match(/,/g) || []).length;
  const semicolonCount = (sampleLines.match(/;/g) || []).length;
  const tabCount = (sampleLines.match(/\t/g) || []).length;

  let delimiter = ',';
  if (semicolonCount > commaCount && semicolonCount > tabCount) {
    delimiter = ';';
  } else if (tabCount > commaCount && tabCount > semicolonCount) {
    delimiter = '\t';
  }

  return lines.map((line) =>
    line.split(delimiter).map((cell) => cell.trim().replace(/^["']|["']$/g, ''))
  );
}

/**
 * Validates a CSV file to check if it contains prayer timetable information
 * Uses direct text parsing (no OCR required)
 */
export async function validateCsvFile(file: File): Promise<OcrValidationResult> {
  try {
    const text = await file.text();
    const rows = parseCsv(text);
    const rawText = text.toLowerCase();

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

    // Calculate confidence score (same logic as OCR validation)
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

    // Bonus for structured data (CSV-specific)
    // If we have multiple rows with consistent column counts, it's more likely valid
    if (rows.length >= 5) {
      const columnCounts = rows.map((row) => row.length);
      const consistentColumns = columnCounts.every((c) => c === columnCounts[0]);
      if (consistentColumns && columnCounts[0] >= 3) {
        confidence += 5;
      }
    }

    // Determine validity - threshold is 50
    const isValid = confidence >= 50;

    // Generate user-friendly message
    let message = '';
    if (isValid) {
      message = `Prayer timetable detected! Found ${detectedPrayers.length} prayer names and ${detectedTimes.length} times in ${rows.length} rows.`;
    } else if (confidence >= 30) {
      message =
        'This might be a prayer timetable, but we could not clearly identify enough prayer times.';
    } else if (detectedTimes.length > 0) {
      message =
        'We found some times, but could not identify this as a prayer timetable.';
    } else {
      message =
        'This does not appear to be a prayer timetable. Please upload a CSV file containing prayer schedule data.';
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
    console.error('[CSV] Validation failed:', error);
    return {
      isValid: false,
      confidence: 0,
      detectedPrayers: [],
      detectedTimes: [],
      detectedMonths: [],
      rawText: '',
      message: 'Failed to read CSV file. Please ensure the file is a valid CSV.',
    };
  }
}

/**
 * Gets basic info about a CSV file (row count, column count)
 */
export async function getCsvInfo(
  file: File
): Promise<{ rowCount: number; columnCount: number }> {
  const text = await file.text();
  const rows = parseCsv(text);
  return {
    rowCount: rows.length,
    columnCount: rows[0]?.length || 0,
  };
}
