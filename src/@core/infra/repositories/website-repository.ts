import { Advertisement } from '@/core/domain/entity/advertisement-entity'
import { UpcomingEvent } from '@/core/domain/entity/upcoming-event-entity'
import { WebSite } from '@/core/domain/entity/website-entity'
import {
  SiteMenuOutput,
  WebSiteGateway
} from '@/core/domain/gateway/website-gateway'
import { PrismaClient } from '@prisma/client'

export class WebSiteRepositoryPrisma implements WebSiteGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async allMenuWebSite(): Promise<SiteMenuOutput[]> {
    const posts = await this.prisma.post.findMany({
      distinct: ['category_id', 'subcategory_id'],
      where: {
        deleted_at: null,
        category: {
          deleted_at: null
        }
      },
      select: {
        category: {
          select: {
            name: true
          }
        },
        subcategory: {
          select: {
            name: true
          }
        }
      }
    })
    const upcomings = await this.prisma.upcomingEvent.findMany({
      distinct: ['category_id'],
      where: {
        deleted_at: null,
        category: {
          deleted_at: null
        }
      },
      select: {
        category: {
          select: {
            name: true
          }
        }
      }
    })

    // Unindo e organizando os resultados
    const combined = [
      ...posts.map((post) => ({
        category: post.category?.name!,
        subcategory: post.subcategory?.name || null
      })),
      ...upcomings.map((event) => ({
        category: event.category?.name!
      }))
    ]

