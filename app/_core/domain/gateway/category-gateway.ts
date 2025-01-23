import { Category } from '@/core/domain/entity/category-entity'

export interface CategoryGateway {
  all(): Promise<Category[]>
}
