import { PrayerTimesWidget } from '@/components/PrayerTimesWidget'
import { getEmbedPrayerTimesData } from '@/lib/embed.server'

export const revalidate = 3600 // 1 hour

interface Props {
  searchParams: Promise<{ masjid_id?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const masjidId = params?.masjid_id || null;
  const { prayerTimes, jumuahPrayers } = await getEmbedPrayerTimesData(masjidId);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', margin: 0, padding: 0 }}>
      <PrayerTimesWidget prayerTimes={prayerTimes} jumuahPrayers={jumuahPrayers} />
    </div>
  )
}


