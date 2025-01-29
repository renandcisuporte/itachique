'use server'

import { upcomingEventAction } from '@/core/main/config/dependencies'
import { Session } from '@/lib/session'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import path from 'path'

const date = new Date()
const test = date.toISOString().split('T')[0]
const [YEAR, MONTH] = test.split('-')
const UPLOAD_URL = ['upcoming-events', String(YEAR), String(MONTH)].join('/')
const UPLOAD_DIR = path.join(
  process.cwd(),
  'public',
  'upcoming-events',
  String(YEAR),
  String(MONTH)
)

export async function deleteUpcomingEventAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  await upcomingEventAction.delete(id)

  return {
    success: true
  }
}

export async function saveUpcomingEventAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const { ...restForm } = Object.fromEntries(formData)

  const file = formData.get('galleryImages') as File
  if (file.size > 0) {
    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${randomUUID().toString()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR, fileName)
    await fs.writeFile(filePath, fileBuffer)
    const urlPath = ['', UPLOAD_URL, fileName].join('/')
    restForm.galleryImages = urlPath
  }

  const result = await upcomingEventAction.save({
    ...restForm,
    id: restForm.id as string,
    title: restForm.title as string,
    description: restForm.description as string,
    // galleryImages: restForm.galleryImages as string,
    date: restForm.date as string,
    locale: restForm.locale as string
  })

  if (result.errors) {
    return { errors: result.errors }
  }

  const id = result?.data?.id
  revalidatePath(`/(dashboard)/dashboard/upcoming-events`, 'page')
  return {
    success: true,
    data: { id }
  }
}
