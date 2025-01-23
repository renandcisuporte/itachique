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
    const { coverImage, ...restInput } = input

    let data = {} as PostProps
    data = { ...restInput }

    const file = coverImage as unknown as File
    if (file.size > 0) {
      const result = await this.imageProvider.uploadSingle(file)
      data = {
        ...restInput,
        coverImage: result.url
      }
    }

    const output = Post.with(data)
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
      categoryName: post.categoryName,
      categoryId: post.categoryId,
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = PostProps
type Output = { data: PostProps }
