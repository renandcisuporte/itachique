import { Gallery, GalleryProps } from '@/core/domain/entity/gallery-entity'
import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'

export class ListGalleryUseCase {
  constructor(private readonly listRepository: GalleryGateway) {}

  async execute(input: Input): Promise<Output> {
    const result = await this.listRepository.all(input.postId)
    return {
      data: result.map(this.present)
    }
  }

  private present(input: Gallery): GalleryProps {
    return {
      id: input.id,
      image: input.image,
      postId: input.postId,
      url: input.url
    }
  }
}

type Input = {
  postId: string
}

type Output = {
  data: GalleryProps[]
}
