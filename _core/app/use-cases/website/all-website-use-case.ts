import { WebSite, WebSiteProps } from '@/core/domain/entity/website-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'

export class AllWebSiteUseCase {
  constructor(private readonly websiteRepository: WebSiteGateway) {}

  async execute(input: Input): Promise<Output> {
    const total = await this.websiteRepository.countWebSite(input)
    const result = await this.websiteRepository.allWebSite(input)

    return { data: result.map(this.present), total }
  }

  private present(props: WebSite): WebSiteProps {
    return {
      id: props.id,
      categorySlug: props.categorySlug,
      categoryName: props.categoryName,
      postSlug: props.postSlug,
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
  postTitle?: string
  postDate?: string
  postLocale?: string
  postCity?: string
  page?: number
  limit?: number
}
type Output = { data: WebSiteProps[]; total: number }
