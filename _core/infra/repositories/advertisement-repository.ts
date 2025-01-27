import { Advertisement } from '@/core/domain/entity/advertisement-entity'
import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'
import { PrismaClient } from '@prisma/client'

export class AdvertisementRepositoryPrisma implements AdvertisementGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.advertisement.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }

  async update(id: string, input: Advertisement): Promise<Advertisement> {
    const data = {
      title: input.title,
      gallery_images: input.galleryImages,
      position: input.position,
      description: input.description,
      link: input.link!,
      is_active: input.isActive,
      validated_at: input.validatedAt,
      updated_at: input.updatedAt
    }

    const result = await this.prisma.advertisement.update({
      where: { id },
      data
    })

    return Advertisement.with({
      id: result.id,
      title: result.title,
      position: result.position,
      isActive: result.is_active,
      validatedAt: result.validated_at,
      galleryImages: result.gallery_images,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async create(input: Advertisement): Promise<Advertisement> {
    const data = {
      id: input.id!,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt,
      title: input.title,
      link: input.link!,
      gallery_images: input.galleryImages!,
      position: input.position,
      description: input.description!,
      is_active: input.isActive,
      validated_at: input.validatedAt
    }

    const result = await this.prisma.advertisement.create({
      data
    })

    return Advertisement.with({
      id: result.id,
      title: result.title,
      position: result.position,
      description: input.description,
      isActive: result.is_active,
      validatedAt: result.validated_at,
      galleryImages: result.gallery_images,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async allAdvertisement(): Promise<Advertisement[]> {
    const result = await this.prisma.advertisement.findMany({
      where: {
        deleted_at: null
      }
    })

    return result.map((item) => {
      return Advertisement.with({
        id: item.id,
        title: item.title,
        description: item.description,
        galleryImages: item.gallery_images,
        position: item.position,
        link: item.link,
        isActive: item.is_active,
        validatedAt: item.validated_at!,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }
}
