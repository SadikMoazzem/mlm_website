import { Metadata } from 'next'

interface GenerateMetadataProps {
  params: {
    id: string
    name: string
  }
}

// Helper function to convert URL-friendly name back to readable format
function formatMasjidName(urlName: string): string {
  return urlName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function generateMetadata({ params }: GenerateMetadataProps): Metadata {
  const { name } = params
  const masjidName = formatMasjidName(name)
  
  return {
    title: `${masjidName} - Prayer Times & Updates | MyLocalMasjid`,
    description: `Get accurate prayer times, jamaat times, and updates for ${masjidName}. Download the MyLocalMasjid app for the best experience.`,
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
      description: `Access prayer times and updates for ${masjidName} through the MyLocalMasjid app.`,
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
      description: `Get prayer times and updates for ${masjidName} with the MyLocalMasjid app.`,
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: `/masjid/${params.id}/${params.name}`,
    },
  }
}
