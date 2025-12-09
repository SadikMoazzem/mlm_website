import PrayerTimesCompact from '@/components/PrayerTimesCompact'
import { getEmbedPrayerTimesData } from '@/lib/embed.server'

export const revalidate = 3600

interface Props {
  searchParams: Promise<{ masjid_id?: string }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const masjidId = params?.masjid_id || null
  const { prayerTimes, prayerTimesWeek, jumuahPrayers } = await getEmbedPrayerTimesData(masjidId)

  return (
    <div style={{ background: 'transparent', margin: 0, padding: 0, width: '100%' }}>
      <PrayerTimesCompact prayerTimes={prayerTimes || (prayerTimesWeek && prayerTimesWeek[0]) || null} jumuahPrayers={jumuahPrayers} />
    </div>
  )
}



