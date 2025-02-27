import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PrismaClient } from '@prisma/client'

export class PostRepositoryPrisma implements PostGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Post> {
    const result = await this.prisma.post.findFirst({
      include: {
        city: { select: { city: true } },
        locale: { select: { name: true } },
        category: { select: { name: true, id: true } },
        subcategory: { select: { name: true, id: true } }
      },
      where: { id, deleted_at: null }
    })

    return Post.with({
      id: result?.id!,
      title: result?.title!,
      date: result?.date?.toString()!,
      cityId: result?.city_id!,
      cityText: result?.city?.city!,
      localeId: result?.locale_id!,
      localeText: result?.locale_text! || result?.locale?.name!,
      categoryId: result?.category?.id!,
      subCategoryId: result?.subcategory?.id!,
      categoryName: result?.category?.name!,
      subCategoryName: result?.subcategory?.name!,
      coverImage: result?.cover_image!,
      createdAt: result?.created_at!,
      updatedAt: result?.updated_at!
    })
  }

  async findCount(q: string): Promise<number> {
    const result = await this.prisma.post.count({
      where: { deleted_at: null, title: { contains: q } }
    })
    return result
  }

  async findAll(
    q: string,
    order: string,
    page: number = 1,
    limit: number = 15
  ): Promise<Post[]> {
    let orderBy = {}
    if (order.includes('asc')) orderBy = { date: 'asc' }
    if (order.includes('desc')) orderBy = { date: 'desc' }

    const result = await this.prisma.post.findMany({
      include: {
        city: { select: { city: true } },
        locale: { select: { name: true } },
        category: { select: { name: true, id: true } },
        subcategory: { select: { name: true, id: true } }
      },
      where: { deleted_at: null, title: { contains: q } },
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    })

    const output = result.map((item) =>
      Post.with({
        id: item.id,
        title: item.title,
        date: item.date?.toString()!,
        cityId: item.city_id!,
        cityText: item.city?.city!,
        localeId: item.locale_id!,
        localeText: item.locale_text! || item.locale?.name!,
        categoryId: item.category?.id!,
        categoryName: item.category?.name!,
        subCategoryId: item.subcategory?.id!,
        subCategoryName: item.subcategory?.name!,
        coverImage: item.cover_image!,
        createdAt: item.created_at!,
        updatedAt: item.updated_at!
      })
    )

    return output
  }

  async create(input: Post): Promise<Post> {
    const data = {
      id: input.id!,
      title: input.title,
      date: new Date(input.dateISO),
      city_id: input.cityId,
      locale_id: input.localeId,
      locale_text: input.localeText,
      cover_image: input.coverImage,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!
    }

    const result = await this.prisma.post.create({
      data,
      include: {
        city: { select: { city: true } },
        locale: { select: { name: true } }
      }
    })

    return Post.with({
      id: result.id,
      title: result.title,
      date: result.date?.toString()!,
      cityId: result.city_id!,
      cityText: result.city?.city!,
      localeId: result.locale_id!,
      localeText: result.locale_text! || result.locale?.name!,
      coverImage: result.cover_image!,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    })
  }

  async update(id: string, input: Post): Promise<Post> {
    const data = {
      title: input.title,
      date: new Date(input.dateISO),
      city_id: input.cityId,
      locale_id: input.localeId,
      locale_text: input.localeText,
      cover_image: input.coverImage,
      updated_at: input.updatedAt!
    }

    const result = await this.prisma.post.update({
      where: { id },
      data,
      include: {
        city: { select: { city: true } },
        locale: { select: { name: true } },
        category: { select: { name: true, id: true } },
        subcategory: { select: { name: true, id: true } }
      }
    })

    return Post.with({
      id: result.id,
      title: result.title,
      date: result.date!,
      cityId: result.city_id!,
      cityText: result.city?.city!,
      localeId: result.locale_id!,
      localeText: result.locale_text! || result.locale?.name!,
      categoryId: result.category?.id!,
      categoryName: result.category?.name!,
      subCategoryId: result.subcategory?.id!,
      subCategoryName: result.subcategory?.name!,
      coverImage: result.cover_image?.replace('á', 'Ã¡').replace('ç', 'Ã§')!,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }
}
