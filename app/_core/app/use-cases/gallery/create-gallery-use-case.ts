import { Gallery, GalleryProps } from '@/core/domain/entity/gallery-entity'
import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'
import { UploadImageProvider } from '@/core/infra/provider/upload-image'

export class CreateGalleryUseCase {
  constructor(
    private readonly createRepository: GalleryGateway,
    private readonly imageProvider: UploadImageProvider
  ) {}

  async execute(input: Input[]): Promise<Output> {
    const images = await this.imageProvider.uploadMultiple(
      input.map((i) => i.file!)
    )

    for (const image of images) {
      const gallery = Gallery.create({
        image: image.image,
        url: image.url,
        postId: input[0].postId
      })

      await this.createRepository.save(gallery)
    }

    return {
      data: []
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
  file: File
  postId: string
}

type Output = {
  data: []
}
