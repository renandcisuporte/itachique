import { AllAdvertisementWebSiteUseCase } from '../../application/use-cases/website/all-advertisement-website-use-case'
import { AllMenuSiteUseCase } from '../../application/use-cases/website/all-menusite-use-case'
import { AllUpcomingSiteUseCase } from '../../application/use-cases/website/all-upcomingsite-use-case'
import { AllWebSiteUseCase } from '../../application/use-cases/website/all-website-use-case'
import { FindByTagsSiteUseCase } from '../../application/use-cases/website/find-by-tags-website-use-case'
import { FindWebSiteUseCase } from '../../application/use-cases/website/find-website-use-case'
import { AdvertisementProps } from '../../domain/entity/advertisement-entity'
import { WebSiteProps } from '../../domain/entity/website-entity'

export class WebSiteActionImpl {
  constructor(
    private readonly listUseCase: AllWebSiteUseCase,
    private readonly findUseCase: FindWebSiteUseCase,
    private readonly findByTagsUseCase: FindByTagsSiteUseCase,
    private readonly allAdsUseCase: AllAdvertisementWebSiteUseCase,
    private readonly allUpcomingUseCase: AllUpcomingSiteUseCase,
    private readonly findMenuUseCase: AllMenuSiteUseCase
  ) {}

  async listByAds(): Promise<{ data: AdvertisementProps[] }> {
    return await this.allAdsUseCase.execute()
  }

  async listByTags(input: string): Promise<{ data: WebSiteProps[] | null }> {
    return await this.findByTagsUseCase.execute(input)
  }

  async list(input: Input): Promise<OutputArray> {
    return await this.listUseCase.execute(input)
  }

  async find(id: string): Promise<OutputSingle> {
    return await this.findUseCase.execute({ id })
  }

  async listUpcomingEvents(input: Input): Promise<{ data: WebSiteProps[] }> {
    return await this.allUpcomingUseCase.execute(input)
  }

  async findListMenus(): Promise<{ data: Menu[] }> {
    return await this.findMenuUseCase.execute()
  }
}

type Input = Record<string, {}>

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}

type OutputSingle = {
  data?: WebSiteProps | null
  total?: number
} & Outhers

type OutputArray = {
  data: WebSiteProps[]
  total: number
} & Outhers

type Menu = { category: string; parent: { subcategory: string }[] }
