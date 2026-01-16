import { Info } from 'lucide-react'

export function MethodDisclaimer() {
  return (
    <div className="bg-bg-card rounded-2xl p-6 shadow-sm border border-[var(--border)]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-text-primary mb-2">
            Calculation Method
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Prayer times are calculated using the{' '}
            <strong>UK Moonsighting Committee</strong> method, which is
            specifically designed for higher latitudes in the UK. Asr time
            follows the <strong>Shafi</strong> madhab (shadow length = 1x
            object height). These times are calculated and may differ slightly
            from your local masjid&apos;s times. For the most accurate jamaat
            times, please check with your local masjid.
          </p>
        </div>
      </div>
    </div>
  )
}
