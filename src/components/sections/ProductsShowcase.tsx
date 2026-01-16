'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard, Globe, Monitor, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface ProductFeature {
  text: string
}

interface ProductCard {
  icon: React.ElementType
  title: string
  description: string
  features: ProductFeature[]
  primaryCTA: {
    label: string
    href: string
    external?: boolean
  }
  secondaryCTA?: {
    label: string
    href: string
    external?: boolean
  }
  badge?: string
  disabled?: boolean
}

const products: ProductCard[] = [
  {
    icon: LayoutDashboard,
    title: 'Admin Portal',
    description: 'Manage prayer times, announcements, and events from one intuitive dashboard',
    features: [
      { text: 'Dashboard overview' },
      { text: 'Prayer times management' },
      { text: 'Announcements & communication' },
      { text: 'Events management' },
    ],
    primaryCTA: {
      label: 'Try Admin Portal',
      href: 'https://admin.mylocalmasjid.com',
      external: true,
    },
  },
  {
    icon: Globe,
    title: 'Masjid Website',
    description: 'Beautiful, SEO-optimised website that updates automatically',
    features: [
      { text: 'Mobile responsive design' },
      { text: 'SEO optimised for local search' },
      { text: 'Automatic prayer time updates' },
      { text: 'Events and announcements' },
    ],
    primaryCTA: {
      label: 'View Demo',
      href: 'https://masjid-demo.mylocalmasjid.com',
      external: true,
    },
  },
  {
    icon: Monitor,
    title: 'Masjid Screen',
    description: 'Digital displays for prayer times in your masjid',
    features: [
      { text: 'Prayer hall display' },
      { text: 'Entrance screen' },
      { text: 'Auto-updating times' },
      { text: 'Announcement slides' },
    ],
    primaryCTA: {
      label: 'Join Waitlist',
      href: '#',
    },
    badge: 'Coming Soon',
    disabled: true,
  },
]

export function ProductsShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--background-primary)] py-24 md:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/30 via-transparent to-transparent dark:from-primary-900/10"></div>

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl font-bold text-[var(--text-primary)] md:text-5xl"
          >
            Everything Your Masjid Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]"
          >
            One platform, three powerful solutions
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-8 shadow-lg transition-all hover:shadow-xl ${
                  product.disabled ? 'opacity-90' : ''
                }`}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-block rounded-full bg-[var(--text-accent)] px-3 py-1 text-xs font-semibold text-white">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400">
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>

                {/* Title & Description */}
                <h3 className="mb-3 text-2xl font-semibold text-[var(--text-primary)]">
                  {product.title}
                </h3>
                <p className="mb-6 text-[var(--text-secondary)] leading-relaxed">
                  {product.description}
                </p>

                {/* Features List */}
                <ul className="mb-8 space-y-3 flex-grow">
                  {product.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  {/* Primary CTA */}
                  {product.disabled ? (
                    <button
                      disabled
                      className="inline-flex items-center justify-center rounded-full bg-[var(--border)] px-6 py-3 text-base font-semibold text-[var(--text-muted)] cursor-not-allowed"
                    >
                      {product.primaryCTA.label}
                    </button>
                  ) : (
                    <Link
                      href={product.primaryCTA.href}
                      target={product.primaryCTA.external ? '_blank' : undefined}
                      rel={product.primaryCTA.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--button-primary)] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[var(--button-primary-hover)] hover:shadow-lg"
                    >
                      {product.primaryCTA.label}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}

                  {/* Secondary CTA */}
                  {product.secondaryCTA && (
                    <Link
                      href={product.secondaryCTA.href}
                      target={product.secondaryCTA.external ? '_blank' : undefined}
                      rel={product.secondaryCTA.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center rounded-full border border-primary-600 bg-transparent px-6 py-3 text-base font-semibold text-primary-600 transition-all hover:bg-primary-50 hover:shadow-lg dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
                    >
                      {product.secondaryCTA.label}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
