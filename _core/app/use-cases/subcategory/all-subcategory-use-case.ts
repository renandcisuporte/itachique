import { SubCategory } from '@/core/domain/entity/subcategory-entity'
import { SubCategoryGateway } from '@/core/domain/gateway/subcategory-gateway'
import { SubCategoryProps } from '@/core/domain/schemas/subcategory-schema'

export class AllSubCategoryUseCase {
  constructor(private readonly repository: SubCategoryGateway) {}

  async execute(): Promise<Output> {
    const result = await this.repository.all()
    return {
      data: result.map(this.present)
    }
  }

  private present(props: SubCategory): SubCategoryProps {
    return {
      id: props.id,
      name: props.name,
      position: props.position
    }
  }
}

type Output = {
  data: SubCategoryProps[]
}
