'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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

export function PrayerTimesWidget({ prayerTimes, prayerTimesWeek = [], jumuahPrayers = [] }: { prayerTimes: CurrentPrayerTimes | null; prayerTimesWeek?: CurrentPrayerTimes[]; jumuahPrayers?: SpecialPrayer[] }) {
  const [activePrayer, setActivePrayer] = useState<string>('')
  const [displayedPrayerTimes, setDisplayedPrayerTimes] = useState<CurrentPrayerTimes | null>(() => {
    if (prayerTimes) return prayerTimes
    if (prayerTimesWeek && prayerTimesWeek.length > 0) return prayerTimesWeek[0]
    return null
  })

  const effectivePrayerTimes = displayedPrayerTimes || prayerTimes

  const prayers: Prayer[] = useMemo(() => {
    if (!effectivePrayerTimes || !effectivePrayerTimes.fajr_start) return []
    return formatPrayerTimesReadToPrayer(effectivePrayerTimes)
  }, [effectivePrayerTimes])

  const hasPrayerTimes = prayers.length > 0 && prayers.some(p => p.begins)

  // Keep active prayer updated every minute
  useEffect(() => {
    const update = () => { if (hasPrayerTimes) setActivePrayer(getCurrentPrayer(prayers)) }
    update()
    const i = setInterval(update, 60000)
    return () => clearInterval(i)
  }, [prayers, hasPrayerTimes])

  // Keep displayedPrayerTimes in sync with the weekly array when available
  useEffect(() => {
    if (!prayerTimesWeek || prayerTimesWeek.length === 0) return
    const today = new Date().toISOString().split('T')[0]
    const idx = prayerTimesWeek.findIndex(p => p && p.date === today)
    if (idx !== -1) {
      setDisplayedPrayerTimes(prayerTimesWeek[idx])
      return
    }
    // fallback: if displayed is null, set to first item
    if (!displayedPrayerTimes && prayerTimesWeek.length > 0) setDisplayedPrayerTimes(prayerTimesWeek[0])
  }, [prayerTimesWeek])

  const BRAND_COLOR = '#1D8A77'
  
  const noDataBlock = (
    <div style={{ 
      padding: '16px 12px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      color: '#64748b',
      maxWidth: '100%',
      boxSizing: 'border-box',
      width: '100%',
      background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)'
    }}>
      <div style={{ 
        padding: '12px',
        background: 'rgba(220, 38, 38, 0.05)',
        borderRadius: '6px',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        marginBottom: '12px'
      }}>
        <div style={{ fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 600, color: '#dc2626', marginBottom: '6px' }}>Prayer Times Unavailable</div>
        <div style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', color: '#64748b' }}>We&apos;re currently unable to display prayer times. Please check back later.</div>
      </div>
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
            fontSize: 'clamp(10px, 2vw, 12px)',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block',
            color: '#64748b',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8'
            e.currentTarget.style.background = 'rgba(29, 138, 119, 0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          My<span style={{ color: BRAND_COLOR, fontWeight: 600 }}>Local</span>Masjid
        </a>
      </div>
    </div>
  )

        const sortedJumuah = (jumuahPrayers || []).slice().sort((a, b) => (a.jammat_time || '').localeCompare(b.jammat_time || ''))
  
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const measure = () => {
      try {
        const height = document.body.scrollHeight
        const inner = window.innerHeight
        setIsOverflowing(height > inner + 4)
      } catch (err) {
        // ignore
      }
    }

    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [effectivePrayerTimes])

  return (
    <div ref={containerRef} style={{ 
      padding: '12px 10px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      color: '#1e293b',
      maxWidth: '100%',
      boxSizing: 'border-box',
      width: '100%',
      background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
      maxHeight: '100vh',
      overflowY: 'auto'
    }}>
      {/* Overflow warning */}
      {isOverflowing && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(29,138,119,0.08), rgba(29,138,119,0.04))',
          padding: '8px 10px',
          borderRadius: '6px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ color: '#14532d', fontSize: '13px' }}>This widget may be cropped by the iframe — scroll inside the widget or increase iframe height.</div>
          <div>
            <button onClick={() => {
              try { window.parent.postMessage({ type: 'resize', height: document.body.scrollHeight }, '*') } catch {}
            }} style={{
              background: 'transparent',
              border: `1px solid ${BRAND_COLOR}`,
              color: BRAND_COLOR,
              padding: '6px 8px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Request parent resize</button>
          </div>
        </div>
      )}

      {hasPrayerTimes ? (
        <>
          {/* Date Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '12px',
            padding: '8px',
            background: 'rgba(29, 138, 119, 0.05)',
            borderRadius: '6px',
            border: '1px solid rgba(29, 138, 119, 0.1)'
          }}>
            <div style={{ 
              color: '#1D8A77', 
              fontSize: 'clamp(11px, 2.5vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.3px'
            }}>
              {effectivePrayerTimes && (
                <>
                  {new Intl.DateTimeFormat(LOCALE, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(effectivePrayerTimes.date))}
                  {effectivePrayerTimes.hijri_date && ` • ${effectivePrayerTimes.hijri_date}`}
                </>
              )}
            </div>
          </div>

          {/* Prayer Times Table */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'separate',
              borderSpacing: 0,
              minWidth: '200px'
            }}>
              <thead>
                <tr>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '8px 6px', 
                    fontSize: 'clamp(10px, 2.2vw, 11px)', 
                    color: '#64748b', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Prayer</th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '8px 6px', 
                    fontSize: 'clamp(10px, 2.2vw, 11px)', 
                    color: '#64748b', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Start</th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '8px 6px', 
                    fontSize: 'clamp(10px, 2.2vw, 11px)', 
                    color: '#64748b', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #e2e8f0'
                  }}>Jamat</th>
                </tr>
              </thead>
              <tbody>
                {prayers.map((p, index) => {
                  const isActive = activePrayer === p.name
                  const activeBg = isActive ? 'rgba(29, 138, 119, 0.08)' : 'transparent'
                  const activeColor = isActive ? BRAND_COLOR : '#1e293b'
                  const isEven = index % 2 === 0
                  
                  return (
                    <tr 
                      key={p.name}
                      style={{
                        backgroundColor: isActive ? activeBg : (isEven ? 'rgba(0, 0, 0, 0.02)' : 'transparent'),
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <td style={{ 
                        padding: '10px 6px', 
                        fontWeight: isActive ? 700 : 600, 
                        color: activeColor, 
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        borderLeft: isActive ? `3px solid ${BRAND_COLOR}` : '3px solid transparent',
                        paddingLeft: isActive ? '3px' : '6px'
                      }}>
                        {p.name}
                      </td>
                      <td style={{ 
                        padding: '10px 6px', 
                        textAlign: 'right', 
                        fontWeight: isActive ? 700 : 600, 
                        color: activeColor, 
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        fontVariantNumeric: 'tabular-nums'
                      }}>
                        {formatPrayerTime(p.begins)}
                      </td>
                      <td style={{ 
                        padding: '10px 6px', 
                        textAlign: 'right', 
                        fontWeight: isActive ? 700 : 600, 
                        color: activeColor, 
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                        fontVariantNumeric: 'tabular-nums'
                      }}>
                        {p.jamaah ? formatPrayerTime(p.jamaah) : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Jumuah Times Table */}
          {sortedJumuah.length > 0 && (
            <div style={{ 
              marginTop: '14px',
              paddingTop: '14px',
              borderTop: '2px solid #e2e8f0'
            }}>
              <div style={{ 
                fontSize: 'clamp(11px, 2.3vw, 13px)', 
                fontWeight: 600, 
                marginBottom: '10px',
                color: BRAND_COLOR,
                letterSpacing: '0.3px',
                textAlign: 'center'
              }}>
                Jumuah Times
              </div>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  minWidth: '200px'
                }}>
                  <thead>
                    <tr>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '8px 6px', 
                        fontSize: 'clamp(10px, 2.2vw, 11px)', 
                        color: '#64748b', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: '2px solid #e2e8f0'
                      }}>Jamaat</th>
                      <th style={{ 
                        textAlign: 'right', 
                        padding: '8px 6px', 
                        fontSize: 'clamp(10px, 2.2vw, 11px)', 
                        color: '#64748b', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: '2px solid #e2e8f0'
                      }}>Start</th>
                      <th style={{ 
                        textAlign: 'right', 
                        padding: '8px 6px', 
                        fontSize: 'clamp(10px, 2.2vw, 11px)', 
                        color: '#64748b', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: '2px solid #e2e8f0'
                      }}>Jamat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedJumuah.map((j, i) => (
                      <tr 
                        key={j.id || i}
                        style={{
                          backgroundColor: i % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <td style={{ 
                          padding: '10px 6px', 
                          fontWeight: 600, 
                          color: '#1e293b',
                          fontSize: 'clamp(12px, 2.5vw, 14px)'
                        }}>
                          {j.label || `Jamaat ${i + 1}`}
                        </td>
                        <td style={{ 
                          padding: '10px 6px', 
                          textAlign: 'right', 
                          fontWeight: 600, 
                          color: '#1e293b',
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                          fontVariantNumeric: 'tabular-nums'
                        }}>
                          {j.start_time ? formatPrayerTime(j.start_time) : '-'}
                        </td>
                        <td style={{ 
                          padding: '10px 6px', 
                          textAlign: 'right', 
                          fontWeight: 600, 
                          color: BRAND_COLOR,
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                          fontVariantNumeric: 'tabular-nums'
                        }}>
                          {formatPrayerTime(j.jammat_time)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Branding */}
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
                fontSize: 'clamp(10px, 2vw, 12px)',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                color: '#64748b',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8'
                e.currentTarget.style.background = 'rgba(29, 138, 119, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              My<span style={{ color: BRAND_COLOR, fontWeight: 600 }}>Local</span>Masjid
            </a>
          </div>
        </>
      ) : (
        noDataBlock
      )}
    </div>
  )
}


