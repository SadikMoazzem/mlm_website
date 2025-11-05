import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { verifyMasjidToken } from '@/lib/masjid-token'
import { getMasjidById, formatMasjidDisplayName, getDisplayAddress, getCurrentPrayerTimes } from '@/lib/masjid-service'
import UnauthorizedRedirect from './UnauthorizedRedirect'
import UploadForm from './UploadForm'

export const metadata: Metadata = {
  title: 'Masjid Upload - MyLocalMasjid',
  description: 'Admin portal for masjid administrators to upload prayer times and winter Jummah times for 2025/2026.',
}

interface MasjidUploadPageProps {
  searchParams: Promise<{
    masjid_id?: string
    token?: string
  }>
}

export default async function MasjidUploadPage({ searchParams }: MasjidUploadPageProps) {
  const { masjid_id, token } = await searchParams

  // Check if required parameters are present
  if (!masjid_id || !token) {
    return <UnauthorizedRedirect />
  }

  // Verify token
  const isTokenValid = verifyMasjidToken(token, masjid_id)
  
  if (!isTokenValid) {
    return <UnauthorizedRedirect />
  }

  // Fetch masjid data
  const masjidData = await getMasjidById(masjid_id)
  
  if (!masjidData) {
    return <UnauthorizedRedirect />
  }

  const prayerTimes = getCurrentPrayerTimes(masjidData)

  return (
    <div className="min-h-screen bg-gray-50">
      <UploadForm masjidData={masjidData} />
    </div>
  )
}