    return combined
  }

  async allWebSiteAds(): Promise<Advertisement[]> {
    const date = new Date(new Date().toISOString().split('T')[0])

    const result = await this.prisma.advertisement.findMany({
      where: {
        deleted_at: null,
        validated_at: {
          gte: date
        }
      }
    })

    return result.map((item) => {
      return Advertisement.with({
        id: item.id,
        title: item.title,
        description: item.description,
        galleryImages: item.gallery_images,
        galleryImagesJson: JSON.parse(item.gallery_images),
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

  async countWebSite(input: Record<string, any>): Promise<number> {
    let where = {
      deleted_at: null,
      category: { deleted_at: null }
    }
    if (input && input.categoryName) {
      Object.assign(where.category, {
        slug: {
          contains: input.categoryName
        }
      })
    }

    if (input?.subCategoryName) {
      Object.assign(where, {
        subcategory: {
          slug: { contains: input.subCategoryName }
        }
      })
    }

    if (input && input.postTitle) {
      Object.assign(where, {
        title: { contains: input.postTitle }
      })
    }

    return await this.prisma.post.count({
      where
    })
  }

  async allWebSite(input: Record<string, any> = {}): Promise<WebSite[]> {
    const limit = input.limit || 10
    const page = input.page || 1

    let where = {
      deleted_at: null,
      category: { deleted_at: null }
    }

    if (input?.categoryName) {
      Object.assign(where.category, {
        slug: { contains: input.categoryName }
      })
    }

    if (input?.subCategoryName) {
      Object.assign(where, {
        subcategory: {
          slug: { contains: input.subCategoryName }
        }
      })
    }

    if (input?.postTitle) {
      Object.assign(where, {
        title: { contains: input.postTitle }
      })
    }

    if (input?.postDate) {
      Object.assign(where, {
        date: { lte: new Date(input.postDate) }
      })
    }

    const result = await this.prisma.post.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where,
      orderBy: {
        date: 'desc'
      },
      include: {
        city: true,
        locale: true,
        gallery: {
          orderBy: {
            image: 'asc'
          }
        },
        category: true,
        subcategory: true
      }
    })

    return result.map(
      ({ category, subcategory, gallery, city, locale, ...rest }) => {
        const galleryImage = gallery?.map((item) => ({
          id: item.id!,
          url: item.url!,
          image: item.image!
        }))

        return WebSite.with({
          id: rest.id,
          categoryName: category?.name!,
          subCategoryName: subcategory?.name!,
          postCity: city?.city!,
          postDate: rest.date
            ?.toISOString()
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')!,
          postLocale: rest.locale_text ?? locale?.name!,
          postTitle: rest.title!,
          postCoverImage: rest.cover_image!,
          galleryImage: galleryImage!,
          createdAt: rest.created_at!,
          updatedAt: rest.updated_at!
        })
      }
    )
  }

  async findSlugWebSite(id: string): Promise<WebSite | null> {
    const result = await this.prisma.post.findFirst({
      where: { id, deleted_at: null },
      include: {
        category: true,
        subcategory: true,
        city: true,
        locale: true,
        gallery: true
      }
    })

    if (!result) return null

    const { gallery, category, subcategory, city, locale, ...rest } = result
    const galleryImage = gallery
      ?.map((item) => ({
        id: item.id!,
        url: item.url!,
        image: item.image!
      }))
      ?.sort((a, b) => {
        const matchA = a.image?.match(/\((\d+)\)/)
        const matchB = b.image?.match(/\((\d+)\)/)

        const numA = matchA ? parseInt(matchA[1], 10) : 0
        const numB = matchB ? parseInt(matchB[1], 10) : 0

        return numA - numB
      })

    return WebSite.with({
      id: rest.id,
      categoryName: category?.name!,
      subCategoryName: subcategory?.name!,
      postCity: city?.city!,
      postDate: rest.date
        ?.toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')!,
      postLocale: rest.locale_text ?? locale?.name!,
      postTitle: rest.title!,
      postCoverImage: rest.cover_image!,
      galleryImage: galleryImage!,
      createdAt: rest.created_at!,
      updatedAt: rest.updated_at!
    })
  }

  async findTagsWebSite(tags: string): Promise<WebSite[] | null> {
    const stringKey = tags.trim().split('-').slice(3, 6)

    const result = await this.prisma.post.findMany({
      orderBy: {
        date: 'desc'
      },
      where: {
        deleted_at: null,
        title: {
          in: stringKey
        }
      },
      include: {
        category: true,
        subcategory: true,
        city: true,
        locale: true,
        gallery: true
      }
    })

    if (!result) return null

    return result.map(
      ({ category, subcategory, gallery, locale, city, ...rest }) => {
        const galleryImage = gallery
          ?.map((item) => ({
            id: item.id!,
            url: item.url!,
            image: item.image!
          }))
          ?.sort((a, b) => {
            const matchA = a.image?.match(/\((\d+)\)/)
            const matchB = b.image?.match(/\((\d+)\)/)

            const numA = matchA ? parseInt(matchA[1], 10) : 0
            const numB = matchB ? parseInt(matchB[1], 10) : 0

            return numA - numB
          })

        return WebSite.with({
          id: rest.id,
          categoryName: category?.name!,
          subCategoryName: subcategory?.name!,
          postCity: city?.city!,
          postDate: rest.date
            ?.toISOString()
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')!,
          postLocale: rest.locale_text ?? locale?.name!,
          postTitle: rest.title!,
          postCoverImage: rest.cover_image!,
          galleryImage: galleryImage!,
          createdAt: rest.created_at!,
          updatedAt: rest.updated_at!
        })
      }
    )
  }

  async upcomingEventWebSite(
    input: Record<string, any> = {}
  ): Promise<UpcomingEvent[]> {
    const where = {
      deleted_at: null,
      date: {
        gte: new Date()
      }
    }

    if (input.id) Object.assign(where, { id: input.id })

    if (input.categoryName) {
      Object.assign(where, {
        category: {
          slug: { contains: input.categoryName }
        }
      })
    }

    const result = await this.prisma.upcomingEvent.findMany({
      where,
      orderBy: {
        date: 'asc'
      }
    })

    return result.map((item) => {
      return UpcomingEvent.with({
        id: item.id,
        title: item.title,
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
