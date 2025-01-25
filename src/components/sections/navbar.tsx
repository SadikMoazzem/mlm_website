'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, LayoutDashboard, Globe, Smartphone, ChevronDown } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)

  const solutions = [
    {
      name: 'Admin Portal',
      description: 'Powerful management platform for Masjid administrators',
      href: '/solutions/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Masjid Website',
      description: 'Beautiful, modern websites for every Masjid',
      href: '/solutions/website',
      icon: Globe,
    },
    {
      name: 'Mobile App',
      description: 'Stay connected with your Masjid on the go',
      href: '/solutions/app',
      icon: Smartphone,
    },
  ]

  const navItems = [
    { name: 'Our Journey', href: '/journey' },
    { name: 'Pricing', href: '/pricing' },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100/50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto max-w-8xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="Mylocalmasjid"
              className="h-12 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900">
              My<span className="text-primary-600">Local</span>Masjid
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center space-x-8">
              {/* Solutions Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <button
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 transition-colors group-hover:text-primary-600"
                >
                  <span>Solutions</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Invisible bridge to maintain hover */}
                <div className="absolute -bottom-2 left-0 h-2 w-full"></div>

                {/* Solutions Dropdown Menu */}
                <div
                  className={`absolute left-0 top-full w-80 rounded-xl bg-white p-4 shadow-xl ring-1 ring-gray-200 transition-all duration-200 ${
                    isSolutionsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="space-y-3">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-primary-50"
                      >
                        <div className="rounded-lg bg-primary-100 p-2 text-primary-600">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-primary-600">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-12 flex items-center space-x-6">
              <Link
                href="https://admin.mylocalmasjid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-primary-600 px-6 py-2.5 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-50"
              >
                Admin Portal
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Join Us
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-full p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
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
            className="border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="space-y-4 px-4 py-6">
              {/* Mobile Solutions Menu */}
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase text-gray-500">Solutions</p>
                {solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="rounded-lg bg-primary-100 p-2 text-primary-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Other Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-gray-600 transition-colors hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-6 flex flex-col space-y-4">
                <Link
                  href="https://admin.mylocalmasjid.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-primary-600 px-6 py-2.5 text-center text-base font-semibold text-primary-600 transition-all hover:bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Portal
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-primary-600 px-6 py-2.5 text-center text-base font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
} 