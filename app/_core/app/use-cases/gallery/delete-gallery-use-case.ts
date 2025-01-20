import { Gallery, GalleryProps } from '@/core/domain/entity/gallery-entity'
import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'
import fs from 'fs'

export class DeleteGalleryUseCase {
  constructor(private readonly deleteRepository: GalleryGateway) {}

  async execute(input: Input): Promise<Output> {
    const gallery = await this.deleteRepository.find(input.id)
    if (!gallery) {
      return {
        data: []
      }
    }

    const fileName = `./public/${gallery.url}`
    const isExists = fs.existsSync(fileName)
    if (isExists) fs.unlinkSync(fileName)
    await this.deleteRepository.delete(input.id)

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
  id: string
}

type Output = {
  data: []
}
