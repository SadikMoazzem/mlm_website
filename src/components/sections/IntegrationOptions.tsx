'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Code, Smartphone, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import EmbedSelector from '@/components/EmbedSelector'
import StoreButton from '@/components/elements/StoreButton'

type OptionType = 'website' | 'embed' | 'app'

interface IntegrationOption {
  id: OptionType
  icon: React.ElementType
  title: string
  description: string
}

const options: IntegrationOption[] = [
  {
    id: 'website',
    icon: Globe,
    title: 'Dedicated Masjid Website',
    description: 'Get a beautiful, fully-managed website at yourmasjid.mylocalmasjid.com',
  },
  {
    id: 'embed',
    icon: Code,
    title: 'Embed on Your Existing Site',
    description: 'Add prayer times and announcements to your current website',
  },
  {
    id: 'app',
    icon: Smartphone,
    title: 'MyLocalMasjid App',
    description: 'Your masjid automatically appears in our mobile app',
  },
]

export function IntegrationOptions() {
  const [activeOption, setActiveOption] = useState<OptionType>('website')
  const [copiedCode, setCopiedCode] = useState(false)

  const demoUrl = 'https://masjid-demo.mylocalmasjid.com'
  const demoMasjidId = '6a75d794-ce79-405f-922d-c28197f57098'

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const embedCode = `<iframe
  src="https://mylocalmasjid.com/embed/prayer-times?masjid_id=YOUR_MASJID_ID"
  width="100%"
  height="600"
  frameborder="0"
  title="Prayer Times"
></iframe>`

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-bg-primary">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-4xl font-bold text-text-primary md:text-5xl">
            Flexible Integration Options
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Choose how to display your masjid information
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {options.map((option) => {
            const Icon = option.icon
            const isActive = activeOption === option.id

            return (
              <button
                key={option.id}
                onClick={() => setActiveOption(option.id)}
                className={`group relative flex items-center gap-3 rounded-2xl px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-xl scale-105'
                    : 'bg-bg-card text-text-primary hover:bg-bg-secondary hover:shadow-lg border border-primary-500/20'
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-primary-500'
                  }`}
                  strokeWidth={2}
                />
                <span className="font-semibold">{option.title}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-5xl"
          >
            {/* Website Option */}
            {activeOption === 'website' && (
              <div className="rounded-3xl bg-bg-card p-8 shadow-xl border border-primary-500/10">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                    <Globe className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-text-primary">
                      Dedicated Masjid Website
                    </h3>
                    <p className="text-text-secondary">
                      Get a beautiful, fully-managed website at yourmasjid.mylocalmasjid.com
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Automatic prayer times and jamaat schedule
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Jummah times, events, and announcements
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Mobile-friendly and SEO optimised
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Updates instantly from your admin panel
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-primary-600 hover:to-primary-700 hover:shadow-xl"
                  >
                    View Demo
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary-500 bg-transparent px-6 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-950/30"
                  >
                    Request Website
                  </Link>
                </div>
              </div>
            )}

            {/* Embed Option */}
            {activeOption === 'embed' && (
              <div className="rounded-3xl bg-bg-card p-8 shadow-xl border border-primary-500/10">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                    <Code className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-text-primary">
                      Embed on Your Existing Site
                    </h3>
                    <p className="text-text-secondary">
                      Add prayer times and announcements to your current website
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 font-semibold text-text-primary">
                    Choose Your Widget Style
                  </h4>
                  <EmbedSelector baseUrl="https://mylocalmasjid.com" masjidId={demoMasjidId} />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-text-primary">Sample Embed Code</h4>
                    <button
                      onClick={() => handleCopyCode(embedCode)}
                      className="flex items-center gap-2 rounded-lg bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-600 transition-all hover:bg-primary-500/20 dark:text-primary-400"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-xl bg-gray-900 dark:bg-gray-950 p-4 text-sm">
                    <code className="text-gray-100">{embedCode}</code>
                  </pre>
                  <p className="mt-3 text-sm text-text-muted">
                    Replace <code className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 text-primary-600 dark:text-primary-400">YOUR_MASJID_ID</code> with your actual masjid ID from the admin panel
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Lightweight and fast-loading
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Automatically synced with your admin updates
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Multiple style options available
                    </span>
                  </div>
                </div>

                <Link
                  href="/how-we-integrate"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-primary-600 hover:to-primary-700 hover:shadow-xl"
                >
                  Learn More About Embedding
                </Link>
              </div>
            )}

            {/* App Option */}
            {activeOption === 'app' && (
              <div className="rounded-3xl bg-bg-card p-8 shadow-xl border border-primary-500/10">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                    <Smartphone className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-text-primary">
                      MyLocalMasjid App
                    </h3>
                    <p className="text-text-secondary">
                      Your masjid automatically appears in our mobile app
                    </p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Nearby masjid discovery with live jamaat times
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Real-time prayer notifications
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Events, announcements, and Jummah details
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      Works for locals and travellers
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span className="text-text-secondary">
                      No extra setup required - just manage from your admin
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-primary-50 dark:bg-primary-950/20 p-6 mb-6 border border-primary-500/20">
                  <p className="mb-4 text-text-primary font-semibold">
                    Download the MyLocalMasjid App
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <StoreButton
                      store="AppStore"
                      href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
                      width={140}
                      height={44}
                    />
                    <StoreButton
                      store="GooglePlay"
                      href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid"
                      width={140}
                      height={44}
                    />
                  </div>
                </div>

                <p className="text-text-muted text-sm">
                  Once you register your masjid and add prayer times through the admin panel, your masjid will automatically be visible to users searching for nearby masjids in the app.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            All options are free • No technical skills required • Updates sync automatically
          </p>
        </motion.div>
      </div>
    </section>
  )
}
