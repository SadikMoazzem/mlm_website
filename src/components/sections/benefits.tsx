'use client'

import { motion } from 'framer-motion'
import { FaCheck, FaMapMarkedAlt, FaDesktop, FaGlobe, FaMobileAlt, FaTv, FaPray, FaPlusCircle } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

const phases = [
  {
    status: 'completed',
    title: 'Launched Salahtimez.com (2016)',
    description: 'A simple, fast prayer times app for London, providing quick access to daily salah schedules.',
    icon: FaPray,
    details: [
      'Focused on London users',
      'Web-based application',
      'Minimalist design for speed',
    ],
  },
  {
    status: 'completed',
    title: 'UK Masjid Database',
    description: 'Comprehensive database of all masajid across the United Kingdom.',
    icon: FaMapMarkedAlt,
    details: [
      'Verified Masjid information',
      'Location mapping',
    ],
  },
  {
    status: 'completed',
    title: 'Admin Dashboard',
    description: 'Powerful management platform for Masjid administrators.',
    icon: FaDesktop,
    details: [
      'Prayer times management',
      'Announcements system',
      'Events calendar',
      'Service management',
    ],
  },
  {
    status: 'completed',
    title: 'Masjid Websites',
    description: 'Beautiful, modern websites for every Masjid.',
    icon: FaGlobe,
    details: [
      'SEO optimized',
      'Mobile responsive',
      'Prayer times integration',
      'Events showcase',
    ],
  },
  {
    status: 'completed',
    title: 'Initial Platform Beta',
    description: 'Onboarded initial Masjids for testing and feedback, refining core features.',
    icon: FaCheck,
    details: [
      'User feedback collection',
      'System optimization',
      'Core feature refinement',
      'Performance testing',
    ],
  },
  {
    status: 'completed',
    title: 'MyLocalMasjid Mobile App',
    description: 'Launched the MyLocalMasjid app for the community.',
    icon: FaMobileAlt,
    details: [
      'Prayer time notifications',
      'Masjid finder',
      'iOS App Launched',
      'Community updates',
    ],
  },
  {
    status: 'current',
    title: 'Platform Expansion & Hall Onboarding',
    description: 'Expanding our services to include Masjid halls and community spaces, alongside ongoing app development (Android).',
    icon: FaPlusCircle,
    details: [
      'Developing Masjid hall booking features',
      'Onboarding community halls and event spaces',
      'Android app development in progress',
      'Continuous platform improvements',
    ],
  },
  {
    status: 'upcoming',
    title: 'Masjid TV View',
    description: 'Digital displays for prayer times and announcements.',
    icon: FaTv,
    details: [
      'Prayer time displays',
      'Announcement boards',
      'Event schedules',
      'Multi-screen support',
    ],
    comingSoon: true,
  },
  {
    status: 'upcoming',
    title: 'UK Wide Coverage & Features',
    description: 'Expanding services and features across the United Kingdom.',
    icon: FaMapMarkedAlt,
    details: [
      'Full UK rollout',
      'Advanced community partnerships',
      'Enhanced support network',
      'Localized features & events',
    ],
    comingSoon: true,
  },
]

export function BenefitsSection() {
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const currentPhaseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Find the index of the current phase
    const currentPhaseIndex = phases.findIndex(phase => phase.status === 'current');
    if (currentPhaseIndex !== -1 && currentPhaseRef.current) {
      // Scroll to the current phase element
      // We use a small timeout to ensure the element is rendered and layout is complete
      setTimeout(() => {
        currentPhaseRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center' 
        });
      }, 100);
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4 py-32">
      <div className="pattern-islamic absolute inset-0 opacity-5" />
      
      <div className="container relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
          >
            Our Journey
          </motion.span>
          <h2 className="mb-4 font-heading text-4xl font-bold text-gray-900 md:text-5xl">
            Building the Future of{' '}
            <span className="text-primary-600">Masjid Management</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            From digital transformation to community connection, follow our journey of innovation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary-200 via-primary-300 to-gray-200" />

          {/* Phases */}
          <div className="space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                id={phase.status === 'current' ? 'current-journey-step' : undefined}
                ref={phase.status === 'current' ? currentPhaseRef : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setActivePhase(index)}
                onMouseLeave={() => setActivePhase(null)}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-300
                    ${phase.status === 'completed' ? 'border-green-500 bg-green-100' : 
                      phase.status === 'current' ? 'border-primary-500 bg-primary-100' :
                      'border-gray-400 bg-gray-100'}`}
                />

                {/* Content */}
                <div className={`grid gap-8 ${index % 2 === 0 ? 'md:grid-cols-[1fr,1fr]' : 'md:grid-cols-[1fr,1fr] md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1'}`}>
                  {/* Icon and Title */}
                  <div className="flex items-center justify-center md:justify-start">
                    <motion.div
                      className={`group relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl
                        ${phase.status === 'completed' ? 'border-green-100' :
                          phase.status === 'current' ? 'border-primary-100' :
                          'border-gray-100'}
                        ${activePhase === index ? 'scale-105' : ''}`}
                    >
                      <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-xl
                        ${phase.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                          phase.status === 'current' ? 'bg-primary-500/10 text-primary-500' :
                          'bg-gray-500/10 text-gray-500'}`}
                      >
                        <phase.icon className="h-8 w-8" />
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                          {phase.title}
                          {phase.comingSoon && (
                            <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-semibold text-yellow-600">
                              Coming Soon
                            </span>
                          )}
                        </h3>
                      </div>
                      <p className="text-gray-600">{phase.description}</p>
                    </motion.div>
                  </div>

                  {/* Details */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activePhase === index ? 1 : 0.5 }}
                    className="flex items-center justify-center md:justify-start"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {phase.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className={`rounded-lg bg-white/80 p-4 shadow-md backdrop-blur-sm
                            ${phase.status === 'completed' ? 'border-l-4 border-green-500' :
                              phase.status === 'current' ? 'border-l-4 border-primary-500' :
                              'border-l-4 border-gray-400'}`}
                        >
                          <p className="text-sm text-gray-600">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 