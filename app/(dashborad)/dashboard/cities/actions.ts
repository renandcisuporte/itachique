'use server'

import { cityAction } from '@/core/main/config/dependencies'
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
  await cityAction.delete(id)

  return {
    success: true
  }
}

export async function saveCityAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const form = Object.fromEntries(formData)
  const result = await cityAction.save({
    id: form.id as string,
    city: form.city as string
  })

  if (result.errors) {
    return { errors: result.errors }
  }

  const id = result?.data?.id
  revalidatePath(`/(dashboard)/dashboard/cities`, 'page')
  return {
    success: true,
    data: { id }
  }
}
