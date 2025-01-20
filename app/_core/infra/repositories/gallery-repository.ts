import { Gallery } from '@/core/domain/entity/gallery-entity'
import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'
import { PrismaClient } from '@prisma/client'

export class GalleryRepositoryPrisma implements GalleryGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.gallery.delete({
      where: { id }
    })
  }

  async find(id: string): Promise<Gallery> {
    const result = await this.prisma.gallery.findFirst({
      where: { id }
    })

    if (!result) null

    return Gallery.with({
      id: result!.id!,
      image: result!.image!,
      postId: result!.post_id!,
      url: result!.url!
    })
  }

  async save(input: Gallery): Promise<Gallery> {
    const data = {
      id: input.id!,
      image: input.image,
      post_id: input.postId,
      url: input.url
    }

    const result = await this.prisma.gallery.create({
      data
    })

    return Gallery.with({
      id: result.id!,
      image: result.image!,
      postId: result.post_id!,
      url: result.url
    })
  }

  async all(post_id: string): Promise<Gallery[]> {
    const result = await this.prisma.gallery.findMany({
      where: { post_id }
    })

    return result.map((item) => {
      return Gallery.with({
        id: item.id!,
        image: item.image!,
        postId: item.post_id!,
        url: item.url
      })
    })
  }
}
