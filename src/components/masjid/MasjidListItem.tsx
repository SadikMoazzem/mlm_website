import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { formatMasjidUrlName } from '@/lib/masjid-service'

export interface MasjidListItemProps {
  id: string
  name: string
  address: string
  distance?: number // in km
  city?: string
  showDistance?: boolean
}

export function MasjidListItem({
  id,
  name,
  address,
  distance,
  city,
  showDistance = false
}: MasjidListItemProps) {
  const masjidUrl = `/masjid/${id}/${formatMasjidUrlName(name)}`

  return (
    <Link href={masjidUrl}>
      <div className="group bg-white border border-gray-200 hover:border-emerald-300 rounded-xl p-5 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div className="space-y-3">
          {/* Masjid Name */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-emerald-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
              {name}
            </h3>
            {showDistance && distance !== undefined && (
              <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {distance.toFixed(1)} km
              </span>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-200">
            <div className="p-1.5 bg-gray-100 group-hover:bg-emerald-100 rounded-lg mr-3 transition-colors flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-gray-500 group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-sm text-gray-600 group-hover:text-gray-800 leading-relaxed transition-colors line-clamp-2">
              {address}
              {city && !address.includes(city) && <span className="text-gray-500">, {city}</span>}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
