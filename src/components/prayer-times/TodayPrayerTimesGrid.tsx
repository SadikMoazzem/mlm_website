import { Moon, Sunrise, Sun, Sunset, Clock } from 'lucide-react'
import { formatTimeDisplay } from '@/lib/prayer-times-calculator'

interface PrayerTime {
  name: string
  time: string
}

interface TodayPrayerTimesGridProps {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

function getPrayerIcon(name: string) {
  switch (name.toLowerCase()) {
    case 'fajr':
      return <Moon className="w-5 h-5" />
    case 'sunrise':
      return <Sunrise className="w-5 h-5" />
    case 'dhuhr':
    case 'zuhr':
      return <Sun className="w-5 h-5" />
    case 'asr':
      return <Sun className="w-5 h-5" />
    case 'maghrib':
      return <Sunset className="w-5 h-5" />
    case 'isha':
      return <Moon className="w-5 h-5" />
    default:
      return <Clock className="w-5 h-5" />
  }
}

export function TodayPrayerTimesGrid({
  fajr,
  sunrise,
  dhuhr,
  asr,
  maghrib,
  isha,
}: TodayPrayerTimesGridProps) {
  const prayers: PrayerTime[] = [
    { name: 'Fajr', time: fajr },
    { name: 'Sunrise', time: sunrise },
    { name: 'Dhuhr', time: dhuhr },
    { name: 'Asr', time: asr },
    { name: 'Maghrib', time: maghrib },
    { name: 'Isha', time: isha },
  ]

  return (
    <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
      <h2 className="text-xl font-medium text-text-primary mb-6 text-center">
        Today&apos;s Prayer Times
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {prayers.map((prayer) => (
          <div
            key={prayer.name}
            className="bg-bg-primary rounded-xl p-4 text-center border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 mb-2">
              {getPrayerIcon(prayer.name)}
            </div>
            <p className="text-sm text-text-secondary mb-1">{prayer.name}</p>
            <p className="text-xl font-semibold text-text-primary">
              {formatTimeDisplay(prayer.time)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
