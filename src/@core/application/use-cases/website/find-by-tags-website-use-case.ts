import { WebSite, WebSiteProps } from '@/core/domain/entity/website-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'

export class FindByTagsSiteUseCase {
  constructor(private readonly websiteRepository: WebSiteGateway) {}

  async execute(input: string): Promise<Output> {
    const result = await this.websiteRepository.findTagsWebSite(input)
    if (!result) return { data: null }

    return {
      data: result.map(this.present)
    }
  }

  private present(props: WebSite): WebSiteProps {
    return WebSite.with(props)
  }
}

type Input = { id: string }
type Output = { data: WebSiteProps[] | null }
