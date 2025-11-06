import PrayerTimesCompact from '@/components/PrayerTimesCompact'
import PrayerTimesCard from '@/components/PrayerTimesCard'
import { getEmbedPrayerTimesData } from '@/lib/embed.server'
import { PrayerTimesWidget } from '@/components/PrayerTimesWidget'

export const revalidate = 7200

interface Props {
  params: {
    masjid_id: string
    variant: string
  }
}

export default async function Page({ params }: Props) {
  const { masjid_id: masjidId, variant } = params
  const { prayerTimes, prayerTimesWeek, jumuahPrayers } = await getEmbedPrayerTimesData(masjidId)

  const data = prayerTimes || (prayerTimesWeek && prayerTimesWeek[0]) || null

  if (variant === 'compact') {
    return <PrayerTimesCompact prayerTimes={data} jumuahPrayers={jumuahPrayers} />
  }

  if (variant === 'card') {
    return <PrayerTimesCard prayerTimes={data} jumuahPrayers={jumuahPrayers} />
  }

  // Fallback to main widget for unknown variant
  return <PrayerTimesWidget prayerTimes={data} prayerTimesWeek={prayerTimesWeek} jumuahPrayers={jumuahPrayers} />
}


