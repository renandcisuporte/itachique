'use server'

import { ValidationError } from '@/core/application/errors/validation-error'
import { AuthenticationUseCase } from '@/core/application/use-cases/authentication/authentication-use-case'
import { UserRepositoryPrisma } from '@/core/infra/repositories/user/user-repository'
import { prisma } from '@/core/package/prisma'
import { Session } from '@/lib/session'
import { redirect, RedirectType } from 'next/navigation'

const userRepository = new UserRepositoryPrisma(prisma)
const authenticationUseCase = new AuthenticationUseCase(userRepository)

export async function authAction(_: any, formData: FormData) {
  try {
    const { email, password } = Object.fromEntries<any>(formData)
    const result = await authenticationUseCase.execute({
      email,
      password
    })

    const { accessToken } = result.data
    await Session.saveSession(accessToken)
  } catch (err) {
    console.log('[ERROR LOGIN]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }

    return {
      message: ['Erro não informado']
    }
  }

  redirect('/admin/dashboard', RedirectType.push)
}
