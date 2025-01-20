import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'

export class DeletePostUseCase {
  constructor(private readonly repository: PostGateway) {}

  async execute(id: string): Promise<Output> {
    await this.repository.delete(id)

    return { data: [] }
  }

  private present(post: Post): PostProps {
    return {
      id: post.id,
      title: post.title,
      date: post.date,
      localeText: post.localeText,
      localeId: post.localeId,
      cityText: post.cityText,
      cityId: post.cityId,
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = PostProps
type Output = { data: [] }
