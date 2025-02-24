import {
  SiteMenuOutput,
  WebSiteGateway
} from '@/core/domain/gateway/website-gateway'

export class AllMenuSiteUseCase {
  constructor(private readonly websiteRepository: WebSiteGateway) {}

  async execute(): Promise<Output> {
    const result = await this.websiteRepository.allMenuWebSite()

    return {
      data: this.present(result)
    }
  }

  private present(item: SiteMenuOutput[]): Menu[] {
    const agrouped = item.reduce((acc: any, { category, subcategory }) => {
      const categoryName = category!
      if (!acc[categoryName]) {
        acc[categoryName] = {
          category: categoryName,
          parent: []
        }
      }
      acc[categoryName].parent.push({ subcategory: subcategory })

      return acc
    }, {})

    return Object.values(agrouped)
  }
}

type Menu = { category: string; parent: { subcategory: string }[] }
type Output = {
  data: Menu[]
}
