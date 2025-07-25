'use server'

import {
  UPLOAD_DIR_UPCOMING_EVENTS,
  UPLOAD_URL_UPCOMING_EVENTS
} from '@/constants/index'
import { ValidationError } from '@/core/application/errors/validation-error'
import { CreateUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/create-upcoming-event-use-case'
import { DeleteUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/delete-upcoming-event-use-case'
import { UpdateUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/update-upcoming-event-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { revalidatePaths } from '@/libs/revalidate-paths'
import { Session } from '@/libs/session'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'

export async function deleteUpcomingEventAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  const useCase = container.get<DeleteUpcomingEventUseCase>(
    Registry.DeleteUpcomingEventUseCase
  )
  await useCase.execute(id)

  revalidatePaths()

  return {
    success: true
  }
}

export async function saveUpcomingEventAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const { galleryImages, ...restForm } = Object.fromEntries(formData)

  const file = formData.get('galleryImages') as File
  if (file.size > 0) {
    await fs.mkdir(UPLOAD_DIR_UPCOMING_EVENTS, { recursive: true })

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${randomUUID().toString()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR_UPCOMING_EVENTS, fileName)
    await fs.writeFile(filePath, fileBuffer)
    const urlPath = ['', UPLOAD_URL_UPCOMING_EVENTS, fileName].join('/')
    restForm.galleryImages = urlPath
  }

  const input = {
    ...restForm,
    id: restForm.id as string,
    date: new Date(restForm.date as string),
    title: restForm.title as string,
    description: restForm.description as string,
    locale: restForm.locale as string
  }

  try {
    const updateUseCase = container.get<UpdateUpcomingEventUseCase>(
      Registry.UpdateUpcomingEventUseCase
    )
    const createUseCase = container.get<CreateUpcomingEventUseCase>(
      Registry.CreateUpcomingEventUseCase
    )

    revalidatePaths()

    if (input.id) {
      const result = await updateUseCase.execute(input)
      return {
        success: true,
        message: ['Atualizado com sucesso!'],
        data: { ...result.data }
      }
    }
    const result = await createUseCase.execute(input)
    return {
      success: true,
      message: ['Atualizado com sucesso!'],
      data: { ...result.data }
    }
  } catch (err: unknown) {
    console.log('[ERROR ADVERTISEMENT ACTION]', JSON.stringify(err, null, 2))
    if (err instanceof ValidationError) {
      const errors = err.errors
      return { errors }
    }
    return { message: ['Erro ao criar categoria'] }
  }
}
