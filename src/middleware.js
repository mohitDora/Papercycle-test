import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/auth/phonenumber' || path === '/auth/verify' || path === '/auth/register'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/phonenumber', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/auth/phonenumber',
    '/auth/verify',
    '/auth/register',
    '/orders/:id',
    '/helpsupport'
  ]
}