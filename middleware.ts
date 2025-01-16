import { Session } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = Session.getSession()
  if (!(await session).token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
