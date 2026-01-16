import Link from 'next/link'
import { Building2 } from 'lucide-react'

export interface LocationComingSoonProps {
  locationName: string
}

/**
 * LocationComingSoon - Shown when no masjids are found in a location
 *
 * Displays an encouraging message with a gradient background encouraging users to:
 * - Help grow the directory by adding masjids
 * - Contribute to the Muslim community
 *
 * Follows the styling patterns from existing CTA sections in prayer-times and masjids pages.
 */
export function LocationComingSoon({ locationName }: LocationComingSoonProps) {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white text-center mb-8">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
        <Building2 className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Masjids Coming Soon</h2>
      <p className="text-primary-100 mb-6 max-w-md mx-auto">
        We&apos;re expanding our coverage to {locationName}. Help the Muslim
        community by adding masjids to our directory.
      </p>
      <Link
        href="/add-masjid"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
      >
        Add Your Masjid
      </Link>
      <p className="text-primary-100 text-sm mt-4">
        Your contribution helps others find places to pray
      </p>
    </div>
  )
}
