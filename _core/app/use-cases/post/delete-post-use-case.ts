import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { unlink } from 'fs/promises'

export class DeletePostUseCase {
  constructor(
    private readonly postRepository: PostGateway,
    private readonly galleryRepository: GalleryGateway
  ) {}

  async execute(id: Input): Promise<Output> {
    const post = await this.postRepository.findById(id)
    if (!post) {
      return {
        data: []
      }
    }

    const galleryImage = await this.galleryRepository.all(id)
    if (galleryImage) {
      await Promise.all(
        galleryImage.map(async (file) => {
          try {
            await unlink(`./public/${file.url}`)
          } finally {
            await this.galleryRepository.delete(file.id!)
          }
        })
      )
    }

    await this.postRepository.delete(id)
    return { data: [] }
  }
}

type Input = string
type Output = { data: [] }
