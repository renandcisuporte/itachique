import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'
import { unlink } from 'fs/promises'

export class DeleteAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementGateway) {}

  async execute(id: string): Promise<{ data: [] }> {
    const result = await this.advertisementRepository.find(id)

    await Promise.all(
      result?.galleryImagesJson.map(async (file: string) => {
        try {
          await unlink(`./public/${file}`)
        } finally {
        }
      })
    )

    await this.advertisementRepository.delete(id)
    return { data: [] }
  }
}
