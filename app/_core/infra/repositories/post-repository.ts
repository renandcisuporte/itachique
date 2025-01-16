import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PrismaClient } from '@prisma/client'

export class PostRepositoryPrisma implements PostGateway {
  constructor(protected readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Post> {
    const result = await this.prisma.post.findFirst({
      where: { id, deleted_at: null }
    })

    return Post.with({
      id: result?.id!,
      title: result?.title!,
      date: result?.date?.toString()!,
      cityId: result?.city_id!,
      localeId: result?.locale_id!,
      localeText: result?.locale_text!,
      coverImage: result?.cover_image!,
      createdAt: result?.created_at!,
      updatedAt: result?.updated_at!
    })
  }

  async findAll(
    q: string,
    page: number = 1,
    limit: number = 15
  ): Promise<Post[]> {
    const result = await this.prisma.post.findMany({
      where: { deleted_at: null, title: { contains: q } },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const output = result.map((item) =>
      Post.with({
        id: item.id,
        title: item.title,
        date: item.date?.toString()!,
        cityId: item.city_id!,
        localeId: item.locale_id!,
        localeText: item.locale_text!,
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
      date: input.date,
      city_id: input.cityId,
      locale_id: input.localeId,
      locale_text: input.localeText,
      cover_image: input.coverImage,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!
    }

    const result = await this.prisma.post.create({
      data
    })

    return Post.with({
      id: result.id,
      title: result.title,
      date: result.date?.toString()!,
      cityId: result.city_id!,
      localeId: result.locale_id!,
      localeText: result.locale_text!,
      coverImage: result.cover_image!,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    })
  }

  async update(id: string, input: Post): Promise<Post> {
    const data = {
      id: input.id!,
      title: input.title,
      date: input.date,
      city_id: input.cityId,
      locale_id: input.localeId,
      locale_text: input.localeText,
      cover_image: input.coverImage,
      updated_at: input.updatedAt!
    }

    const result = await this.prisma.post.update({
      where: { id },
      data
    })

    return Post.with({
      id: result.id,
      title: result.title,
      date: result.date?.toString()!,
      cityId: result.city_id!,
      localeId: result.locale_id!,
      localeText: result.locale_text!,
      coverImage: result.cover_image!,
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
