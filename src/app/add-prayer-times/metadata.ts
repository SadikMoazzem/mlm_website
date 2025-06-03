import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Prayer Times - MyLocalMasjid',
  description: 'Add or update your Masjid\'s prayer times on MyLocalMasjid. Help keep your local community informed with the latest schedules.',
  alternates: {
    canonical: '/add-prayer-times',
  },
  openGraph: {
    title: 'Submit Prayer Times - MyLocalMasjid',
    description: 'Help keep your community informed by submitting your Masjid\'s prayer schedule.',
    url: '/add-prayer-times',
  },
  robots: {
    index: true, // Or false, similar to the report page
    follow: true,
  }
}; 