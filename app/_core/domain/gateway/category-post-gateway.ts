import { CategoryPost } from '@/core/domain/entity/category-post-entity'

export interface CategoryPostGateway {
  save(input: CategoryPost): Promise<void>
}
