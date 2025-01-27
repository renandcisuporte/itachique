import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'

export interface UploadImageProvider {
  uploadMultiple(files: Input[]): Promise<Output[]>
  uploadSingle(file: Input): Promise<Output>
}

export class UploadImageProviderImpl implements UploadImageProvider {
  private readonly UPLOAD_DIR: string
  private readonly UPLOAD_URL: string
  private readonly BATCH_SIZE = 5

  constructor() {
    const date = new Date()
    const splitDate = date.toISOString().split('T')[0]
    const [YEAR, MONTH] = splitDate.split('-')
    this.UPLOAD_DIR = path.join(
      process.cwd(),
      'public',
      'uploads',
      String(YEAR),
      String(MONTH)
    )
    this.UPLOAD_URL = ['uploads', String(YEAR), String(MONTH)].join('/')
  }

  async uploadMultiple(files: File[]): Promise<Output[]> {
    const uploadedFiles: Output[] = []
    for (let i = 0; i < files.length; i += this.BATCH_SIZE) {
      // Processa os arquivos em lotes
      const batch = files.slice(i, i + this.BATCH_SIZE)
      for (const file of batch) {
        const fileName = `${randomUUID().toString()}-${file.name}`
        const filePath = path.join(this.UPLOAD_DIR, fileName)

        // Salva o arquivo no servidor
        const buffer = await file.arrayBuffer()
        await fs.writeFile(filePath, Buffer.from(buffer))

        // Adiciona o arquivo ao array de arquivos enviados
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const urlPath = ['', this.UPLOAD_URL, fileName].join('/')
        uploadedFiles.push({ image: file.name, url: urlPath })
      }
    }

    return uploadedFiles
  }

  async uploadSingle(file: File): Promise<Output> {
    try {
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${randomUUID().toString()}-${file.name}`
      const filePath = path.join(this.UPLOAD_DIR, fileName)
      // Salva o arquivo no servidor
      await fs.writeFile(filePath, fileBuffer)
      const urlPath = ['', this.UPLOAD_URL, fileName].join('/')
      return { image: file.name, url: urlPath }
    } catch (error) {
      console.log(error)
      return { image: file.name, url: path.join(this.UPLOAD_DIR, file.name) }
    }
  }
}

type Input = File

type Output = {
  image: string
  url: string
}
