# Ticket 2-4: Create city prayer times components

Complexity level: high

Create reusable components for the city prayer times page: header, times grid, weekly table, and method disclaimer.

## Actions

### Action 1

Action type: create file

Path: src/components/prayer-times/CityPrayerTimesHeader.tsx

Description: Header component with city name, date, and hero styling

Shows:
- City name and country
- Today's date (Gregorian)
- Decorative icon

### Action 2

Action type: create file

Path: src/components/prayer-times/TodayPrayerTimesGrid.tsx

Description: 6-card grid showing today's prayer times prominently

Shows:
- Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
- Each card with icon, prayer name, and time
- Highlight current/next prayer (optional)

### Action 3

Action type: create file

Path: src/components/prayer-times/WeeklyPrayerTimesTable.tsx

Description: Table showing 7 days of prayer times

Columns: Date, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
Rows: Today + next 6 days
Today's row highlighted

### Action 4

Action type: create file

Path: src/components/prayer-times/MethodDisclaimer.tsx

Description: Small disclaimer about calculation method

Text: "Prayer times calculated using UK Moonsighting Committee method with Shafi Asr (Mithl 1). Times may vary slightly from your local masjid. For Jamaat times, please check with your local masjid."

## Checks

- [x] All components render correctly
- [x] Dark mode styling applied
- [x] Responsive design works on mobile
- [x] Times format correctly (12-hour display)

## Coding standards

- docs/coding_standards/react/components.md
- docs/coding_standards/tailwind/styling.md
