import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prayer Times',
  robots: 'noindex, nofollow',
}

export default function EmbedLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
    }}>
      {children}
    </div>
  )
}

