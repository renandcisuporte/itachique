'use server'

import { ValidationError } from '@/core/application/errors/validation-error'
import { CreateCategoryUseCase } from '@/core/application/use-cases/category/create-category-use-case'
import { DeleteCategoryUseCase } from '@/core/application/use-cases/category/delete-category-use-case'
import { UpdateCategoryUseCase } from '@/core/application/use-cases/category/update-category-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { revalidatePaths } from '@/libs/revalidate-paths'
import { Session } from '@/libs/session'

export async function deleteCategoryAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteCategoryUseCase>(
    Registry.DeleteCategoryUseCase
  )
  await useCase.execute(id)

  revalidatePaths()
  return {
    success: true
  }
}

export async function saveCategoryAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const input = {
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    position: Number(formData.get('position'))
  }

  try {
    const updateUseCase = container.get<UpdateCategoryUseCase>(
      Registry.UpdateCategoryUseCase
    )
    const createUseCase = container.get<CreateCategoryUseCase>(
      Registry.CreateCategoryUseCase
    )

    revalidatePaths()

    if (input.id) {
      const result = await updateUseCase.execute(input)
      return {
        success: true,
        message: ['Atualizado com sucesso!'],
        data: { id: result.data.id }
      }
    }

    const result = await createUseCase.execute(input)
    return {
      success: true,
      message: ['Atualizado com sucesso!'],
      data: { id: result.data.id }
    }
  } catch (err: unknown) {
    console.log('[ERROR CATEGORY ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }

    return { message: ['Erro ao criar categoria'] }
  }
}
