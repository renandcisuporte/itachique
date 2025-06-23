'use server'

import { ValidationError } from '@/core/application/errors/validation-error'
import { CreateSubCategoryUseCase } from '@/core/application/use-cases/subcategory/create-subcategory-use-case'
import { DeleteSubCategoryUseCase } from '@/core/application/use-cases/subcategory/delete-subcategory-use-case'
import { UpdateSubCategoryUseCase } from '@/core/application/use-cases/subcategory/update-subcategory-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { Session } from '@/lib/session'
import { revalidatePath } from 'next/cache'

export async function deleteCategoryAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteSubCategoryUseCase>(
    Registry.DeleteSubCategoryUseCase
  )
  await useCase.execute(id)

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
    position: 0
  }

  let result = null
  const createUseCase = container.get<CreateSubCategoryUseCase>(
    Registry.CreateSubCategoryUseCase
  )
  const updateUseCase = container.get<UpdateSubCategoryUseCase>(
    Registry.UpdateSubCategoryUseCase
  )

  try {
    revalidatePath(`/(dashboard)/dashboard/subcategories`, 'page')
    if (input.id) {
      const result = await updateUseCase.execute(input)
      return {
        success: true,
        message: ['Atualizado com sucesso!'],
        data: { id: result.data.id }
      }
    }

    result = await createUseCase.execute(input)
    return {
      success: true,
      message: ['Atualizado com sucesso!'],
      data: { id: result.data.id }
    }
  } catch (err: unknown) {
    console.log('[ERROR SUBCATEGORY ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }
    return { message: ['Erro ao criar categoria'] }
  }
}
