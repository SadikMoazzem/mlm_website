import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://mylocalmasjid.com'),
  title: 'MyLocalMasjid - Connecting Masajid to Their Communities',
  description: 'Established in 2020, making Masjid services more accessible and keeping your community connected and informed. From prayer times to events, we help strengthen the bond between masajid and their communities.',
  keywords: [
    'Masjid management',
    'Mosque management',
    'Mosque website',
    'Masjid website',
    'Prayer times',
    'Mosque prayer times',
    'Masjid prayer times',
    'Islamic events',
    'Muslim community',
    'Masjid services',
    'Mosque services',
    'Islamic center management',
    'Mosque administration',
    'Masjid administration',
    'Muslim prayer times',
    'Local mosque finder',
    'Local masjid finder',
    'Islamic community platform',
    'Mosque donation management',
    'Masjid donation system'
  ],
  authors: [{ name: 'MyLocalMasjid' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'MyLocalMasjid',
    title: 'MyLocalMasjid - Connecting Masajid to Their Communities',
    description: 'Established in 2020, making Masjid services more accessible and keeping your community connected and informed.',
    images: [{
      url: '/images/preview.png',
      width: 1200,
      height: 630,
      alt: 'MyLocalMasjid - Modern Masjid Management Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyLocalMasjid - Connecting Masajid to Their Communities',
    description: 'Established in 2020, making Masjid services more accessible and keeping your community connected and informed.',
    images: ['/images/preview.png'],
    creator: '@SadikMozzo',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#1D8A77',
} 