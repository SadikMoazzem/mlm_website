import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Masjids Directory - Find Mosques & Islamic Centers | MyLocalMasjid',
    description: 'Discover masjids and Islamic centers worldwide. Find prayer times, facilities, and connect with your local Muslim community. Search by location, type, and more.',
    keywords: [
      'masjids directory',
      'mosque finder',
      'islamic centers',
      'prayer times',
      'muslim community',
      'mosque locator',
      'islamic places of worship',
      'jamaat times',
      'qibla direction',
      'MyLocalMasjid'
    ],
    openGraph: {
      title: 'Masjids Directory - MyLocalMasjid',
      description: 'Discover masjids and Islamic centers worldwide. Find prayer times, facilities, and connect with your local Muslim community.',
      type: 'website',
      images: [
        {
          url: '/images/preview.png',
          width: 1200,
          height: 630,
          alt: 'MyLocalMasjid - Masjids Directory',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Masjids Directory - MyLocalMasjid',
      description: 'Discover masjids and Islamic centers worldwide. Find prayer times, facilities, and connect with your local Muslim community.',
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: '/masjids',
    },
  }
}
