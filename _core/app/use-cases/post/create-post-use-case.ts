import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { UploadImageProvider } from '@/core/infra/provider/upload-image'

export class CreatePostUseCase {
  constructor(
    private readonly repository: PostGateway,
    private readonly imageProvider: UploadImageProvider
  ) {}

  async execute(input: Input): Promise<Output> {
    const output = Post.create(input)
    const { coverImage, ...restInput } = output

    const file = coverImage as unknown as File
    if (file.size > 0) {
      const result = await this.imageProvider.uploadSingle(file)
      Object.assign(output, { coverImage: result.url })
    }

    const result = await this.repository.create(output)
    return { data: this.present(result) }
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
type Output = { data: PostProps }
