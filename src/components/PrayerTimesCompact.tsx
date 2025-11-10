"use client"

import React, { useMemo } from 'react'
import { CurrentPrayerTimes, SpecialPrayer } from '@/types/api'

const LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'en-GB'
const BRAND_COLOR = '#1D8A77'
const TEXT_COLOR = '#0f172a'
const MUTED = '#64748b'

function fmt24(time?: string | null) {
  if (!time) return '-'
  try {
    const [h, m] = time.split(':').map(Number)
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  } catch {
    return '-'
  }
}

function minutes(time?: string | null) {
  if (!time) return 0
  const [h, m] = time.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export default function PrayerTimesCompact({ prayerTimes, jumuahPrayers = [] }: { prayerTimes: CurrentPrayerTimes | null; jumuahPrayers?: SpecialPrayer[] }) {
  const rows = useMemo(() => {
    if (!prayerTimes) return []
    return [
      { name: 'Fajr', athan: prayerTimes.fajr_start, iqamah: prayerTimes.fajr_jammat, m: minutes(prayerTimes.fajr_start) },
      { name: 'Sunrise', athan: prayerTimes.sunrise || '', iqamah: '', m: minutes(prayerTimes.sunrise) },
      { name: 'Zuhr', athan: prayerTimes.dhur_start, iqamah: prayerTimes.dhur_jammat, m: minutes(prayerTimes.dhur_start) },
      { name: 'ʿAsr', athan: prayerTimes.asr_start, iqamah: prayerTimes.asr_jammat, m: minutes(prayerTimes.asr_start) },
      { name: 'Maghrib', athan: prayerTimes.magrib_start, iqamah: prayerTimes.magrib_jammat, m: minutes(prayerTimes.magrib_start) },
      { name: 'ʿIshā', athan: prayerTimes.isha_start, iqamah: prayerTimes.isha_jammat, m: minutes(prayerTimes.isha_start) },
    ]
  }, [prayerTimes])

  const active = useMemo(() => {
    const now = new Date()
    const cur = now.getHours() * 60 + now.getMinutes()
    for (let i = rows.length - 1; i >= 0; i--) {
      if (cur >= rows[i].m) return rows[i].name
    }
    return rows[0]?.name || ''
  }, [rows])

  const prayers = ['Fajr', 'Sunrise', 'Zuhr', 'ʿAsr', 'Maghrib', 'ʿIshā']
  const getTime = (prayerName: string, type: 'athan' | 'iqamah') => {
    const row = rows.find(r => r.name === prayerName)
    if (!row) return '-'
    return type === 'athan' ? row.athan : row.iqamah
  }

  const isPassed = (prayerName: string) => {
    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()
    const row = rows.find(r => r.name === prayerName)
    if (!row) return false
    return current > row.m && active !== prayerName
  }

  const getActiveJumuah = useMemo(() => {
    if (!prayerTimes) return null
    const today = new Date(prayerTimes.date)
    const isFriday = today.getDay() === 5
    if (!isFriday || !jumuahPrayers || jumuahPrayers.length === 0) return null

    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()

    // Create array with original index
    const withIndex = jumuahPrayers.map((j, idx) => ({ j, idx }))
    // Sort by jammat_time
    const sorted = withIndex.sort((a, b) => {
      const aTime = a.j.jammat_time ? minutes(a.j.jammat_time) : Infinity
      const bTime = b.j.jammat_time ? minutes(b.j.jammat_time) : Infinity
      return aTime - bTime
    })

    for (let i = 0; i < sorted.length; i++) {
      const { j, idx } = sorted[i]
      if (!j.jammat_time) continue
      const jammatMinutes = minutes(j.jammat_time)
      
      if (current < jammatMinutes) continue // Not started yet
      
      // Check if this is the last one
      if (i === sorted.length - 1) {
        // Active for 15 minutes after jammat
        if (current <= jammatMinutes + 15) return idx
      } else {
        // Active until next jammat starts
        const nextJ = sorted[i + 1]
        if (nextJ.j.jammat_time && current < minutes(nextJ.j.jammat_time)) {
          return idx
        }
      }
    }
    return null
  }, [prayerTimes, jumuahPrayers])

  const isJumuahPassed = (jumuahIndex: number) => {
    if (!prayerTimes) return false
    const today = new Date(prayerTimes.date)
    const isFriday = today.getDay() === 5
    if (!isFriday) return false

    const now = new Date()
    const current = now.getHours() * 60 + now.getMinutes()
    const j = jumuahPrayers[jumuahIndex]
    if (!j || !j.jammat_time) return false

    const jammatMinutes = minutes(j.jammat_time)
    const activeIndex = getActiveJumuah
    
    // If this is the active one, not passed
    if (activeIndex === jumuahIndex) return false
    
    // Check if it's the last one - passed if more than 15 minutes after
    const withIndex = jumuahPrayers.map((jj, idx) => ({ j: jj, idx }))
    const sorted = withIndex.sort((a, b) => {
      const aTime = a.j.jammat_time ? minutes(a.j.jammat_time) : Infinity
      const bTime = b.j.jammat_time ? minutes(b.j.jammat_time) : Infinity
      return aTime - bTime
    })
    const sortedItem = sorted.find(item => item.idx === jumuahIndex)
    if (sortedItem) {
      const sortedIndex = sorted.indexOf(sortedItem)
      if (sortedIndex === sorted.length - 1) {
        return current > jammatMinutes + 15
      }
    }
    
    // Otherwise passed if current time is past this jammat
    return current > jammatMinutes
  }

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, Roboto, "Segoe UI", sans-serif', 
      background: 'transparent', 
      color: TEXT_COLOR,
      padding: '12px',
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '1em'
    }}>
      {/* Date header - single line */}
      {prayerTimes && (
        <div style={{ 
          textAlign: 'center', 
          color: MUTED, 
          fontSize: '0.8125em',
          marginBottom: '12px',
          fontWeight: 500
        }}>
          {new Intl.DateTimeFormat(LOCALE, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(prayerTimes.date))}
          {prayerTimes.hijri_date && ` • ${prayerTimes.hijri_date}`}
        </div>
      )}

      {/* Prayer names as column headers */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '80px repeat(6, 1fr)', 
        gap: '4px',
        fontSize: '0.75em',
        marginBottom: '8px'
      }}>
        <div></div>
        {prayers.map(p => {
          const isActive = active === p
          const passed = isPassed(p)
          return (
            <div 
              key={p} 
              style={{ 
                textAlign: 'center', 
                fontWeight: 600, 
                color: isActive ? BRAND_COLOR : TEXT_COLOR,
                opacity: passed ? 0.5 : 1
              }}
            >
              {p}
            </div>
          )
        })}
      </div>

      {/* Athan row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '80px repeat(6, 1fr)', 
        gap: '4px',
        fontSize: '0.8125em',
        marginBottom: '6px'
      }}>
        <div style={{ fontWeight: 600, color: MUTED }}>Athan</div>
        {prayers.map(p => {
          const isActive = active === p
          const passed = isPassed(p)
          return (
            <div 
              key={p} 
              style={{ 
                textAlign: 'center', 
                color: isActive ? BRAND_COLOR : TEXT_COLOR,
                opacity: passed ? 0.5 : 1
              }}
            >
              {fmt24(getTime(p, 'athan'))}
            </div>
          )
        })}
      </div>

      {/* Iqamah row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '80px repeat(6, 1fr)', 
        gap: '4px',
        fontSize: '0.8125em',
        marginBottom: '8px'
      }}>
        <div style={{ fontWeight: 600, color: MUTED }}>Iqamah</div>
        {prayers.map(p => {
          const time = getTime(p, 'iqamah')
          const isActive = active === p
          const passed = isPassed(p)
          return (
            <div 
              key={p} 
              style={{ 
                textAlign: 'center', 
                color: isActive ? BRAND_COLOR : TEXT_COLOR,
                opacity: passed ? 0.5 : 1
              }}
            >
              {time ? fmt24(time) : '-'}
            </div>
          )
        })}
      </div>

      {/* Jumuah times row - same styling as other rows */}
      {jumuahPrayers && jumuahPrayers.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '80px repeat(6, 1fr)', 
          gap: '4px',
          fontSize: '0.8125em',
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid #e2e8f0',
          marginBottom: '8px'
        }}>
        <div style={{ fontWeight: 600, color: MUTED }}>Jumu&apos;ah</div>
          {Array.from({ length: 6 }).map((_, i) => {
            const j = jumuahPrayers[i]
            const display = (() => {
              if (!j) return '-'
              const a = j.start_time ? fmt24(j.start_time) : null
              const b = j.jammat_time ? fmt24(j.jammat_time) : null
              if (a && b) return `${a} ${b}`
              return a || b || '-'
            })()
            const isActive = getActiveJumuah === i
            const passed = j ? isJumuahPassed(i) : false
            return (
              <div 
                key={i} 
                style={{ 
                  textAlign: 'center', 
                  color: isActive ? BRAND_COLOR : TEXT_COLOR,
                //   fontWeight: 700,
                  opacity: passed ? 0.5 : 1
                }}
              >
                {display}
              </div>
            )
          })}
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
            fontSize: '0.8em',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block',
            color: MUTED,
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(29, 138, 119, 0.05)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
        >
          My<span style={{ color: BRAND_COLOR, fontWeight: 600 }}>Local</span>Masjid
        </a>
      </div>
    </div>
  )
}


