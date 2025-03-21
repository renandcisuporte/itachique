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
    const output = Post.with(input)

    const result = await this.repository.update(output.id!, output)
    return { data: this.present(result) }
  }

  private present(post: Post): PostProps {
    return {
      id: post.id,
      title: post.title,
      date: post.date,
      dateISO: post.dateISO,
      localeText: post.localeText,
      localeId: post.localeId,
      cityText: post.cityText,
      cityId: post.cityId,
      categoryName: post.categoryName,
      categoryId: post.categoryId,
      subCategoryName: post.subCategoryName,
      subCategoryId: post.subCategoryId,
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = PostProps
type Output = { data: PostProps }
