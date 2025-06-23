import { UpcomingEvent } from '@/core/domain/entity/upcoming-event-entity'
import { UpcomingEventGateway } from '@/core/domain/gateway/upcoming-event-gateway'
import { PrismaClient } from '@prisma/client'

export class UpcomingEventRepositoryPrisma implements UpcomingEventGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.upcomingEvent.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }

  async find(id: string): Promise<UpcomingEvent | null> {
    const result = await this.prisma.upcomingEvent.findFirst({
      where: { id }
    })

    if (!result) return null

    return UpcomingEvent.with({
      id: result.id,
      title: result.title,
      description: result.description!,
      categoryId: result.category_id!,
      locale: result.locale,
      date: result.date,
      galleryImages: result.gallery_images,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async update(id: string, input: UpcomingEvent): Promise<UpcomingEvent> {
    const data = {
      title: input.title,
      date: new Date(input.dateISO),
      gallery_images: input.galleryImages,
      description: input.description,
      category_id: input.categoryId!,
      locale: input.locale!,
      updated_at: new Date()
    }

    const result = await this.prisma.upcomingEvent.update({
      where: { id },
      data
    })

    return UpcomingEvent.with({
      id: result.id,
      title: result.title,
      description: result.description!,
      categoryId: result.category_id!,
      locale: result.locale,
      date: result.date,
      galleryImages: result.gallery_images,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async create(input: UpcomingEvent): Promise<UpcomingEvent> {
    const data = {
      id: input.id!,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!,
      title: input.title,
      category_id: input.categoryId!,
      gallery_images: input.galleryImages || '',
      description: input.description!,
      locale: input.locale!,
      date: new Date(input.dateISO)
    }

    const result = await this.prisma.upcomingEvent.create({
      data
    })

    return UpcomingEvent.with({
      id: result.id,
      title: result.title,
      description: input.description,
      galleryImages: result.gallery_images,
      categoryId: result.category_id!,
      locale: result.locale,
      date: result.date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async allUpcomingEvent(): Promise<UpcomingEvent[]> {
    const result = await this.prisma.upcomingEvent.findMany({
      where: {
        deleted_at: null
      }
    })

    return result.map((item) => {
      return UpcomingEvent.with({
        id: item.id,
        title: item.title,
        categoryId: item.category_id!,
        date: item.date,
        galleryImages: item.gallery_images,
        description: item.description!,
        locale: item.locale,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }

  async allUpcomingEventValidated(): Promise<UpcomingEvent[]> {
    const result = await this.prisma.upcomingEvent.findMany({
      orderBy: {
        date: 'asc'
      },
      where: {
        deleted_at: null,
        date: {
          gte: new Date()
        }
      }
    })

    return result.map((item) => {
      return UpcomingEvent.with({
        id: item.id,
        title: item.title,
        categoryId: item.category_id!,
        date: item.date,
        galleryImages: item.gallery_images,
        description: item.description!,
        locale: item.locale,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }
}
