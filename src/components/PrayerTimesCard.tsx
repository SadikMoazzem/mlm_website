"use client"

import React, { useMemo } from 'react'
import { CurrentPrayerTimes, SpecialPrayer } from '@/types/api'

const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'en-GB'
const BRAND_COLOR = '#1D8A77'

function formatPrayerTime(time?: string | null) {
  if (!time) return '-'
  try {
    const [hours, minutes] = time.split(':').map(Number)
    let hours12 = hours % 12
    hours12 = hours12 === 0 ? 12 : hours12
    const ampm = hours >= 12 ? 'pm' : 'am'
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`
  } catch {
    return '-'
  }
}

function timeToMinutes(time?: string | null) {
  if (!time) return 0
  const [h, m] = time.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

type PrayerRow = { name: string; start?: string | null; jamaat?: string | null; startMinutes: number }

function buildRows(pt: CurrentPrayerTimes): PrayerRow[] {
  return [
    { name: 'Fajr', start: pt.fajr_start, jamaat: pt.fajr_jammat, startMinutes: timeToMinutes(pt.fajr_start) },
    { name: 'Sunrise', start: pt.sunrise || '', jamaat: '', startMinutes: timeToMinutes(pt.sunrise) },
    { name: 'Zuhr', start: pt.dhur_start, jamaat: pt.dhur_jammat, startMinutes: timeToMinutes(pt.dhur_start) },
    { name: 'ʿAsr', start: pt.asr_start, jamaat: pt.asr_jammat, startMinutes: timeToMinutes(pt.asr_start) },
    { name: 'Maghrib', start: pt.magrib_start, jamaat: pt.magrib_jammat, startMinutes: timeToMinutes(pt.magrib_start) },
    { name: 'ʿIshā', start: pt.isha_start, jamaat: pt.isha_jammat, startMinutes: timeToMinutes(pt.isha_start) },
  ]
}

function getActivePrayer(rows: PrayerRow[]) {
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  for (let i = rows.length - 1; i >= 0; i--) {
    if (minutes >= rows[i].startMinutes) return rows[i].name
  }
  return rows[0]?.name || ''
}

export default function PrayerTimesCard({ prayerTimes, jumuahPrayers = [] }: { prayerTimes: CurrentPrayerTimes | null; jumuahPrayers?: SpecialPrayer[] }) {
  const rows = useMemo(() => (prayerTimes ? buildRows(prayerTimes) : []), [prayerTimes])
  const active = useMemo(() => getActivePrayer(rows), [rows])

  const isPassed = (prayerName: string) => {
    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()
    const row = rows.find(r => r.name === prayerName)
    if (!row) return false
    return current > row.startMinutes && active !== prayerName
  }

  return (
    <div style={{
      padding: '20px',
      background: '#ffffff',
      borderRadius: '8px',
      boxSizing: 'border-box',
      width: '100%',
      maxHeight: '100vh',
      overflowY: 'auto',
      fontFamily: 'system-ui, -apple-system, Roboto, "Segoe UI", sans-serif',
      color: '#0f172a',
      display: 'inline-block'
    }}>
      {/* Title */}
      <div style={{ 
        fontSize: '18px', 
        fontWeight: 700, 
        color: BRAND_COLOR, 
        marginBottom: '8px',
        textAlign: 'left'
      }}>
        Prayer Times
      </div>

      {/* Date - single line with bullet */}
      {prayerTimes && (
        <div style={{ 
          marginBottom: '20px', 
          color: BRAND_COLOR, 
          fontSize: '14px',
          textAlign: 'left'
        }}>
          {new Intl.DateTimeFormat(LOCALE, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(prayerTimes.date))}
          {prayerTimes.hijri_date && ` • ${prayerTimes.hijri_date}`}
        </div>
      )}

      {/* Prayer Times Table */}
      <div style={{ marginBottom: '20px' }}>
        {/* Table Headers */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 80px 80px', 
          gap: '12px',
          width: '100%',
          paddingBottom: '8px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '8px',
          fontSize: '14px',
          color: '#64748b',
          fontWeight: 400
        }}>
          <div></div>
          <div style={{ textAlign: 'right' }}>Start</div>
          <div style={{ textAlign: 'right' }}>Jamat</div>
        </div>

        {/* Prayer Rows */}
        {rows.map((row, index) => {
          const isActive = active === row.name
          const passed = isPassed(row.name)
          const activeColor = isActive ? '#27AE60' : BRAND_COLOR
          return (
            <div 
              key={row.name}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 80px 80px', 
                gap: '12px',
                width: '100%',
                padding: '10px 0',
                borderBottom: '1px solid #e2e8f0',
                fontSize: '14px',
                color: isActive ? activeColor : '#0f172a',
                fontWeight: 400,
                opacity: passed ? 0.5 : 1
              }}
            >
              <div style={{ color: isActive ? activeColor : '#0f172a' }}>{row.name}</div>
              <div style={{ textAlign: 'right', color: isActive ? activeColor : '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                {row.start ? formatPrayerTime(row.start) : '-'}
              </div>
              <div style={{ textAlign: 'right', color: isActive ? activeColor : '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                {row.jamaat ? formatPrayerTime(row.jamaat) : '-'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Jumuah Prayers Section */}

      {jumuahPrayers && jumuahPrayers.length > 0 && (
        <div>
          {/* Jumuah Section Title */}
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 700, 
            color: BRAND_COLOR, 
            marginBottom: '12px',
            textAlign: 'left'
          }}>
            Jumuah Prayers
          </div>

          {/* Jumuah Table */}
          <div>
            {/* Table Headers */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 80px 80px', 
              gap: '12px',
              width: '100%',
              paddingBottom: '8px',
              borderBottom: '1px solid #e2e8f0',
              marginBottom: '8px',
              fontSize: '14px',
              color: '#64748b',
              fontWeight: 400
            }}>
              <div></div>
              <div style={{ textAlign: 'right' }}>Start</div>
              <div style={{ textAlign: 'right' }}>Jamat</div>
            </div>

            {/* Jumuah Rows */}
            {jumuahPrayers.map((j, idx) => (
              <div 
                key={j.id || idx}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 80px 80px', 
                  gap: '12px',
                  width: '100%',
                  padding: '10px 0',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#0f172a',
                  fontWeight: 400
                }}
              >
                <div>{j.label || (idx === 0 ? 'First Jammat' : idx === 1 ? 'Second Jammat' : `Jamaat ${idx + 1}`)}</div>
                <div style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{j.start_time ? formatPrayerTime(j.start_time) : '-'}</div>
                <div style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{j.jammat_time ? formatPrayerTime(j.jammat_time) : '-'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Branding footer */}
      <div style={{
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid #e2e8f0',
        textAlign: 'right'
      }}>
        <a 
          href="https://mylocalmasjid.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block',
            color: '#64748b',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.setProperty('opacity', '0.8')
            (e.currentTarget as HTMLAnchorElement).style.setProperty('background', 'rgba(29, 138, 119, 0.05)')
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.setProperty('opacity', '1')
            (e.currentTarget as HTMLAnchorElement).style.setProperty('background', 'transparent')
          }}
        >
          My<span style={{ color: BRAND_COLOR, fontWeight: 600 }}>Local</span>Masjid
        </a>
      </div>
    </div>
  )
}


