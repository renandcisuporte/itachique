import { Session } from '@/lib/session'
import { decode } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await Session.getSession()
  if (!session.token) {
    return NextResponse.redirect(new URL('/adm', request.url))
  }

  // Decodificar o token para acessar o campo `exp`
  const decodedToken = decode(session.token) as { exp?: number }

  if (!decodedToken?.exp) {
    return NextResponse.redirect(new URL('/adm', request.url))
  }

  // Verificar se o token expirou
  const currentTime = Math.floor(Date.now() / 1000) // Tempo atual em segundos
  if (decodedToken.exp < currentTime) {
    return NextResponse.redirect(new URL('/adm', request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
