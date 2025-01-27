import { Category } from '@/core/domain/entity/category-entity'
import { CategoryPost } from '@/core/domain/entity/category-post-entity'
import { CategoryPostGateway } from '@/core/domain/gateway/category-post-gateway'
import { CategoryProps } from '@/core/domain/schemas/category-schema'

export class CreateCategoryPostUseCase {
  constructor(private readonly repositoryCategoryPost: CategoryPostGateway) {}

  async execute(input: Input): Promise<Output> {
    const output = CategoryPost.create(input)
    await this.repositoryCategoryPost.save(output)
    return {
      data: []
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

type Input = {
  categoryId: string
  postId: string
}

type Output = {
  data: []
}
