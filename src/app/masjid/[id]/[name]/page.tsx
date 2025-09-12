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
  
  // Generate structured data for SEO
  const structuredData = masjidData ? {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    "name": masjidData.name,
    "description": `Islamic place of worship offering prayer times, jamaat times, and community services`,
    "address": masjidData.location ? {
      "@type": "PostalAddress",
      "streetAddress": masjidData.location.full_address,
      "addressLocality": masjidData.location.city,
      "addressCountry": masjidData.location.country
    } : undefined,
    "geo": masjidData.location?.latitude && masjidData.location?.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": masjidData.location.latitude,
      "longitude": masjidData.location.longitude
    } : undefined,
    "url": `https://mylocalmasjid.com/masjid/${id}/${name}`,
    "sameAs": [
      "https://mylocalmasjid.com",
      `mylocalmasjid://modals/masjid-details?id=${id}`
    ],
    "amenityFeature": masjidData.facilities?.map(facility => ({
      "@type": "LocationFeatureSpecification",
      "name": facility.name,
      "description": facility.description,
      "value": facility.status === 'open'
    })),
    "openingHours": masjidData.current_prayer_times ? [
      `Mo-Su ${masjidData.current_prayer_times.fajr_start}-${masjidData.current_prayer_times.isha_start}`
    ] : undefined
  } : null
  
  return (
    <>
      {/* Structured Data for SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
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
    </>
  )
}
