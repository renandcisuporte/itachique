import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'

export class ListPostUseCase {
  constructor(private readonly repository: PostGateway) {}

  async execute(input: Input): Promise<Output & { total: number }> {
    const { q = '', order = '', page = 1, limit = '15' } = input
    const total = await this.repository.findCount(q)
    const result = await this.repository.findAll(q, order, +page, +limit)

    return { data: result.map(this.present), total }
  }

  private present(post: Post): PostProps {
    return {
      id: post.id,
      title: post.title,
      date: post.date,
      dateISO: post.dateISO,
      cityId: post.cityId,
      localeId: post.localeId,
      localeText: post.localeText,
      cityText: post.cityText,
      categoryId: post.categoryId,
      categoryName: post.categoryName,
      subCategoryId: post.subCategoryId,
      subCategoryName: post.subCategoryName,
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = {
  q?: string
  order?: string
  page?: number
  limit?: number
}
type Output = { data: PostProps[] }
