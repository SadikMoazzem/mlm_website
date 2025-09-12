import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { MasjidRedirectClient } from './MasjidRedirectClient'
import { generateMetadata } from './metadata'
import { getMasjidById } from '@/lib/masjid-service'

export { generateMetadata }

interface MasjidPageProps {
  params: Promise<{
    id: string
    name: string
  }>
}

// Helper function to convert URL-friendly name back to readable format
function formatMasjidName(urlName: string): string {
  return urlName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Validate UUID format
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export default async function MasjidPage({ params }: MasjidPageProps) {
  const { id, name } = await params
  
  // Validate the UUID format
  if (!isValidUUID(id)) {
    notFound()
  }
  
  const masjidName = formatMasjidName(name)
  const deepLinkUrl = `mylocalmasjid://modals/masjid-details?id=${id}`
  
  // Fetch real masjid data from API (server-side)
  const masjidData = await getMasjidById(id)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <Suspense fallback={<div>Loading...</div>}>
          <MasjidRedirectClient 
            masjidData={masjidData}
            fallbackName={masjidName}
            deepLinkUrl={deepLinkUrl}
          />
        </Suspense>
      </div>
    </div>
  )
}
