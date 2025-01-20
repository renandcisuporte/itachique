import { galleryAction } from '@/core/main/config/dependencies'
import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

const date = new Date()
const test = date.toISOString().split('T')[0]
const [YEAR, MONTH] = test.split('-')

// Defina o limite de arquivos processados por vez
const BATCH_SIZE = 1
// Diretório onde os arquivos serão armazenados
const UPLOAD_DIR = path.join(
  process.cwd(),
  'public',
  'uploads',
  String(YEAR),
  String(MONTH)
)

const UPLOAD_URL = ['uploads', String(YEAR), String(MONTH)].join('/')

export async function POST(req: NextRequest) {
  try {
    // Garante que o diretório de upload existe
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    const formData = await req.formData()
    // Obtém os arquivos enviados
    const files = formData.getAll('files') as File[]
    const postId = formData.get('postId')!.toString()

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: 'Nenhum arquivo enviado.' },
        { status: 400 }
      )
    }

    const uploadedFiles = []
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      // Processa os arquivos em lotes
      const batch = files.slice(i, i + BATCH_SIZE)
      for (const file of batch) {
        const fileName = `${randomUUID().toString()}-${file.name}`
        const filePath = path.join(UPLOAD_DIR, fileName)

        // Salva o arquivo no servidor
        const buffer = await file.arrayBuffer()
        await fs.writeFile(filePath, Buffer.from(buffer))

        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Adiciona o arquivo ao array de arquivos enviados

        const urlPath = ['', UPLOAD_URL, fileName].join('/')
        uploadedFiles.push({ name: file.name, path: urlPath })
        await galleryAction.save({
          postId,
          image: fileName,
          url: urlPath
        })
      }
    }

    return NextResponse.json({
      message: 'Upload realizado com sucesso!',
      data: uploadedFiles
    })
  } catch (err) {
    console.log('[ERRO NO UPLOAD]:', JSON.stringify(err))
    return NextResponse.json(
      { message: 'Erro ao processar upload.' },
      { status: 500 }
    )
  }
}
