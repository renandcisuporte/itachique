import { City } from '@/core/domain/entity/city-entity'
import { CityGateway } from '@/core/domain/gateway/city-gateway'
import { CityProps } from '@/core/domain/schemas/city-schema'

export class UpdateCityUseCase {
  constructor(private readonly repository: CityGateway) {}

  async execute(input: Input): Promise<Output> {
    const output = City.with(input)
    const result = await this.repository.update(input.id!, output)

    return { data: this.present(result) }
  }

  private present(post: City): CityProps {
    return {
      id: post.id,
      city: post.city,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = CityProps
type Output = { data: CityProps }
