import { Inter } from 'next/font/google'
// localFont removed due to font file corruption
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Arabic font removed due to file corruption

export const metadata: Metadata = {
  metadataBase: new URL('https://mylocalmasjid.com'),
  title: 'MyLocalMasjid - Prayer Times & Nearby Masjids App',
  description: 'Privacy-first Islamic app with accurate prayer times, nearby masjids, qibla compass, and real jamaat times. Download free on iOS & Android. Perfect for Muslims wherever you go.',
  keywords: ['prayer times app', 'islamic app', 'muslim app', 'masjid finder', 'mosque finder', 'qibla compass', 'jamaat times', 'ramadan app', 'prayer times', 'nearby mosque', 'islamic calendar'],
  authors: [{ name: 'MyLocalMasjid' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'MyLocalMasjid',
    title: 'MyLocalMasjid - Prayer Times & Nearby Masjids App',
    description: 'Privacy-first Islamic app with accurate prayer times, nearby masjids, qibla compass, and real jamaat times. Download free on iOS & Android.',
    images: [{
      url: '/images/preview_mobile.png',
      width: 400,
      height: 800,
      alt: 'MyLocalMasjid Islamic App - Prayer Times and Masjid Finder',
    }, {
      url: '/images/preview.png?v=2',
      width: 1200,
      height: 630,
      alt: 'MyLocalMasjid - Islamic App for Prayer Times',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyLocalMasjid - Prayer Times & Nearby Masjids App',
    description: 'Privacy-first Islamic app with accurate prayer times, nearby masjids, qibla compass, and real jamaat times. Download free!',
    images: ['/images/preview.png'],
    creator: '@mlmasjid',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1D8A77',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const isEmbedRoute = headersList.get('x-is-embed-route') === 'true'
  
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
              "applicationCategory": "Lifestyle",
              "operatingSystem": ["iOS", "Android"],
              "description": "Privacy-first Islamic app with accurate prayer times, nearby masjids, qibla compass, and real jamaat times. Perfect for Muslims wherever they go.",
              "downloadUrl": [
                "https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid",
                "https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
              ],
              "installUrl": [
                "https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid",
                "https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "screenshot": [
                "https://mylocalmasjid.com/images/preview_mobile.png",
                "https://mylocalmasjid.com/images/preview.png"
              ],
              "featureList": [
                "Accurate prayer times",
                "Nearby masjid finder", 
                "Real-time jamaat times",
                "Qibla compass",
                "Ramadan fasting tracker",
                "Privacy-first design",
                "Offline prayer times",
                "Islamic calendar"
              ],
              "keywords": "prayer times, mosque finder, masjid, qibla, islamic app, muslim app, jamaat times, ramadan",
              "sameAs": [
                "https://www.mylocalmasjid.com",
                "https://twitter.com/mlmasjid",
                "https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid",
                "https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
              ]
            })
          }}
        />
        
        {/* Mobile App Banners for Search */}
        <meta name="apple-itunes-app" content="app-id=6743862734, app-argument=https://mylocalmasjid.com" />
        <meta name="google-play-app" content="app-id=com.moazzemlabs.mylocalmasjid" />
        
        {/* App-specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MyLocalMasjid" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {isEmbedRoute ? (
          // Minimal layout for embed routes (no header/footer)
          children
        ) : (
          // Full layout for regular pages
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <div className="min-h-screen pt-20 bg-white">
              {children}
            </div>
            <Footer />
            <Analytics />
            <SpeedInsights />
            {/* 100% privacy-first analytics */}
            <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}
