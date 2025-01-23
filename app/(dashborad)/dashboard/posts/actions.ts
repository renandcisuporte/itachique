'use server'

import { galleryAction, postAction } from '@/core/main/config/dependencies'
import { Session } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function galleryActionRemove(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  revalidatePath(`/(dashboard)/dashboard/posts/[form]/upload`)

  await galleryAction.delete({ id })
  return {
    success: true
  }
}

export async function postActionRemove(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }
  const id = formData.get('id') as string
  await postAction.delete(id)
  revalidatePath(`/(dashboard)/dashboard/posts`)
  return {
    success: true
  }
}

export async function savePostAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const form = Object.fromEntries(formData)
  const result = await postAction.save({
    ...form,
    title: form.title as string,
    date: new Date(form.date as string),
    localeId: form.localeId ? (form.localeId as string) : null,
    cityId: form.cityId ? (form.cityId as string) : null,
    localeText: form.localeText as string,
    cityText: form.cityText as string,
    categoryId: form.categoryId ? (form.categoryId as string) : null
  })

  if (result.errors) {
    return { errors: result.errors }
  }

  const id = result.data?.id
  revalidatePath(`/(dashboard)/dashboard/posts`, 'page')
  redirect(`/dashboard/posts/${id}/edit?success=true`)
}
