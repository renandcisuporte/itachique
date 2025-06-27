'use server'

import {
  UPLOAD_DIR_ADVERTISEMENTS,
  UPLOAD_URL_ADVERTISEMENTS
} from '@/constants/index'
import { ValidationError } from '@/core/application/errors/validation-error'
import { CreateAdvertisementUseCase } from '@/core/application/use-cases/advertisement/create-advertisement-use-case'
import { DeleteAdvertisementUseCase } from '@/core/application/use-cases/advertisement/delete-advertisement-use-case'
import { UpdateAdvertisementUseCase } from '@/core/application/use-cases/advertisement/update-advertisement-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { revalidatePaths } from '@/libs/revalidate-paths'
import { Session } from '@/libs/session'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'

export async function deleteAdvertisementAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteAdvertisementUseCase>(
    Registry.DeleteAdvertisementUseCase
  )
  await useCase.execute(id)

  revalidatePaths()

  return {
    success: true
  }
}

export async function saveAdvertisementAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const { galleryImages, ...restForm } = Object.fromEntries(formData)

  const images: string[] = []
  const files = formData.getAll('galleryImages') as File[]
  if (files.length > 0) {
    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR_ADVERTISEMENTS, { recursive: true })
    for (const file of files) {
      if (file.size <= 0) continue
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${randomUUID().toString()}-${file.name}`
      const filePath = path.join(UPLOAD_DIR_ADVERTISEMENTS, fileName)
      await fs.writeFile(filePath, fileBuffer)
      const urlPath = ['', UPLOAD_URL_ADVERTISEMENTS, fileName].join('/')
      images.push(urlPath)
    }

    if (images.length > 0) restForm.galleryImages = JSON.stringify(images)
  }

  const input = {
    ...restForm,
    id: restForm.id as string,
    title: restForm.title as string,
    description: restForm.description as string,
    link: restForm.link as string,
    position: Number(restForm.position),
    isActive: restForm.isActive === 'on' ? true : false,
    validatedAt: new Date(restForm.validatedAt as string)
  }

  try {
    const updateUseCase = container.get<UpdateAdvertisementUseCase>(
      Registry.UpdateAdvertisementUseCase
    )
    const createUseCase = container.get<CreateAdvertisementUseCase>(
      Registry.CreateAdvertisementUseCase
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
    console.log('[ERROR ADVERTISEMENT ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }
    return { message: ['Erro ao criar anúncio'] }
  }
}
