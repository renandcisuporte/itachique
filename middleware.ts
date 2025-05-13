import { Session } from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const session = Session.getSession()
    if (!(await session).token) throw new Error('Session expired')

    return NextResponse.next()
  } catch (error) {
    console.log('[ERROR IN MIDDLEWARE]: %o', error)
    return NextResponse.redirect(new URL('/adm', request.url))
  }
}

export const config = { matcher: ['/dashboard/:path*'] }
