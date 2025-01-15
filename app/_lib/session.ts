'server-only'

import { getIronSession } from 'iron-session'
import { decode } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export class Session {
  static async getSession() {
    const cookieStore = cookies()
    return getIronSession<{ token: string }>(cookieStore, {
      password: process.env.NEXT_SECRET_SESSION!,
      cookieName: 'auth',
      ttl: process.env.NEXT_TTL!, // 7 days
      cookieOptions: {
        httpOnly: true,
        secure: false, // set this to false in local (non-HTTPS) development
        sameSite: 'lax', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#lax
        maxAge:
          (process.env.NEXT_TTL === 0 ? 2147483647 : process.env.NEXT_TTL) - 60, // Expire cookie before the session expires.
        path: '/'
      }
    })
  }

  static async saveSession(token: string) {
    const session = await this.getSession()
    session.token = token
    await session.save()
  }

  static async destroySession() {
    const session = await this.getSession()
    session.destroy()
  }

  static async getUser(): Promise<{} | null> {
    const session = await this.getSession()

    if (!session.token) {
      return null
    }

    return decode(session.token) as unknown as {}
  }
}
