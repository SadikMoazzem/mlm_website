import { Metadata } from 'next'

interface GenerateMetadataProps {
  params: Promise<{
    letter: string
  }>
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { letter } = await params
  const upperLetter = letter.toUpperCase()
  
  return {
    title: `Masjids Starting with "${upperLetter}" - Directory | MyLocalMasjid`,
    description: `Browse masjids and Islamic centers whose names begin with the letter "${upperLetter}". Find prayer times, facilities, and community information.`,
    keywords: [
      `masjids starting with ${upperLetter}`,
      `${upperLetter} masjids`,
      `${upperLetter} mosques`,
      'masjid directory',
      'mosque directory',
      'prayer times',
      'islamic centers',
      'MyLocalMasjid',
    ],
    openGraph: {
      title: `Masjids Starting with "${upperLetter}" - MyLocalMasjid`,
      description: `Browse masjids and Islamic centers whose names begin with the letter "${upperLetter}".`,
      type: 'website',
      images: [
        {
          url: '/images/preview.png',
          width: 1200,
          height: 630,
          alt: `MyLocalMasjid - ${upperLetter} Directory`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Masjids Starting with "${upperLetter}" - MyLocalMasjid`,
      description: `Browse masjids and Islamic centers whose names begin with the letter "${upperLetter}".`,
      images: ['/images/preview.png'],
    },
    alternates: {
      canonical: `/masjid-directory/${letter}`,
    },
  }
}
