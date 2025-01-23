import { Category } from '@/core/domain/entity/category-entity'
import { WebSite } from '../entity/website-entity'

export interface WebSiteGateway {
  allCategory(): Promise<Category[]>
  countWebSite(input: Record<string, any>): Promise<number>
  allWebSite(input: Record<string, any>): Promise<WebSite[]>
  findSlugWebSite(id: string): Promise<WebSite | null>
  findTagsWebSite(tags: string): Promise<WebSite[] | null>
}
