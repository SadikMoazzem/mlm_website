import { Clock, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface CityPrayerTimesHeaderProps {
  cityName: string
  country: string
  date?: Date
}

export function CityPrayerTimesHeader({
  cityName,
  country,
  date = new Date(),
}: CityPrayerTimesHeaderProps) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
        <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
      </div>
      <h1 className="text-4xl lg:text-5xl font-light text-text-primary mb-4 tracking-tight">
        Prayer Times in {cityName}
      </h1>
      <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
        Accurate Islamic prayer times for {cityName}, {country}. Calculated
        using the UK Moonsighting Committee method.
      </p>
      <div className="mt-4 flex items-center justify-center gap-2 text-text-secondary">
        <Calendar className="w-5 h-5" />
        <span>{format(date, 'EEEE, d MMMM yyyy')}</span>
      </div>
    </div>
  )
}
