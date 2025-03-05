import { NotFoundError } from '@/core/app/errors/not-found-error'
import { Post } from '@/core/domain/entity/post-entity'
import { GalleryGateway } from '@/core/domain/gateway/gallery-gateway'
import { PostGateway } from '@/core/domain/gateway/post-gateway'
import { PostProps } from '@/core/domain/schemas/post-schema'

export class FindPostUseCase {
  constructor(
    private readonly gatewayPost: PostGateway,
    private readonly gatewayGallery: GalleryGateway
  ) {}

  async execute(input: Input): Promise<Output> {
    const post = await this.gatewayPost.findById(input.id)
    if (!post) throw new NotFoundError()

    const images = await this.gatewayGallery.all(input.id)

    const postWithGallery = Post.with({
      id: post.id,
      title: post.title,
      date: post.dateISO,
      cityId: post.cityId || null,
      cityText: post.cityText || '',
      localeId: post.localeId || null,
      localeText: post.localeText || '',
      categoryId: post.categoryId || null,
      categoryName: post.categoryName || '',
      subCategoryId: post.subCategoryId || null,
      subCategoryName: post.subCategoryName || '',
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      galleryImage: images
        .map((image) => ({
          id: image.id,
          image: image.image,
          url: image.url
        }))
        ?.sort((a, b) => {
          const numA = parseInt(a.image.match(/\((\d+)\)/)![1], 10)
          const numB = parseInt(b.image.match(/\((\d+)\)/)![1], 10)
          return numA - numB
        })
    })

    return {
      data: this.present(postWithGallery)
    }
  }

  private present(post: Post): PostProps {
    return {
      id: post.id,
      title: post.title,
      date: post.dateISO,
      cityId: post.cityId,
      cityText: post.cityText,
      localeId: post.localeId,
      localeText: post.localeText,
      categoryId: post.categoryId,
      categoryName: post.categoryName,
      subCategoryId: post.subCategoryId,
      subCategoryName: post.subCategoryName,
      coverImage: post.coverImage,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      galleryImage: post.galleryImage
    }
  }
}

type Input = {
  id: string
}
type Output = { data: PostProps }
