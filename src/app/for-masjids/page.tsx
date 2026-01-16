import type { Metadata } from 'next'
import { ForMasjidsHero } from '@/components/sections/ForMasjidsHero'
import { ProductsShowcase } from '@/components/sections/ProductsShowcase'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { IntegrationOptions } from '@/components/sections/IntegrationOptions'
import { MasjidCTA } from '@/components/sections/MasjidCTA'

export const metadata: Metadata = {
  title: 'For Masjids - Free Digital Solutions | MyLocalMasjid',
  description:
    'Get a free admin portal, website, and app listing for your masjid. Manage prayer times, announcements, and events - no technical skills needed.',
}

export default function ForMasjidsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-bg-primary">
      <ForMasjidsHero />
      <ProductsShowcase />
      <HowItWorks />
      <IntegrationOptions />
      <MasjidCTA />
    </main>
  )
}
