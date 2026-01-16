# Ticket 4-3: Add "Prayer Times" Section to Masjid Pages

Complexity level: medium

Add a "Prayer Times at {Masjid}" content section that provides natural language context about prayer times.

## Actions

### Action 1

Action type: edit file

Path: `src/app/masjid/[id]/[name]/MasjidRedirectClient.tsx`

Action: Add Prayer Times content section

Description: Add section below the About section:

```typescript
import { generatePrayerTimesContent } from '@/lib/content-generators'

const prayerTimesContent = masjidData ? generatePrayerTimesContent(masjidData) : null

// Add section:
{prayerTimesContent && (
  <section className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      Prayer Times at {displayName}
    </h2>
    <p className="text-gray-600 text-sm leading-relaxed mb-3">
      {prayerTimesContent}
    </p>
    {/* Optionally list today's times in a compact format */}
    {masjidData?.current_prayer_times && (
      <div className="text-sm text-gray-500">
        <p>Today's prayer times: Fajr {formatTime(masjidData.current_prayer_times.fajr_start)},
        Dhuhr {formatTime(masjidData.current_prayer_times.dhur_start)},
        Asr {formatTime(masjidData.current_prayer_times.asr_start)},
        Maghrib {formatTime(masjidData.current_prayer_times.magrib_start)},
        Isha {formatTime(masjidData.current_prayer_times.isha_start)}</p>
      </div>
    )}
  </section>
)}
```

This section helps match searches like "prayer times at [masjid name]".

## Checks

- [x] Section renders when prayer times are available
- [x] Section does not render if no prayer times
- [x] Times are formatted correctly
- [x] H2 heading uses masjid name for SEO

## Coding standards

N/A
