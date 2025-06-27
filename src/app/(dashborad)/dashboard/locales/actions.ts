'use server'

import { ValidationError } from '@/core/application/errors/validation-error'
import { CreateLocaleUseCase } from '@/core/application/use-cases/locale/create-city-use-case'
import { DeleteLocaleUseCase } from '@/core/application/use-cases/locale/delete-city-use-case'
import { UpdateLocaleUseCase } from '@/core/application/use-cases/locale/update-city-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { revalidatePaths } from '@/libs/revalidate-paths'
import { Session } from '@/libs/session'

export async function deleteLocaleAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteLocaleUseCase>(
    Registry.DeleteLocaleUseCase
  )
  await useCase.execute(id)

  revalidatePaths()

  return {
    success: true
  }
}

export async function saveLocaleAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const input = {
    id: formData.get('id') as string,
    name: formData.get('name') as string
  }

  try {
    const createUseCase = container.get<CreateLocaleUseCase>(
      Registry.CreateLocaleUseCase
    )
    const updateUseCase = container.get<UpdateLocaleUseCase>(
      Registry.UpdateLocaleUseCase
    )
    revalidatePaths()

    if (input.id) {
      const result = await updateUseCase.execute(input)
      return {
        success: true,
        message: ['Post atualizado com sucesso!'],
        data: { id: result.data.id }
      }
    }
    const result = await createUseCase.execute(input)
    return {
      success: true,
      message: ['Cidade criada com sucesso!'],
      data: { id: result.data.id }
    }
  } catch (err: unknown) {
    console.log('[ERROR LOCALE ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }
    return { message: ['Erro ao criar cidade'] }
  }
}
