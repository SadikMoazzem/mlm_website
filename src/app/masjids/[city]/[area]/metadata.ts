import { Metadata } from 'next'
import { getCityById, getAreaById } from '@/data/cities'

interface AreaPageProps {
  params: Promise<{ city: string; area: string }>
}

/**
 * Generate SEO-optimised metadata for area pages
 * Creates dynamic titles, descriptions, and keywords based on city and area data
 */
export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { city: cityId, area: areaId } = await params

  const city = getCityById(cityId)
  const area = getAreaById(cityId, areaId)

  if (!city || !area) {
    return {
      title: 'Area Not Found',
    }
  }

  // Extract sub-areas from the area description (comma-separated locations)
  const subAreas = area.description
    ? area.description.split(',').map(s => s.trim())
    : []

  // Generate comprehensive keywords including:
  // - Primary area search terms
  // - Mosque/masjid variations
  // - Prayer time searches
  // - Islamic center searches
  // - Nearby area searches
  // - Sub-area specific terms
  const keywords = [
    // Primary area keywords
    `masjids in ${area.name}`,
    `mosques ${area.name}`,
    `prayer times ${area.name}`,
    `${area.name} islamic center`,
    `masjids near ${area.name}`,

    // City context keywords
    `${area.name} ${city.name} masjid`,
    `${area.name} ${city.name} mosque`,

    // Prayer-related keywords
    `${area.name} prayer times`,
    `${area.name} salah times`,
    `${area.name} jummah`,

    // Sub-area keywords (from description)
    ...subAreas.map(subArea => `${subArea} mosque`),
    ...subAreas.map(subArea => `${subArea} masjid`),
    ...subAreas.map(subArea => `prayer times ${subArea}`),
  ]

  // Generate description with area context and masjid count
  const description = area.description
    ? `Find ${area.masjid_count} masjids in ${area.name}, ${city.name}. Covering ${area.description}. View prayer times, facilities, and Islamic community services.`
    : `Discover ${area.masjid_count} masjids and Islamic centers in ${area.name}, ${city.name}. Find prayer times, facilities, and community information.`

  return {
    title: `Masjids in ${area.name}, ${city.name} - Prayer Times & Islamic Centers`,
    description,
    keywords,
    openGraph: {
      title: `Masjids in ${area.name}, ${city.name}`,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `/masjids/${cityId}/${areaId}`,
    },
  }
}
