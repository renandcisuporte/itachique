import { CityGateway } from '@/core/domain/gateway/city-gateway'

export class DeleteCityUseCase {
  constructor(private readonly cityRepository: CityGateway) {}

  async execute(id: Input): Promise<Output> {
    await this.cityRepository.delete(id)
  }
}

type Input = string
type Output = void
