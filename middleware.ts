import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isLoginPage = nextUrl.pathname === '/login'

  // Allow login page and API routes through
  if (isLoginPage) {
    // Already logged in → redirect to admin
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', nextUrl))
    }
    return NextResponse.next()
  }

  // Protected admin routes
  if (!isLoggedIn && nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
