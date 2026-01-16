'use client'

import { ConsumerHero } from '@/components/sections/ConsumerHero'
import { QuickCityAccess } from '@/components/sections/QuickCityAccess'
import { FeatureHighlights } from '@/components/sections/FeatureHighlights'
import { AppShowcase } from '@/components/sections/AppShowcase'
import { ForMasjidsTeaser } from '@/components/sections/ForMasjidsTeaser'
import { WebsiteSearchSchema } from '@/components/schema/WebsiteSearchSchema'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <WebsiteSearchSchema />
      <ConsumerHero />
      <QuickCityAccess />
      <AppShowcase />
      <FeatureHighlights />
      <ForMasjidsTeaser />
    </main>
  )
}
