import { PrayerTimesWidget } from '@/components/PrayerTimesWidget'
import { getEmbedPrayerTimesData } from '@/lib/embed.server'

export const revalidate = 7200 // 2 hours

interface Props {
  params: {
    masjid_id: string
  }
}

export default async function Page({ params }: Props) {
  const masjidId = params?.masjid_id || null
  const { prayerTimes, prayerTimesWeek, jumuahPrayers } = await getEmbedPrayerTimesData(masjidId)

  return (
    <div style={{ background: '#fff', margin: 0, padding: 0, width: '100%' }}>
      <PrayerTimesWidget prayerTimes={prayerTimes || (prayerTimesWeek && prayerTimesWeek[0]) || null} prayerTimesWeek={prayerTimesWeek} jumuahPrayers={jumuahPrayers} />
    </div>
  )
}


