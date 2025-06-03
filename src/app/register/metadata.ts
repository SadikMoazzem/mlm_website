import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Your Masjid - MyLocalMasjid',
  description: 'Register your Masjid with MyLocalMasjid to enhance your digital presence, manage prayer times, and connect with your community.',
  alternates: {
    canonical: '/register',
  },
  openGraph: {
    title: 'Register Your Masjid with MyLocalMasjid',
    description: 'Join our platform to better serve your community.',
    url: '/register',
  },
  robots: {
    index: true, // Or false, depending on SEO strategy for this form
    follow: true,
  }
}; 