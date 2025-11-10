interface LoadingModalProps {
  isOpen: boolean
  message: string
  progress?: {
    current: number
    total: number
  }
  status?: 'uploading' | 'success' | 'error' | 'completion'
  errorMessage?: string
  onClose?: () => void
  masjidId?: string
  failedFileName?: string
}

export default function LoadingModal({ isOpen, message, progress, status = 'uploading', errorMessage, onClose, masjidId, failedFileName }: LoadingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center space-y-6">
          {/* Status Icon */}
          {status === 'success' ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : status === 'completion' ? (
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          ) : status === 'error' ? (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : (
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
          )}

          {/* Message */}
          <div className="text-center">
            {status === 'completion' ? (
              <>
                <h3 className="text-3xl font-bold text-green-900 mb-4">
                  Jazakallah Khair
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  {message}
                </p>
                <p className="text-sm text-gray-600">
                  May Allah reward you for helping your community. InshaAllah, we will continue to serve Muslims worldwide.
                </p>
              </>
            ) : (
              <h3 className={`text-xl font-bold mb-2 ${
                status === 'success' ? 'text-green-900' : 
                status === 'error' ? 'text-red-900' : 
                'text-gray-900'
              }`}>
                {message}
              </h3>
            )}
            
            {/* Error message */}
            {status === 'error' && errorMessage && (
              <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
            )}
            
            {/* Progress indicator */}
            {status === 'uploading' && progress && (
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-sm text-gray-600">
                    {progress.current} of {progress.total} files
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Additional info */}
          {status === 'uploading' && (
            <p className="text-sm text-gray-500 text-center">
              Please don't close this window while files are uploading...
            </p>
          )}

          {/* Close button for success/error/completion states */}
          {(status === 'success' || status === 'error' || status === 'completion') && onClose && (
            <div className="flex gap-3">
              {status === 'error' && (
                <a
                  href={`mailto:admin@mylocalmasjid.com?subject=${encodeURIComponent(
                    failedFileName ? `File Upload Issue - ${failedFileName}` : 'Upload Issue'
                  )}&body=${encodeURIComponent(
                    `Assalamu Alaikum,\n\nWe encountered an issue uploading ${failedFileName ? `the file "${failedFileName}"` : 'a file'}.\nPlease find the file attached to this email.\n\nSorry for the inconvenience.\n\nJazakallah Khair.\n\nMasjid Details:${masjidId ? `\n- Masjid ID: ${masjidId}` : ''}${failedFileName ? `\n- Failed File: ${failedFileName}` : ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-red-200 text-red-700 px-4 py-2 rounded-xl font-semibold transition-colors hover:bg-red-50"
                >
                  Email support
                </a>
              )}
              <button
                onClick={onClose}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                {status === 'completion' ? 'May Allah Bless You' : 'Close'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}