import { SubCategory } from '@/core/domain/entity/subcategory-entity'

export interface SubCategoryGateway {
  all(): Promise<SubCategory[]>
  create(input: SubCategory): Promise<SubCategory>
  update(id: string, input: SubCategory): Promise<SubCategory>
  delete(id: string): Promise<void>
}
