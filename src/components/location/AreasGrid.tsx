import Link from 'next/link'
import { MapPin, ChevronRight, Users } from 'lucide-react'
import type { Area } from '@/data/cities'

export interface AreasGridProps {
  cityName: string
  areas: Area[]
}

/**
 * AreasGrid - Displays a grid of area cards for a city
 *
 * Features:
 * - Larger, more visual cards (2 columns on mobile, responsive)
 * - Each card shows area name and masjid count prominently
 * - Hover effects for better interaction feedback
 * - "More Areas Coming Soon" CTA at the bottom
 */
export function AreasGrid({ areas, cityName }: AreasGridProps) {
  if (areas.length === 0) {
    return null
  }

  return (
    <>
      {/* Areas Grid Section */}
      <div className="bg-bg-card rounded-2xl p-4 sm:p-6 shadow-sm border border-[var(--border)] mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-4 sm:mb-6">
          Browse Areas in {cityName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </div>

      {/* Add Your Masjid CTA */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          More Areas Coming Soon
        </h3>
        <p className="text-primary-100 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
          We&apos;re continuously expanding our coverage. Don&apos;t see your
          area listed? Help us grow by adding your local masjid.
        </p>
        <Link
          href="/add-masjid"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors text-sm sm:text-base"
        >
          Add Your Masjid
        </Link>
      </div>
    </>
  )
}

interface AreaCardProps {
  area: Area
}

function AreaCard({ area }: AreaCardProps) {
  return (
    <Link
      href={`/location/${area.id}`}
      className="group relative flex flex-col p-4 sm:p-5 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200"
    >
      {/* Top row: Icon + Area name */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/40 transition-colors">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-base sm:text-lg truncate">
            {area.name}
          </h3>
        </div>
      </div>

      {/* Masjid count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-secondary">
          <Users className="w-4 h-4 text-primary-500 dark:text-primary-400" />
          <span className="text-sm font-medium">
            {area.masjid_count} masjid{area.masjid_count !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center gap-1 text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <span className="text-xs font-medium hidden sm:inline">Explore</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
