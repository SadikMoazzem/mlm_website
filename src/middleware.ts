import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that should be rendered without navbar/footer (full screen mode)
const fullScreenRoutes = ['/embed', '/masjids/finder']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a full-screen route (no navbar/footer)
  const isFullScreen = fullScreenRoutes.some(route => pathname.startsWith(route))

  if (isFullScreen) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-is-embed-route', 'true')

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/embed/:path*', '/masjids/finder', '/masjids/finder/:path*'],
}
