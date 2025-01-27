import { CategoryGateway } from '@/core/domain/gateway/category-gateway'

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryGateway) {}

  async execute(id: Input): Promise<Output> {
    await this.categoryRepository.delete(id)
  }
}

type Input = string
type Output = void
