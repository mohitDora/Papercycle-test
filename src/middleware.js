import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/letsrecycle' || path === '/verifyotp' || path === '/startrecycling'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/letsrecycle', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/letsrecycle',
    '/verifyotp',
    '/startrecycling',
    '/orders/:id*',
    '/helpsupport'
  ]
}