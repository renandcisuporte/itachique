'use server'

import { galleryAction, postAction } from '@/core/main/config/dependencies'
import { Session } from '@/lib/session'
import { revalidatePath } from 'next/cache'

export async function galleryActionRemove(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  revalidatePath(`/dashboard/posts/[form]/upload`)

  await galleryAction.delete({ id })
  return {
    success: true
  }
}

export async function galleryActionUpload(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const array = [] as any[]
  formData.getAll('files').forEach((file: any) => {
    array.push({
      file: file,
      postId: formData.get('post_id')
    })
  })
  revalidatePath(`/dashboard/posts/[form]/upload`)
  await galleryAction.save(array)
  return {
    success: true
  }
}

export async function savePostAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const form = Object.fromEntries(formData)

  revalidatePath(`/dashboard/posts/[form]/upload`)
  return await postAction.save({
    id: form.id as string,
    title: form.title as string,
    date: form.date as string,
    ...form
  })
}
