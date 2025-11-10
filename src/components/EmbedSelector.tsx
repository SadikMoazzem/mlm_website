 'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function EmbedSelector({ baseUrl, masjidId }: { baseUrl: string; masjidId: string }) {
  const [variant, setVariant] = useState<'default' | 'compact' | 'card'>('default')

  const iframeSrc = useMemo(() => {
    if (variant === 'default') {
      return `${baseUrl.replace(/\/$/, '')}/embed/prayer-times?masjid_id=${encodeURIComponent(masjidId)}`
    }
    return `${baseUrl.replace(/\/$/, '')}/embed/${encodeURIComponent(masjidId)}/prayer-times/${variant}`
  }, [baseUrl, masjidId, variant])

    const frameClasses = useMemo(() => {
    if (variant === 'card') return 'mx-auto w-full max-w-xs h-[590px]'
    if (variant === 'compact') return 'w-full h-[180px]'
    return 'w-full h-[600px]'
  }, [variant])

  const [loaded, setLoaded] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Style</label>
          <div className="text-sm text-gray-500">Choose how the widget appears on your site</div>
        </div>
        <div role="tablist" aria-label="Widget style selector" className="inline-flex bg-white rounded-full p-1 shadow-sm">
          <button
            role="tab"
            aria-selected={variant === 'default'}
            onClick={() => setVariant('default')}
            className={`px-5 py-2 rounded-full text-base font-semibold transition transform ${variant === 'default' ? 'bg-primary-600 text-white shadow-lg scale-102' : 'text-gray-700'}`}
          >
            Default
          </button>
          <button
            role="tab"
            aria-selected={variant === 'compact'}
            onClick={() => setVariant('compact')}
            className={`px-5 py-2 rounded-full text-base font-semibold transition transform ${variant === 'compact' ? 'bg-primary-600 text-white shadow-lg scale-102' : 'text-gray-700'}`}
          >
            Compact
          </button>
          <button
            role="tab"
            aria-selected={variant === 'card'}
            onClick={() => setVariant('card')}
            className={`px-5 py-2 rounded-full text-base font-semibold transition transform ${variant === 'card' ? 'bg-primary-600 text-white shadow-lg scale-102' : 'text-gray-700'}`}
          >
            Card
          </button>
        </div>
      </div>

      <div className="rounded overflow-hidden border border-gray-100 shadow-sm">
        <motion.div
          layout
          initial={false}
          animate={{
            height: variant === 'card' ? 590 : variant === 'compact' ? 180 : 600,
            width: variant === 'card' ? 420 : '100%',
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="border-t rounded-b overflow-hidden flex items-center justify-center bg-white will-change-auto relative"
          style={{ overflow: 'hidden', marginLeft: variant === 'card' ? 'auto' : undefined, marginRight: variant === 'card' ? 'auto' : undefined }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-600" />
                <div className="text-sm text-gray-500">Loading preview…</div>
              </div>
            </div>
          )}
          <iframe
            title="Demo widget preview"
            src={iframeSrc}
            className="w-full h-full"
            loading="lazy"
            style={{ border: '0', opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease-in-out' }}
            onLoad={() => setLoaded(true)}
          />
        </motion.div>
      </div>
    </div>
  )
}


