import { Category } from '@/core/domain/entity/category-entity'
import { WebSite } from '@/core/domain/entity/website-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'
import { PrismaClient } from '@prisma/client'

export class WebSiteRepositoryPrisma implements WebSiteGateway {
  constructor(private readonly prisma: PrismaClient) {}

  allCategory(): Promise<Category[]> {
    throw new Error('Method not implemented.')
  }

  async countWebSite(input: Record<string, any>): Promise<number> {
    let where = { post: { deleted_at: null }, category: { deleted_at: null } }
    if (input && input.categoryName) {
      Object.assign(where, {
        category: {
          name: {
            contains: input.categoryName
          }
        }
      })
    }

    if (input && input.postTitle) {
      Object.assign(where, {
        post: {
          title: {
            contains: input.postTitle
          }
        }
      })
    }

    return await this.prisma.categoryPost.count({
      where
    })
  }

  async allWebSite(input: Record<string, any> = {}): Promise<WebSite[]> {
    const limit = input.limit || 10
    const page = input.page || 1

    let where = { post: { deleted_at: null }, category: { deleted_at: null } }
    if (input && input.categoryName) {
      Object.assign(where, {
        category: {
          name: {
            contains: input.categoryName
          }
        }
      })
    }

    if (input && input.postTitle) {
      Object.assign(where, {
        post: {
          title: {
            contains: input.postTitle
          }
        }
      })
    }

    const result = await this.prisma.categoryPost.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where,
      orderBy: {
        post: {
          date: 'desc'
        }
      },
      include: {
        category: true,
        post: {
          include: {
            city: true,
            locale: true,
            gallery: true
          }
        }
      }
    })

    return result.map(({ category, post, ...rest }) => {
      const galleryImage = post?.gallery?.map((item) => ({
        id: item.id!,
        url: item.url!,
        image: item.image!
      }))

      return WebSite.with({
        id: rest.id,
        categoryName: category?.name!,
        categorySlug: category?.name!,
        postCity: post?.city?.city!,
        postDate: post?.date
          ?.toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('/')!,
        postLocale: post?.locale?.name!,
        postSlug: '',
        postTitle: post?.title!,
        postCoverImage: post?.cover_image!,
        galleryImage: galleryImage!,
        createdAt: post?.created_at!,
        updatedAt: post?.updated_at!
      })
    })
  }

  async findSlugWebSite(id: string): Promise<WebSite | null> {
    const result = await this.prisma.categoryPost.findFirst({
      where: { id },
      include: {
        category: true,
        post: {
          include: {
            city: true,
            locale: true,
            gallery: true
          }
        }
      }
    })

    if (!result) return null

    const { category, post, ...rest } = result
    const galleryImage = post?.gallery?.map((item) => ({
      id: item.id!,
      url: item.url!,
      image: item.image!
    }))

    return WebSite.with({
      id: rest.id,
      categoryName: category?.name!,
      categorySlug: category?.name!,
      postCity: post?.city?.city!,
      postDate: post?.date
        ?.toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')!,
      postLocale: post?.locale?.name!,
      postSlug: '',
      postTitle: post?.title!,
      postCoverImage: post?.cover_image!,
      galleryImage: galleryImage!,
      createdAt: post?.created_at!,
      updatedAt: post?.updated_at!
    })
  }

  async findTagsWebSite(tags: string): Promise<WebSite[] | null> {
    const regex = /-\s*(.*?)\s*-/
    const matches = tags.match(regex)
    const stringKey = tags.trim().split('-').slice(3, 6)

    console.log(stringKey)

    const result = await this.prisma.categoryPost.findMany({
      orderBy: {
        post: {
          date: 'desc'
        }
      },
      where: {
        post: {
          title: {
            in: stringKey
          }
        }
      },
      include: {
        category: true,
        post: {
          include: {
            city: true,
            locale: true,
            gallery: true
          }
        }
      }
    })

    if (!result) return null

    return result.map(({ category, post, ...rest }) => {
      const galleryImage = post?.gallery?.map((item) => ({
        id: item.id!,
        url: item.url!,
        image: item.image!
      }))
      return WebSite.with({
        id: rest.id,
        categoryName: category?.name!,
        categorySlug: category?.name!,
        postCity: post?.city?.city!,
        postDate: post?.date
          ?.toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('/')!,
        postLocale: post?.locale?.name!,
        postSlug: '',
        postTitle: post?.title!,
        postCoverImage: post?.cover_image!,
        galleryImage: galleryImage!,
        createdAt: post?.created_at!,
        updatedAt: post?.updated_at!
      })
    })
  }
}
