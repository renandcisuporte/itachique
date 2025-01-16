import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'

export class ListPostUseCase {
  constructor(private readonly repository: PostGateway) {}

  async execute(input: Input): Promise<Output> {
    const { q = '', page = 1, limit = '15' } = input

    const result = await this.repository.findAll(q, +page, +limit)

    return { data: result.map(this.present) }
  }

  private present(post: Post): PostProps {
    return {
      id: post.id,
      title: post.title,
      date: post.date,
      cityId: post.cityId,
      localeId: post.localeId,
      localeText: post.localeText,
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = {
  q?: string
  page?: number
  limit?: number
}
type Output = { data: PostProps[] }
