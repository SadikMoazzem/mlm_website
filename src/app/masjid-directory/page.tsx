import { Suspense } from 'react'
import { generateMetadata } from './metadata'
import Link from 'next/link'

export { generateMetadata }

// ISR Configuration
export const revalidate = 86400 // 24 hours
export const dynamicParams = true // Allow dynamic pages beyond pre-cached

// Pre-generate first 10 pages (200 masjids)
export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ 
    page: (i + 1).toString() 
  }))
}

export default function MasjidDirectoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-light text-emerald-800 mb-6 tracking-tight">
              Masjid Directory A-Z
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Browse our complete alphabetical directory of masjids and Islamic centers worldwide
            </p>
          </div>

          <DirectoryAlphabetGrid />
        </div>
      </div>
    </div>
  )
}

function DirectoryAlphabetGrid() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="space-y-8">
      {/* Quick Links */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-4 bg-emerald-50 rounded-full px-6 py-3">
          <span className="text-sm font-medium text-emerald-800">Quick Access:</span>
          <Link 
            href="/masjids" 
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
          >
            Browse by Location
          </Link>
          <span className="text-emerald-300">•</span>
          <Link 
            href="/add-prayer-times" 
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
          >
            Add Your Masjid
          </Link>
        </div>
      </div>

      {/* Alphabet Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Browse Masjids by First Letter
        </h2>
        <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-4">
          {alphabet.map(letter => (
            <Link
              key={letter}
              href={`/masjid-directory/${letter.toLowerCase()}`}
              className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 hover:border-emerald-300 rounded-xl p-4 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-2xl font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors">
                {letter}
              </div>
              <div className="text-xs text-emerald-600 group-hover:text-emerald-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Browse
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Comprehensive Masjid Directory
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our directory contains thousands of masjids and Islamic centers worldwide. 
          Each page is pre-cached and updated weekly for optimal performance and SEO.
        </p>
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            <span>Pre-cached Pages</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Weekly Updates</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span>SEO Optimized</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DirectoryLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Alphabet navigation skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
      
      {/* List skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
        <div className="p-6 border-b border-gray-200">
          <div className="h-8 bg-emerald-200 rounded w-48"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-6">
              <div className="h-6 bg-emerald-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
