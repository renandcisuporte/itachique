import { UpcomingEvent } from '@/core/domain/entity/upcoming-event-entity'
import { WebSiteProps } from '@/core/domain/entity/website-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'

export class AllUpcomingSiteUseCase {
  constructor(private readonly repository: WebSiteGateway) {}

  async execute(input: Record<string, {}>): Promise<{ data: WebSiteProps[] }> {
    const data = await this.repository.upcomingEventWebSite(input)
    return { data: data.map(this.present) }
  }

  private present(props: UpcomingEvent): WebSiteProps {
    return {
      id: props.id!,
      categoryName: '',
      postTitle: props.title,
      postDate: new Date(props.date!)
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')!,
      postLocale: props.locale,
      postCity: props?.city || '',
      subCategoryName: props.description!, // usado para descrição
      postCoverImage: props.galleryImages!,
      galleryImage: [],
      createdAt: props.createdAt!,
      updatedAt: props.updatedAt!
    }
  }
}
