import { Category } from '@/core/domain/entity/category-entity'

export interface CategoryGateway {
  all(): Promise<Category[]>
  create(input: Category): Promise<Category>
  update(id: string, input: Category): Promise<Category>
  delete(id: string): Promise<void>
}
