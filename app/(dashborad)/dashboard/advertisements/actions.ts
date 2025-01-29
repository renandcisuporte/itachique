'use server'

import { advertisementAction } from '@/core/main/config/dependencies'
import { Session } from '@/lib/session'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import path from 'path'

const date = new Date()
const test = date.toISOString().split('T')[0]
const [YEAR, MONTH] = test.split('-')
const UPLOAD_URL = ['advertisements', String(YEAR), String(MONTH)].join('/')
const UPLOAD_DIR = path.join(
  process.cwd(),
  'public',
  'advertisements',
  String(YEAR),
  String(MONTH)
)

export async function deleteAdvertisementAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return {
      message: 'Sessão expirada, faça login novamente.'
    }
  }

  const id = formData.get('id') as string
  await advertisementAction.delete(id)

  return {
    success: true
  }
}

export async function saveAdvertisementAction(_: any, formData: FormData) {
  const session = await Session.getSession()
  if (!session.token) {
    return { errors: { message: ['Sessão expirada, faça login novamente.'] } }
  }

  const { ...restForm } = Object.fromEntries(formData)

  const images: string[] = []
  const files = formData.getAll('galleryImages') as File[]
  if (files.length > 0) {
    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    for (const file of files) {
      if (file.size <= 0) continue
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${randomUUID().toString()}-${file.name}`
      const filePath = path.join(UPLOAD_DIR, fileName)
      await fs.writeFile(filePath, fileBuffer)
      const urlPath = ['', UPLOAD_URL, fileName].join('/')
      images.push(urlPath)
    }

    if (images.length > 0) restForm.galleryImages = JSON.stringify(images)
  }

  const result = await advertisementAction.save({
    ...restForm,
    id: restForm.id as string,
    title: restForm.title as string,
    description: restForm.description as string,
    link: restForm.link as string,
    position: Number(restForm.position),
    isActive: restForm.isActive === 'on' ? true : false,
    validatedAt: new Date()
  })

  if (result.errors) {
    return { errors: result.errors }
  }

  const id = result?.data?.id
  revalidatePath(`/(dashboard)/dashboard/advertisements`, 'page')
  return {
    success: true,
    data: { id }
  }
}
