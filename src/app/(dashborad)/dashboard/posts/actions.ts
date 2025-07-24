'use server'

import { UPLOAD_DIR_UPLOADS, UPLOAD_URL_UPLOADS } from '@/constants/index'
import { ValidationError } from '@/core/application/errors/validation-error'
import { DeleteGalleryUseCase } from '@/core/application/use-cases/gallery/delete-gallery-use-case'
import { CreatePostUseCase } from '@/core/application/use-cases/post/create-post-use-case'
import { DeletePostUseCase } from '@/core/application/use-cases/post/delete-post-use-case'
import { UpdatePostUseCase } from '@/core/application/use-cases/post/update-post-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { revalidatePaths } from '@/libs/revalidate-paths'
import { Session } from '@/libs/session'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { redirect } from 'next/navigation'
import path from 'path'

// const date = new Date()
// const test = date.toISOString().split('T')[0]
// const [YEAR, MONTH] = test.split('-')
// const UPLOAD_URL = ['uploads', String(YEAR), String(MONTH)].join('/')
// const UPLOAD_DIR = path.join(
//   process.cwd(),
//   'public',
//   'uploads',
//   String(YEAR),
//   String(MONTH)
// )

export async function galleryActionRemove(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteGalleryUseCase>(
    Registry.DeleteGalleryUseCase
  )
  await useCase.execute({ id })

  revalidatePaths()

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

  const useCase = container.get<DeletePostUseCase>(Registry.DeletePostUseCase)
  await useCase.execute(id)

  revalidatePaths()

  return {
    success: true
  }
}

export async function savePostAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const {
    coverImage,
    categoryId,
    subCategoryId,
    localeId,
    cityId,
    ...restForm
  } = Object.fromEntries(formData)

  const file = formData.get('coverImage') as File
  if (file.size > 0) {
    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR_UPLOADS, { recursive: true })

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${randomUUID().toString()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR_UPLOADS, fileName)
    await fs.writeFile(filePath, fileBuffer)
    const urlPath = ['', UPLOAD_URL_UPLOADS, fileName].join('/')
    restForm.coverImage = urlPath
  }

  let input = {
    ...restForm,
    id: restForm.id as string,
    title: restForm.title as string,
    date: new Date(restForm.date as string),
    cityId: cityId !== 'null' ? (cityId as string) : null,
    categoryId: categoryId !== 'null' ? (categoryId as string) : null,
    subCategoryId: subCategoryId !== 'null' ? (subCategoryId as string) : null,
    localeId: localeId !== 'null' ? (localeId as string) : null,
    localeText: restForm.localeText as string,
    cityText: restForm.cityText as string
  }

  const createPostUseCase = container.get<CreatePostUseCase>(
    Registry.CreatePostUseCase
  )
  const updatePostUseCase = container.get<UpdatePostUseCase>(
    Registry.UpdatePostUseCase
  )

  // const queueImplements = container.get<QueueProviderImpl>(
  //   Registry.QueueProvider
  // )

  try {
    if (input.id) {
      await updatePostUseCase.execute(input)
    } else {
      const result = await createPostUseCase.execute(input)
      input.id = result.data.id as string
    }
  } catch (err: unknown) {
    console.log('[ERROR POST ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }

    return { message: ['Erro ao criar post!'] }
  }

  revalidatePaths()
  redirect(`/dashboard/posts/${input.id}/edit?success=true`)
}
