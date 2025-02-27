import { SubCategoryGateway } from '@/core/domain/gateway/subcategory-gateway'

export class DeleteSubCategoryUseCase {
  constructor(private readonly categoryRepository: SubCategoryGateway) {}

  async execute(id: Input): Promise<Output> {
    await this.categoryRepository.delete(id)
  }
}

type Input = string
type Output = void
