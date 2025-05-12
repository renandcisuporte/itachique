'use server'

import { galleryAction, postAction } from '@/core/main/config/dependencies'
import { Session } from '@/lib/session'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import path from 'path'

const date = new Date()
const test = date.toISOString().split('T')[0]
const [YEAR, MONTH] = test.split('-')
const UPLOAD_URL = ['uploads', String(YEAR), String(MONTH)].join('/')
const UPLOAD_DIR = path.join(
  process.cwd(),
  'public',
  'uploads',
  String(YEAR),
  String(MONTH)
)

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

  const { coverImage, ...restForm } = Object.fromEntries(formData)

  const file = formData.get('coverImage') as File
  if (file.size > 0) {
    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${randomUUID().toString()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR, fileName)
    await fs.writeFile(filePath, fileBuffer)
    const urlPath = ['', UPLOAD_URL, fileName].join('/')
    restForm.coverImage = urlPath
  }

  const result = await postAction.save({
    ...restForm,
    title: restForm.title as string,
    date: new Date(restForm.date as string),
    localeId: restForm.localeId ? (restForm.localeId as string) : null,
    cityId: restForm.cityId ? (restForm.cityId as string) : null,
    categoryId: restForm.categoryId ? (restForm.categoryId as string) : null,
    subCategoryId: restForm.subCategoryId
      ? (restForm.subCategoryId as string)
      : null,
    localeText: restForm.localeText as string,
    cityText: restForm.cityText as string
  })

  if (result.errors) {
    return { errors: result.errors }
  }

  const id = result.data?.id
  revalidatePath('/(dashboard)/dashboard/posts', 'page')
  redirect(`/dashboard/posts/${id}/edit?success=true`)
}
