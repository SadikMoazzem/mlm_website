import StoreButton from '@/components/elements/StoreButton'

/**
 * DownloadAppCTA - Call-to-action section to download the mobile app
 *
 * Encourages users to download the MyLocalMasjid app for:
 * - Push notifications for prayer times
 * - Home masjid sync
 * - Offline access
 * - Widget support
 */
export function DownloadAppCTA() {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-primary-900/20 dark:via-bg-card dark:to-primary-900/20 rounded-2xl p-6 sm:p-8 shadow-sm border border-primary-100 dark:border-primary-900/50 mb-8">
      <div className="text-center">
        <h2 className="text-xl font-medium text-text-primary mb-2">
          Never Miss a Prayer
        </h2>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Download the MyLocalMasjid app for prayer notifications, home masjid
          sync, and offline access.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <StoreButton
            store="AppStore"
            href="https://apps.apple.com/gb/app/mylocalmasjid-app/id6743862734"
            width={140}
            height={42}
          />
          <StoreButton
            store="GooglePlay"
            href="https://play.google.com/store/apps/details?id=com.moazzemlabs.mylocalmasjid"
            width={140}
            height={42}
          />
        </div>
      </div>
    </div>
  )
}
