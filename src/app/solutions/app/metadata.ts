import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyLocalMasjid Mobile App - Prayer Times & Masjid Finder',
  description: 'Download the MyLocalMasjid app for accurate prayer times, local Masjid finder, offline access, and a privacy-focused experience. Available on iOS.',
  alternates: {
    canonical: '/solutions/app',
  },
  openGraph: {
    title: 'MyLocalMasjid Mobile App',
    description: 'Stay connected to your faith with prayer times and Masjid information on the go.',
    url: '/solutions/app',
    images: [
      {
        url: '/images/app-preview.png', // Ensure this image exists in public/images
        width: 1200,
        height: 630,
        alt: 'MyLocalMasjid Mobile App Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyLocalMasjid Mobile App - Prayer Times & Masjid Finder',
    description: 'Accurate prayer times, local Masjid finder, offline access, and privacy-focused.',
    images: ['/images/app-preview.png'], // Ensure this image exists
  },
}; 