'use client'

import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const aref = localFont({
  src: '../fonts/ArefRuqaa-Regular.ttf',
  variable: '--font-aref',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>My Local Masjid - Connecting Masjids to Their Communities</title>
        <meta
          name="description"
          content="Making Masjid services more accessible and keeping your community connected and informed. From prayer times to events, we help strengthen the bond between masajid and their communities."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1D8A77" />
      </head>
      <body className={`${inter.variable} ${aref.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
