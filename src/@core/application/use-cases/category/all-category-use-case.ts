import { Category } from '@/core/domain/entity/category-entity'
import { CategoryGateway } from '@/core/domain/gateway/category-gateway'
import { CategoryProps } from '@/core/domain/schemas/category-schema'

export class AllCategoryUseCase {
  constructor(private readonly repository: CategoryGateway) {}

  async execute(): Promise<Output> {
    const result = await this.repository.all()
    return {
      data: result.map(this.present)
    }
  }

  private present(props: Category): CategoryProps {
    return {
      id: props.id,
      name: props.name,
      position: props.position
    }
  }
}

type Output = {
  data: CategoryProps[]
}
