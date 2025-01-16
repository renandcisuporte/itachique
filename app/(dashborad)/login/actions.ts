'use server'

import { ValidationError } from '@/core/app/errors/validation-error'
import { AuthenticationUseCase } from '@/core/app/use-cases/authentication/authentication-use-case'
import { UserRepositoryPrisma } from '@/core/infra/repositories/user-repository'
import { prisma } from '@/core/package/prisma'
import { Session } from '@/lib/session'
import { redirect, RedirectType } from 'next/navigation'

const userRepository = new UserRepositoryPrisma(prisma)
const authenticationUseCase = new AuthenticationUseCase(userRepository)

export async function authAction(_: any, formData: FormData) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')
    const result = await authenticationUseCase.execute({
      email: email as string,
      password: password as string
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

  redirect('/dashboard', RedirectType.push)
}
