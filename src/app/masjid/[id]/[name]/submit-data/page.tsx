import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getMasjidById } from '@/lib/masjid-service'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { SubmitDataClient } from './SubmitDataClient'

interface SubmitDataPageProps {
  params: Promise<{
    id: string
    name: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SubmitDataPageProps): Promise<Metadata> {
  const { id } = await params
  const masjid = await getMasjidById(id)

  if (!masjid) {
    return {
      title: 'Masjid Not Found',
      description: 'The requested masjid could not be found.'
    }
  }

  return {
    title: `Submit Data - ${masjid.name}`,
    description: `Help keep ${masjid.name} information up to date. Submit prayer times, Jummah schedules, facilities info, and more.`,
    openGraph: {
      title: `Submit Data - ${masjid.name}`,
      description: `Help keep ${masjid.name} information up to date. Submit prayer times, Jummah schedules, facilities info, and more.`,
      type: 'website'
    }
  }
}

// Validate UUID format
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export default async function SubmitDataPage({ params }: SubmitDataPageProps) {
  const { id } = await params

  // Validate the UUID format
  if (!isValidUUID(id)) {
    notFound()
  }

  // Fetch masjid data from API (server-side)
  const masjid = await getMasjidById(id)

  // Return 404 if masjid not found
  if (!masjid) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SubmitDataClient masjid={masjid} />
    </Suspense>
  )
}
