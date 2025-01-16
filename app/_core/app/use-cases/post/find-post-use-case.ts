import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { NotFoundError } from '@/core/app/errors/not-found-error'

export class FindPostUseCase {
  constructor(private readonly repository: PostGateway) {}

  async execute(input: Input): Promise<Output> {
    const result = await this.repository.findById(input.id)
    if (!result) throw new NotFoundError()

    return { data: this.present(result) }
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
  id: string
}
type Output = { data: PostProps }
