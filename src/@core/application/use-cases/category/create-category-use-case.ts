import { Category } from '@/core/domain/entity/category-entity'
import { CategoryGateway } from '@/core/domain/gateway/category-gateway'
import { CategoryProps } from '@/core/domain/schemas/category-schema'

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryGateway) {}

  async execute(input: Input): Promise<Output> {
    const output = Category.create(input)
    const result = await this.categoryRepository.create(output)

    return { data: this.present(result) }
  }

  private present(post: Category): CategoryProps {
    return {
      id: post.id,
      name: post.name,
      position: post.position,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = CategoryProps
type Output = { data: CategoryProps }
