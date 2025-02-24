import { Advertisement } from '@/core/domain/entity/advertisement-entity'
import { Category } from '@/core/domain/entity/category-entity'
import { WebSite } from '@/core/domain/entity/website-entity'

export type SiteMenuOutput = {
  category: string
  subcategory: string
}

export interface WebSiteGateway {
  allCategory(): Promise<Category[]>
  allMenuWebSite(): Promise<SiteMenuOutput[]>
  countWebSite(input: Record<string, any>): Promise<number>
  allWebSite(input: Record<string, any>): Promise<WebSite[]>
  findSlugWebSite(id: string): Promise<WebSite | null>
  findTagsWebSite(tags: string): Promise<WebSite[] | null>
  allWebSiteAds(): Promise<Advertisement[]>
}
