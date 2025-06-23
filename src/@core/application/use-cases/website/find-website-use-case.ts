import { WebSite, WebSiteProps } from '@/core/domain/entity/website-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'

export class FindWebSiteUseCase {
  constructor(private readonly websiteRepository: WebSiteGateway) {}

  async execute(input: Input): Promise<Output> {
    const result = await this.websiteRepository.findSlugWebSite(input.id)
    if (!result) return { data: null }

    return {
      data: this.present(result)
    }
  }

  private present(props: WebSite): WebSiteProps {
    return WebSite.with(props)
  }
}

type Input = { id: string }
type Output = { data: WebSiteProps | null }
