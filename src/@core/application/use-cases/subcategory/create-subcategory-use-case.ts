import { SubCategory } from '@/core/domain/entity/subcategory-entity'
import { SubCategoryGateway } from '@/core/domain/gateway/subcategory-gateway'
import { SubCategoryProps } from '@/core/domain/schemas/subcategory-schema'

export class CreateSubCategoryUseCase {
  constructor(private readonly categoryRepository: SubCategoryGateway) {}

  async execute(input: Input): Promise<Output> {
    const output = SubCategory.create(input)
    const result = await this.categoryRepository.create(output)

    return { data: this.present(result) }
  }

  private present(post: SubCategory): SubCategoryProps {
    return {
      id: post.id,
      name: post.name,
      position: post.position,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = SubCategoryProps
type Output = { data: SubCategoryProps }
