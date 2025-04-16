import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const aref = localFont({
  src: '../fonts/ArefRuqaa-Regular.ttf',
  variable: '--font-aref',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mylocalmasjid.com'),
  title: 'MyLocalMasjid - Connecting Masajid to Their Communities',
  description: 'Making Masjid services more accessible and keeping your community connected and informed. From prayer times to events, we help strengthen the bond between masajid and their communities.',
  keywords: ['Masjid management', 'masjid', 'prayer times', 'islamic events', 'muslim community', 'Masjid services', 'Masjid website'],
  authors: [{ name: 'MyLocalMasjid' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'MyLocalMasjid',
    title: 'MyLocalMasjid - Connecting Masajid to Their Communities',
    description: 'Making Masjid services more accessible and keeping your community connected and informed.',
    images: [{
      url: '/images/preview.png?v=2',
      width: 1200,
      height: 630,
      alt: 'MyLocalMasjid - Modern Masjid Management Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyLocalMasjid - Connecting Masajid to Their Communities',
    description: 'Making Masjid services more accessible and keeping your community connected and informed.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MyLocalMasjid",
              "applicationCategory": "Management Software",
              "operatingSystem": "Web-based",
              "description": "Comprehensive masjid management solution featuring prayer times, event management, and community engagement tools",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "10"
              },
              "keywords": "mosque management, masjid management, prayer times, islamic events, muslim community",
              "sameAs": [
                "https://www.mylocalmasjid.com",
                "https://twitter.com/SadikMozzo"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${aref.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="min-h-screen pt-20 bg-white">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        {/* 100% privacy-first analytics */}
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      </body>
    </html>
  )
}
