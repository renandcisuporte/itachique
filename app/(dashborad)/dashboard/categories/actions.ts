'use server'

import { categoryAction } from '@/core/main/config/dependencies'
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
  await categoryAction.delete(id)

  return {
    success: true
  }
}

export async function saveCategoryAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const form = Object.fromEntries(formData)
  const result = await categoryAction.save({
    id: form.id as string,
    name: form.name as string,
    position: 0
    // position: Number(form.position)
  })

  if (result.errors) {
    return { errors: result.errors }
  }

  const id = result?.data?.id
  revalidatePath(`/(dashboard)/dashboard/categories`, 'page')
  return {
    success: true,
    data: { id }
  }
}
