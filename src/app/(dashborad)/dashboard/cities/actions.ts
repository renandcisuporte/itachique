'use server'

import { ValidationError } from '@/core/application/errors/validation-error'
import { CreateCityUseCase } from '@/core/application/use-cases/city/create-city-use-case'
import { DeleteCityUseCase } from '@/core/application/use-cases/city/delete-city-use-case'
import { UpdateCityUseCase } from '@/core/application/use-cases/city/update-city-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { Session } from '@/lib/session'
import { revalidatePath } from 'next/cache'

export async function deleteCityAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteCityUseCase>(Registry.DeleteCityUseCase)
  await useCase.execute(id)
  revalidatePath(`/(dashboard)/dashboard/cities`, 'page')
  return {
    success: true
  }
}

export async function saveCityAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const input = {
    id: formData.get('id') as string,
    city: formData.get('city') as string
  }

  const createUseCase = container.get<CreateCityUseCase>(
    Registry.CreateCityUseCase
  )
  const updateUseCase = container.get<UpdateCityUseCase>(
    Registry.UpdateCityUseCase
  )

  try {
    revalidatePath(`/(dashboard)/dashboard/cities`, 'page')
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
      message: ['Post atualizado com sucesso!'],
      data: { id: result.data.id }
    }
  } catch (err: unknown) {
    console.log('[ERROR CITY ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }
    return { message: ['Erro ao criar cidade'] }
  }
}
