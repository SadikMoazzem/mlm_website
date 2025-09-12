import { Metadata } from 'next'
import { getMasjidById, formatMasjidDisplayName, getDisplayAddress } from '@/lib/masjid-service'

interface GenerateMetadataProps {
  params: Promise<{
    id: string
    name: string
  }>
}

// Helper function to convert URL-friendly name back to readable format
function formatMasjidName(urlName: string): string {
  return urlName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { name, id } = await params
  
  // Try to get real masjid data for better SEO
  const masjidData = await getMasjidById(id)
  
  // Use real data if available, otherwise fallback to URL name
  const masjidName = masjidData ? formatMasjidDisplayName(masjidData) : formatMasjidName(name)
  const address = masjidData ? getDisplayAddress(masjidData) : undefined
  
  // Extract city for location-based SEO
  const city = masjidData?.location?.city
  const country = masjidData?.location?.country
  
  const description = address 
    ? `${masjidName} prayer times, jamaat times, and facilities in ${address}. Live updates, Qibla direction, and Islamic calendar. Download MyLocalMasjid app for notifications.`
    : `${masjidName} prayer times, jamaat times, and facilities. Live updates, Qibla direction, and Islamic calendar. Download MyLocalMasjid app for notifications.`

  // Enhanced keywords for location-based searches
  const locationKeywords = city ? [
    `${city} masjid`,
    `${city} mosque`,
    `${city} prayer times`,
    `masjid in ${city}`,
    `mosque in ${city}`,
    ...(country ? [`${city} ${country} masjid`, `${city} ${country} mosque`] : [])
  ] : []

  return {
    title: `${masjidName} Prayer Times${city ? ` - ${city}` : ''} | MyLocalMasjid`,
    description,
    keywords: [
      masjidName,
      `${masjidName} prayer times`,
      `${masjidName} jamaat times`,
      'prayer times',
      'jamaat times',
      'salah times',
      'namaz times',
      'masjid',
      'mosque',
      'islamic center',
      'muslim prayer',
      'qibla direction',
      'islamic calendar',
      'masjid facilities',
      'MyLocalMasjid',
      ...locationKeywords
    ],
    openGraph: {
      title: `${masjidName} - MyLocalMasjid`,
      description,
      type: 'website',
      images: [
        {
          url: '/images/preview.png',
          width: 1200,
          height: 630,
          alt: `${masjidName} - MyLocalMasjid App`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${masjidName} - MyLocalMasjid`,
      description,
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: `/masjid/${id}/${name}`,
    },
    other: {
      'apple-itunes-app': `app-id=6743862734, app-argument=mylocalmasjid://modals/masjid-details?id=${id}`,
      'google-play-app': `app-id=com.moazzemlabs.mylocalmasjid, app-argument=mylocalmasjid://modals/masjid-details?id=${id}`,
    },
  }
}
