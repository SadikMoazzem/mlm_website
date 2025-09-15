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
  
  // Enhanced description for prayer times searches
  const description = address 
    ? `${masjidName} prayer times and jamaat times in ${address}. Live Fajr, Dhuhr, Asr, Maghrib, Isha prayer times. Qibla direction, Islamic calendar, and masjid facilities. Download MyLocalMasjid app.`
    : `${masjidName} prayer times and jamaat times. Live Fajr, Dhuhr, Asr, Maghrib, Isha prayer times. Qibla direction, Islamic calendar, and masjid facilities. Download MyLocalMasjid app.`

  // Enhanced keywords for "prayer times [location] masjid" searches
  const locationKeywords = city ? [
    `prayer times ${city}`,
    `${city} prayer times`,
    `${city} masjid prayer times`,
    `${city} mosque prayer times`,
    `prayer times ${city} masjid`,
    `prayer times ${city} mosque`,
    `${city} masjid`,
    `${city} mosque`,
    `masjid in ${city}`,
    `mosque in ${city}`,
    `${city} jamaat times`,
    `salah times ${city}`,
    `namaz times ${city}`,
    ...(country ? [
      `prayer times ${city} ${country}`,
      `${city} ${country} masjid`,
      `${city} ${country} mosque`,
      `${city} ${country} prayer times`
    ] : [])
  ] : []

  return {
    title: `${masjidName} Prayer Times${city ? ` - ${city}` : ''} | MyLocalMasjid`,
    description,
    keywords: [
      // Primary prayer times keywords (most important for search)
      `prayer times ${masjidName.toLowerCase()}`,
      `${masjidName} prayer times`,
      `${masjidName} jamaat times`,
      `${masjidName} salah times`,
      
      // Location-based prayer times (high priority)
      ...locationKeywords,
      
      // General prayer times keywords
      'prayer times',
      'jamaat times',
      'salah times',
      'namaz times',
      'fajr prayer time',
      'dhuhr prayer time',
      'asr prayer time',
      'maghrib prayer time',
      'isha prayer time',
      
      // Masjid identification
      masjidName,
      'masjid',
      'mosque',
      'islamic center',
      'muslim prayer',
      
      // Additional features
      'qibla direction',
      'islamic calendar',
      'masjid facilities',
      'MyLocalMasjid'
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
