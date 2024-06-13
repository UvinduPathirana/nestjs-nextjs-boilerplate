import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value

  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url))
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/signin') && !request.nextUrl.pathname.startsWith('/signup'))  {
    return Response.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}