import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { MasjidLetterDirectory } from './MasjidLetterDirectory'
import { generateMetadata } from './metadata'
import { getMasajidByLetter } from '@/lib/api-client'

export { generateMetadata }

// ISR Configuration - Weekly revalidation (604800 seconds = 7 days)
export const revalidate = 604800 // 7 days
export const dynamicParams = true // Allow dynamic letters beyond pre-cached

// Pre-generate all 26 letters A-Z
export async function generateStaticParams() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  return alphabet.map(letter => ({ 
    letter: letter.toLowerCase() 
  }))
}

interface LetterPageProps {
  params: Promise<{
    letter: string
  }>
}

export default async function LetterPage({ params }: LetterPageProps) {
  const { letter } = await params
  const upperLetter = letter.toUpperCase()
  
  // Validate letter
  if (!/^[A-Z]$/i.test(letter)) {
    notFound()
  }

  // Server-side logging
  console.log(`[SSR] Masjid directory letter page - Letter: ${upperLetter}`)

  // Fetch data for this letter with large page size
  let initialData = null
  let error = null

  try {
    console.log(`[SSR] Calling getMasajidByLetter for letter: ${upperLetter}`)
    const response = await getMasajidByLetter(upperLetter, 1, 500) // Large page size for pre-caching
    
    if (response.success && response.data) {
      initialData = {
        data: response.data.items,
        total: response.data.total,
        page: response.data.page,
        size: response.data.size,
        pages: response.data.pages,
        letter: upperLetter
      }
      console.log(`[SSR] Found ${response.data.items.length} masjids for letter ${upperLetter}`)
    } else {
      error = response.error || `Failed to load masjids for letter ${upperLetter}`
    }
  } catch (err) {
    error = `An error occurred while loading masjids for letter ${upperLetter}`
    console.error('Error loading masjids by letter:', err)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-light text-emerald-800 mb-6 tracking-tight">
              Masjids Starting with "{upperLetter}"
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Browse masjids and Islamic centers whose names begin with the letter "{upperLetter}"
            </p>
          </div>

          <Suspense fallback={<LetterLoadingSkeleton letter={upperLetter} />}>
            <MasjidLetterDirectory 
              letter={upperLetter}
              initialData={initialData}
              initialError={error}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

interface LetterLoadingSkeletonProps {
  letter: string
}

function LetterLoadingSkeleton({ letter }: LetterLoadingSkeletonProps) {
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
          <div className="h-8 bg-emerald-200 rounded w-64"></div>
        </div>
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 12 }).map((_, i) => (
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
