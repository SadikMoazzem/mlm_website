import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add custom header for embed routes
  if (request.nextUrl.pathname.startsWith('/embed')) {
    const response = NextResponse.next()
    response.headers.set('x-is-embed-route', 'true')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/embed/:path*',
}

