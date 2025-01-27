import { City } from '@/core/domain/entity/city-entity'
import { CityGateway } from '@/core/domain/gateway/city-gateway'
import { CityProps } from '@/core/domain/schemas/city-schema'

export class AllCityUseCase {
  constructor(private readonly repository: CityGateway) {}

  async execute(): Promise<Output> {
    const result = await this.repository.all()
    return {
      data: result.map(this.present)
    }
  }

  private present(props: City): CityProps {
    return {
      id: props.id,
      city: props.city
    }
  }
}

type Output = {
  data: CityProps[]
}
