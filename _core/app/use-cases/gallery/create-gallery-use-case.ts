import { Gallery, GalleryProps } from '@/core/domain/entity/gallery-entity'
import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'

export class CreateGalleryUseCase {
  constructor(private readonly createRepository: GalleryGateway) {}

  async execute(input: Input): Promise<Output> {
    const inputGallery = Gallery.create(input)
    await this.createRepository.save(inputGallery)
    return {
      data: this.present(inputGallery)
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
  url: string
  image: string
  postId: string
}

type Output = {
  data: GalleryProps
}
