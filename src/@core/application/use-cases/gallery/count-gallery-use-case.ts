import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'

export class CountGalleryUseCase {
  constructor(private readonly listRepository: GalleryGateway) {}

  async execute(): Promise<{ data: number }> {
    return { data: await this.listRepository.count() }
  }
}
