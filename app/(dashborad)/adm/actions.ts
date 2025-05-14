'use server'

import { ValidationError } from '@/core/app/errors/validation-error'
import { makeAuthentication } from '@/core/main/factories/make-authentication'
import { Session } from '@/lib/session'

export async function authAction(_: any, formData: FormData) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    const useCase = makeAuthentication()
    const result = await useCase.execute({
      email: email as string,
      password: password as string
    })

    const { accessToken } = result.data

    await Session.saveSession(accessToken)

    return { success: true }
  } catch (err) {
    console.log('[ERROR LOGIN]: %o', err)
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }

    return {
      message: ['Erro não informado']
    }
  }
}
