'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl pt-24 pb-16 text-center"
      >
        <h1 className="text-5xl font-bold text-black mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-black mb-6">Page Not Found</h2>
        <p className="text-xl text-black mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="px-6 py-3 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
          Return Home
        </Link>
      </motion.div>
    </main>
  )
} 