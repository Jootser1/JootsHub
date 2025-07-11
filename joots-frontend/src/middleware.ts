import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let locales = ['en-US', 'fr-FR', 'es-ES']
let defaultLocale = 'fr-FR'

// Get the preferred locale from Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  
  if (!acceptLanguage) return defaultLocale
  
  // Parse Accept-Language header to find the best match
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, q = '1'] = lang.split(';q=')
      return {
        locale: locale.trim(),
        quality: parseFloat(q)
      }
    })
    .sort((a, b) => b.quality - a.quality)
  
  // Find the first matching locale
  for (const { locale } of languages) {
    // Check exact match first
    if (locales.includes(locale)) {
      return locale
    }
    
    // Check language part only (e.g., 'en' matches 'en-US')
    const langPart = locale.split('-')[0]
    const match = locales.find(l => l.startsWith(langPart))
    if (match) {
      return match
    }
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Check if we're on the landing page domain (www.joots.com or joots.com)
  const isLandingDomain = hostname.includes('www.joots.com') || hostname.includes('joots.com')
  const isAppDomain = hostname.includes('app.joots.com')
  
  // Handle landing page domain
  if (isLandingDomain && !isAppDomain) {
    // If we're on the landing domain and not already on /landing, redirect to /landing
    if (pathname !== '/landing' && !pathname.startsWith('/landing/')) {
      request.nextUrl.pathname = '/landing'
      return NextResponse.redirect(request.nextUrl)
    }
    
    // Allow landing page to proceed without locale handling
    return NextResponse.next()
  }
  
  // Handle app domain with locale system
  if (isAppDomain || (!isLandingDomain && process.env.NODE_ENV === 'development')) {
    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /login
    // The new URL is now /fr/login
    return NextResponse.redirect(request.nextUrl)
  }
  
  // Default behavior - continue with existing logic for backward compatibility
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|js|css|woff|woff2|ttf|eot)).*)',
  ],
} 