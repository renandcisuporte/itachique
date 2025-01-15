'use server'

import { ValidationError } from '@/core/application/errors/validation-error'
import { AuthenticationUseCase } from '@/core/application/use-cases/authentication/authentication-use-case'
import { UserRepositoryPrisma } from '@/core/infra/repositories/user/user-repository'
import { prisma } from '@/core/package/prisma'

const userRepository = new UserRepositoryPrisma(prisma)
const authenticationUseCase = new AuthenticationUseCase(userRepository)

export async function authAction(_: any, formData: FormData) {
  try {
    const { email, password } = Object.fromEntries<any>(formData)
    const result = await authenticationUseCase.execute({
      email,
      password
    })

    console.log('result', result)
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = err.errors
      return {
        errors
      }
    }

    return {
      message: ['Erro não informado']
    }
  }
}
