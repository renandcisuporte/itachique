import { WebSite, WebSiteProps } from '@/core/domain/entity/website-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'

export class AllWebSiteUseCase {
  constructor(private readonly websiteRepository: WebSiteGateway) {}

  async execute(input: Input): Promise<Output> {
    const [total, result] = await Promise.all([
      this.websiteRepository.countWebSite(input),
      this.websiteRepository.allWebSite(input)
    ])

    return { data: result.map(this.present), total }
  }

  private present(props: WebSite): WebSiteProps {
    return {
      id: props.id,
      categoryName: props.categoryName,
      subCategoryName: props.subCategoryName,
      postTitle: props.postTitle,
      postDate: props.postDate,
      postLocale: props.postLocale,
      postCity: props.postCity,
      postCoverImage: props.postCoverImage,
      galleryImage: props.galleryImage,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt
    }
  }
}

type Input = {
  categoryName?: string
  subCategoryName?: string
  postTitle?: string
  postDate?: string
  postLocale?: string
  postCity?: string
  page?: number
  limit?: number
}
type Output = { data: WebSiteProps[]; total: number }
