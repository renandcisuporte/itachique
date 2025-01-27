import { LocaleGateway } from '@/core/domain/gateway/locale-gateway'

export class DeleteLocaleUseCase {
  constructor(private readonly localeRepository: LocaleGateway) {}

  async execute(id: Input): Promise<Output> {
    await this.localeRepository.delete(id)
  }
}

type Input = string
type Output = void
