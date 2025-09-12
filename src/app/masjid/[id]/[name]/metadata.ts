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
  
  const description = address 
    ? `Get accurate prayer times, jamaat times, and updates for ${masjidName} in ${address}. Download the MyLocalMasjid app for the best experience.`
    : `Get accurate prayer times, jamaat times, and updates for ${masjidName}. Download the MyLocalMasjid app for the best experience.`

  return {
    title: `${masjidName} - Prayer Times & Updates | MyLocalMasjid`,
    description,
    keywords: [
      masjidName,
      'prayer times',
      'jamaat times',
      'masjid',
      'mosque',
      'islamic app',
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
  }
}
