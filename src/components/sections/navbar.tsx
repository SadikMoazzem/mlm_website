'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/elements/ThemeToggle'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Find Masjids', href: '/masjids' },
    { name: 'Prayer Times', href: '/prayer-times' },
    { name: 'Download App', href: '/download' },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100/50 bg-white/80 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-950/80">
      <div className="container mx-auto max-w-8xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Mylocalmasjid"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              My<span className="text-primary-600 dark:text-primary-400">Local</span>Masjid
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center space-x-8">
              {/* Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-8 flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/add-masjid"
                className="rounded-full border-2 border-primary-600 px-5 py-2 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950/50"
              >
                Add Masjid
              </Link>
              <Link
                href="/for-masjids"
                className="rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                For Masjids
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-50 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-gray-100 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="space-y-4 px-4 py-6">
              {/* Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-6 flex flex-col space-y-3">
                <div className="flex justify-center pb-2">
                  <ThemeToggle />
                </div>
                <Link
                  href="/add-masjid"
                  className="rounded-full border-2 border-primary-600 px-6 py-2.5 text-center text-base font-semibold text-primary-600 transition-all hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Masjid
                </Link>
                <Link
                  href="/for-masjids"
                  className="rounded-full bg-primary-600 px-6 py-2.5 text-center text-base font-semibold text-white transition-all hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Masjids
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
} 