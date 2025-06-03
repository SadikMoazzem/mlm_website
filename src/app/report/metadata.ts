import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report an Issue - MyLocalMasjid',
  description: 'Report a bug or issue with the MyLocalMasjid platform. Help us improve our services for the community.',
  alternates: {
    canonical: '/report',
  },
  openGraph: {
    title: 'Report an Issue - MyLocalMasjid',
    description: 'Help us improve MyLocalMasjid by reporting any bugs or issues.',
    url: '/report',
  },
  robots: { // Good to ensure non-essential forms aren't heavily indexed if not desired
    index: true, // Or false if you prefer this not to be prominent in SERPs
    follow: true,
  }
}; 