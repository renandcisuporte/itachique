import 'server-only'

import { getIronSession } from 'iron-session'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

type SessionUser = any

type SessionData = {
  token?: string
}

const sessionOptions = {
  cookieName: 'auth',
  password: process.env.NEXT_PUBLIC_KEY!,
  ttl: Number(process.env.NEXT_PUBLIC_TTL),
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // set this to false in local (non-HTTPS) development
    sameSite: 'lax', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax
    maxAge: Number(process.env.NEXT_PUBLIC_TTL) - 60, // Expire cookie before the session expires.
    path: '/'
  }
}

export class Session {
  static async getSession() {
    const cookieStore = cookies()
    return await getIronSession<SessionData>(cookieStore, sessionOptions)
  }

  static async saveSession(token: string) {
    const session = await this.getSession()
    session.token = token
    await session.save()
  }

  static async destroySession() {
    const session = await this.getSession()
    if (session?.token) session.destroy()
  }

  static async getUser(): Promise<SessionUser | null> {
    const session = await this.getSession()

    try {
      if (!session?.token) return null
      return jwt.decode(session.token) as any
    } catch (err) {
      return null
    }
  }
}
