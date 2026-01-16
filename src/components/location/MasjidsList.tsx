import Link from 'next/link'
import { Building2, ChevronRight, Clock, ExternalLink } from 'lucide-react'
import type { MasjidData } from '@/types/api'

export interface MasjidsListProps {
  locationName: string
  masjids: MasjidData[]
  showViewAll?: boolean
  viewAllUrl?: string
}

/**
 * MasjidsList - Displays a list of masjids in the location
 *
 * Shows masjid cards with:
 * - Building2 icon
 * - Masjid name linking to /masjid/{id}/{slug}
 * - Distance in km
 * - Address
 * - Fajr time preview
 * - ChevronRight indicator
 */
export function MasjidsList({
  locationName,
  masjids,
  showViewAll = false,
  viewAllUrl
}: MasjidsListProps) {
  if (masjids.length === 0) {
    return null
  }

  return (
    <div className="bg-bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border)] mb-8">
      <h3 className="font-medium text-text-primary mb-6 text-center">
        Masjids in {locationName}
      </h3>
      <div className="space-y-3">
        {masjids.map((masjid) => (
          <MasjidCard key={masjid.id} masjid={masjid} />
        ))}
      </div>

      {/* View All Link */}
      {showViewAll && viewAllUrl && (
        <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
          <Link
            href={viewAllUrl}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
          >
            View all masjids in {locationName}
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

interface MasjidCardProps {
  masjid: MasjidData
}

function formatMasjidSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function MasjidCard({ masjid }: MasjidCardProps) {
  const masjidUrl = `/masjid/${masjid.id}/${formatMasjidSlug(masjid.name)}`

  return (
    <Link
      href={masjidUrl}
      className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
            {masjid.name}
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {masjid.distance_km !== undefined && (
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {masjid.distance_km.toFixed(1)}km
              </span>
            )}
            {masjid.location && (
              <span className="truncate">{masjid.location.full_address}</span>
            )}
          </div>
        </div>
        {/* Prayer Times Preview */}
        {masjid.current_prayer_times && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted flex-shrink-0">
            <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>Fajr {masjid.current_prayer_times.fajr_start}</span>
          </div>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 ml-2" />
    </Link>
  )
}
