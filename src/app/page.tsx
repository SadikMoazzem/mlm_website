'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/sections/hero'
import { FeaturesSection } from '@/components/sections/features'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { BenefitsSection } from '@/components/sections/benefits'
import { RegistrationModal } from '@/components/sections/registration-modal'

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection onOpenRegistration={() => setIsRegistrationOpen(true)} />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection onOpenRegistration={() => setIsRegistrationOpen(true)} />
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
    </main>
  )
}
