import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Masjid Directory A-Z - Complete List of Mosques | MyLocalMasjid',
    description: 'Browse our complete A-Z directory of masjids and Islamic centers worldwide. Find prayer times, facilities, and community information for every mosque.',
    keywords: [
      'masjid directory',
      'mosque directory',
      'A-Z masjid list',
      'complete mosque list',
      'islamic centers directory',
      'prayer times',
      'mosque finder',
      'MyLocalMasjid',
      'masjid names',
      'mosque names',
    ],
    openGraph: {
      title: 'Masjid Directory A-Z - MyLocalMasjid',
      description: 'Browse our complete A-Z directory of masjids and Islamic centers worldwide. Find prayer times, facilities, and community information.',
      type: 'website',
      images: [
        {
          url: '/images/preview.png',
          width: 1200,
          height: 630,
          alt: 'MyLocalMasjid A-Z Directory',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Masjid Directory A-Z - MyLocalMasjid',
      description: 'Browse our complete A-Z directory of masjids and Islamic centers worldwide.',
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: '/masjid-directory',
    },
  }
}
