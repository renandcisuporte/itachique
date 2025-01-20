import { Post } from '@/core/domain/entity/post-entity'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { UploadImageProvider } from '@/core/infra/provider/upload-image'

export class UpdatePostUseCase {
  constructor(
    private readonly repository: PostGateway,
    private readonly imageProvider: UploadImageProvider
  ) {}

  async execute(input: Input): Promise<Output> {
    let coverImage = null
    if (input?.coverImage) {
      const result = await this.imageProvider.uploadSingle(
        input?.coverImage as unknown as File
      )
      coverImage = result.url
    }

    const output = Post.with({
      id: input.id!,
      title: input.title!,
      date: input.date!,
      localeText: input.localeText!,
      localeId: input.localeId!,
      cityText: input.cityText!,
      cityId: input.cityId!,
      coverImage: coverImage!
    })

    const result = await this.repository.update(output.id!, output)
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
