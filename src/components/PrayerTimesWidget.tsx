'use client'

import { useEffect, useMemo, useState } from 'react'
import { CurrentPrayerTimes, SpecialPrayer } from '@/types/api'

const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'en-GB'

function formatPrayerTime(time?: string | null) {
  if (!time) return '--:--'
  try {
    const [hours, minutes] = time.split(':').map(Number)
    let hours12 = hours % 12
    hours12 = hours12 === 0 ? 12 : hours12
    const ampm = hours >= 12 ? 'pm' : 'am'
    return `${hours12}:${String(minutes).padStart(2, '0')} ${ampm}`
  } catch {
    return '--:--'
  }
}

function timeToMinutes(time?: string | null) {
  if (!time) return 0
  const [h, m] = time.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

type Prayer = { name: string; begins: string; jamaah?: string; startMinutes: number }

function formatPrayerTimesReadToPrayer(prayerTimes: CurrentPrayerTimes): Prayer[] {
  return [
    { name: 'Fajr', begins: prayerTimes.fajr_start, jamaah: prayerTimes.fajr_jammat, startMinutes: timeToMinutes(prayerTimes.fajr_start) },
    { name: 'Sunrise', begins: prayerTimes.sunrise || '', jamaah: '', startMinutes: timeToMinutes(prayerTimes.sunrise) },
    { name: 'Zuhr', begins: prayerTimes.dhur_start, jamaah: prayerTimes.dhur_jammat, startMinutes: timeToMinutes(prayerTimes.dhur_start) },
    { name: 'ʿAsr', begins: prayerTimes.asr_start, jamaah: prayerTimes.asr_jammat, startMinutes: timeToMinutes(prayerTimes.asr_start) },
    { name: 'Maghrib', begins: prayerTimes.magrib_start, jamaah: prayerTimes.magrib_jammat, startMinutes: timeToMinutes(prayerTimes.magrib_start) },
    { name: 'ʿIshā', begins: prayerTimes.isha_start, jamaah: prayerTimes.isha_jammat, startMinutes: timeToMinutes(prayerTimes.isha_start) },
  ]
}

function getCurrentPrayer(prayers: Prayer[]): string {
  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()
  for (let i = prayers.length - 1; i >= 0; i--) {
    if (current >= prayers[i].startMinutes) return prayers[i].name
  }
  return 'ʿIshā'
}

export function PrayerTimesWidget({ prayerTimes, jumuahPrayers = [] }: { prayerTimes: CurrentPrayerTimes | null; jumuahPrayers?: SpecialPrayer[] }) {
  const [activePrayer, setActivePrayer] = useState<string>('')

  const prayers: Prayer[] = useMemo(() => {
    if (!prayerTimes || !prayerTimes.fajr_start) return []
    return formatPrayerTimesReadToPrayer(prayerTimes)
  }, [prayerTimes])

  const hasPrayerTimes = prayers.length > 0 && prayers.some(p => p.begins)

  useEffect(() => {
    const update = () => { if (hasPrayerTimes) setActivePrayer(getCurrentPrayer(prayers)) }
    update()
    const i = setInterval(update, 60000)
    return () => clearInterval(i)
  }, [prayers, hasPrayerTimes])

  if (!hasPrayerTimes) {
    return (
      <div style={{ padding: 20, fontFamily: 'system-ui, -apple-system, sans-serif', color: '#64748b' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#334155' }}>Prayer Times Unavailable</div>
        <div style={{ marginTop: 8 }}>We&apos;re currently unable to display prayer times. Please check back later.</div>
      </div>
    )
  }

  const isJumuahDay = prayerTimes ? new Date(prayerTimes.date).getDay() === 5 : false
  const sortedJumuah = (jumuahPrayers || []).slice().sort((a, b) => (a.jammat_time || '').localeCompare(b.jammat_time || ''))

  return (
    <div style={{ padding: 12, fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: 12, color: '#64748b', fontSize: 13 }}>
        {prayerTimes && (
          <>
            {new Intl.DateTimeFormat(LOCALE, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(prayerTimes.date))}
            {prayerTimes.hijri_date && ` • ${prayerTimes.hijri_date}`}
          </>
        )}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 4px', fontSize: 12, color: '#64748b' }}></th>
            <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: 12, color: '#64748b' }}>Start</th>
            <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: 12, color: '#64748b' }}>Jamat</th>
          </tr>
        </thead>
        <tbody>
          {prayers.filter(p => p.name !== 'Sunrise').map(p => {
            const isActive = activePrayer === p.name
            const color = isActive ? '#2563eb' : '#64748b'
            const isJumuah = p.name === 'Zuhr' && isJumuahDay
            return (
              <tr key={p.name}>
                <td style={{ padding: '8px 4px', fontWeight: 600, color }}>{isJumuah ? "Jumu'ah" : p.name}</td>
                <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: 600, color }}>{formatPrayerTime(p.begins)}</td>
                <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: 600, color }}>{isJumuah && sortedJumuah.length > 0 ? formatPrayerTime(sortedJumuah[0].jammat_time) : (p.jamaah ? formatPrayerTime(p.jamaah) : '-')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {isJumuahDay && sortedJumuah.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Jumuah Prayers</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {sortedJumuah.map((j, i) => (
                <tr key={j.id || i}>
                  <td style={{ padding: '6px 4px', fontWeight: 600, color: '#64748b' }}>{j.label || `Jamaat ${i+1}`}</td>
                  <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 600, color: '#64748b' }}>{j.start_time || '-'}</td>
                  <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 600, color: '#64748b' }}>{formatPrayerTime(j.jammat_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


