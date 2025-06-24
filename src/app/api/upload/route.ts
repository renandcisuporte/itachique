import { UPLOAD_DIR_UPLOADS, UPLOAD_URL_UPLOADS } from '@/constants/index'
import { CreateGalleryUseCase } from '@/core/application/use-cases/gallery/create-gallery-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const useCase = container.get<CreateGalleryUseCase>(
      Registry.CreateGalleryUseCase
    )

    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR_UPLOADS, { recursive: true })

    const formData = await req.formData()
    const file = formData.get('image') as File
    const postId = formData.get('postId')?.toString() || ''

    if (!file) {
      return NextResponse.json(
        { message: 'Nenhum arquivo enviado.' },
        { status: 400 }
      )
    }

    // Salva o arquivo no diretório local
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${randomUUID().toString()}-${file.name}`
    const filePath = path.join(UPLOAD_DIR_UPLOADS, fileName)

    await fs.writeFile(filePath, fileBuffer)

    const urlPath = ['', UPLOAD_URL_UPLOADS, fileName].join('/')

    await useCase.execute({
      postId,
      image: fileName,
      url: urlPath
    })

    return NextResponse.json({
      message: 'Upload realizado com sucesso!',
      data: {
        url: urlPath,
        name: file.name
      }
    })
  } catch (err) {
    console.log('[ERRO NO UPLOAD]:', JSON.stringify(err))
    return NextResponse.json(
      { message: 'Erro ao processar upload.' },
      { status: 500 }
    )
  }
}
