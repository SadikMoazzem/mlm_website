'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/sections/hero'
import { ComprehensiveSolutionSection } from '@/components/sections/comprehensive-solution'
import { RegistrationModal } from '@/components/sections/registration-modal'

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection onOpenRegistration={() => setIsRegistrationOpen(true)} />
      <ComprehensiveSolutionSection />
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
    </main>
  )
}
