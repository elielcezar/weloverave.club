import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Redirect /en/ to / (home without prefix)
  if (pathname === '/en' || pathname === '/en/') {
    return NextResponse.redirect(new URL('/', request.url), 301)
  }

  // Redirect /pt/ to /pt (remove trailing slash)
  if (pathname === '/pt/') {
    return NextResponse.redirect(new URL('/pt', request.url), 301)
  }

  // Redirect /es/ to /es (remove trailing slash)
  if (pathname === '/es/') {
    return NextResponse.redirect(new URL('/es', request.url), 301)
  }

  // Continue normally for other paths
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
}

