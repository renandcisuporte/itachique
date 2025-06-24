import { Locale } from '@/core/domain/entity/locale-entity'
import { LocaleGateway } from '@/core/domain/gateway/locale-gateway'
import { LocaleProps } from '@/core/domain/schemas/locale-schema'

export class UpdateLocaleUseCase {
  constructor(private readonly repository: LocaleGateway) {}

  async execute(input: Input): Promise<Output> {
    const output = Locale.with(input)
    const result = await this.repository.update(input.id!, output)

    return { data: this.present(result) }
  }

  private present(post: Locale): LocaleProps {
    return {
      id: post.id,
      name: post.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }
}

type Input = LocaleProps
type Output = { data: LocaleProps }
