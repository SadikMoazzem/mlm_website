'use client'

import { HeroSection } from '@/components/sections/hero'
import { ComprehensiveSolutionSection } from '@/components/sections/comprehensive-solution'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ComprehensiveSolutionSection />
    </main>
  )
}
