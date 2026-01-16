import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download MyLocalMasjid App - iOS & Android | Free Prayer Times App',
  description:
    'Download the free MyLocalMasjid app for iPhone and Android. Get accurate prayer times, find nearby masjids, and never miss salah.',
  keywords: [
    'download prayer times app',
    'islamic app download',
    'muslim app download',
    'masjid finder app',
    'mosque app',
    'qibla app',
    'prayer times ios',
    'prayer times android',
    'MyLocalMasjid download',
  ],
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download MyLocalMasjid App - iOS & Android | Free Prayer Times App',
    description:
      'Download the free MyLocalMasjid app for iPhone and Android. Get accurate prayer times, find nearby masjids, and never miss salah.',
    url: '/download',
    type: 'website',
    images: [
      {
        url: '/images/preview_mobile.png',
        width: 400,
        height: 800,
        alt: 'MyLocalMasjid App Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download MyLocalMasjid App - iOS & Android',
    description:
      'Get accurate prayer times, find nearby masjids, and never miss salah. Download for free on iOS and Android.',
    images: ['/images/preview_mobile.png'],
  },
}

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
