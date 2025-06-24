import { Locale } from '@/core/domain/entity/locale-entity'
import { LocaleGateway } from '@/core/domain/gateway/locale-gateway'
import { LocaleProps } from '@/core/domain/schemas/locale-schema'

export class AllLocaleUseCase {
  constructor(private readonly localeRepository: LocaleGateway) {}

  async execute(): Promise<Output> {
    const result = await this.localeRepository.all()
    return {
      data: result.map(this.present)
    }
  }

  private present(props: Locale): LocaleProps {
    return {
      id: props.id,
      name: props.name
    }
  }
}

type Output = {
  data: LocaleProps[]
}
