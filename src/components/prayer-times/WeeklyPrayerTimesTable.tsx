import { format } from 'date-fns'
import { formatTimeDisplay } from '@/lib/prayer-times-calculator'

interface DayPrayerTimes {
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

interface WeeklyPrayerTimesTableProps {
  weeklyTimes: DayPrayerTimes[]
}

function getDayName(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'EEE')
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, 'd MMM')
}

export function WeeklyPrayerTimesTable({
  weeklyTimes,
}: WeeklyPrayerTimesTableProps) {
  return (
    <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
      <h2 className="text-xl font-medium text-text-primary mb-6 text-center">
        7-Day Prayer Times Forecast
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-3 px-2 text-text-secondary font-medium">
                Day
              </th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium">
                Fajr
              </th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium">
                Sunrise
              </th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium">
                Dhuhr
              </th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium">
                Asr
              </th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium">
                Maghrib
              </th>
              <th className="text-center py-3 px-2 text-text-secondary font-medium">
                Isha
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyTimes.map((day, index) => (
              <tr
                key={day.date}
                className={`border-b border-[var(--border)] last:border-b-0 ${
                  index === 0 ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <td className="py-3 px-2">
                  <div className="font-medium text-text-primary">
                    {getDayName(day.date)}
                  </div>
                  <div className="text-xs text-text-muted">
                    {formatDate(day.date)}
                  </div>
                </td>
                <td className="text-center py-3 px-2 text-text-primary">
                  {formatTimeDisplay(day.fajr)}
                </td>
                <td className="text-center py-3 px-2 text-text-primary">
                  {formatTimeDisplay(day.sunrise)}
                </td>
                <td className="text-center py-3 px-2 text-text-primary">
                  {formatTimeDisplay(day.dhuhr)}
                </td>
                <td className="text-center py-3 px-2 text-text-primary">
                  {formatTimeDisplay(day.asr)}
                </td>
                <td className="text-center py-3 px-2 text-text-primary">
                  {formatTimeDisplay(day.maghrib)}
                </td>
                <td className="text-center py-3 px-2 text-text-primary">
                  {formatTimeDisplay(day.isha)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
