import { ValidationError } from '@/core/app/errors/validation-error'
import { AllLocaleUseCase } from '@/core/app/use-cases/locale/all-locale-use-case'
import { CreateLocaleUseCase } from '@/core/app/use-cases/locale/create-city-use-case'
import { DeleteLocaleUseCase } from '@/core/app/use-cases/locale/delete-city-use-case'
import { UpdateLocaleUseCase } from '@/core/app/use-cases/locale/update-city-use-case'
import { LocaleProps } from '@/core/domain/schemas/locale-schema'

export class LocaleActionImpl {
  constructor(
    private readonly listUseCase: AllLocaleUseCase,
    private readonly createUseCase: CreateLocaleUseCase,
    private readonly updateUseCase: UpdateLocaleUseCase,
    private readonly deleteUseCase: DeleteLocaleUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async save(input: Input): Promise<Outhers & { data?: LocaleProps }> {
    try {
      if (input.id) {
        const result = await this.updateUseCase.execute(input)
        return {
          message: ['Post atualizado com sucesso!'],
          data: { ...result.data }
        }
      }
      const result = await this.createUseCase.execute(input)
      return {
        message: ['Cidade criada com sucesso!'],
        data: { ...result.data }
      }
    } catch (err: unknown) {
      console.log('[ERROR LOCALE ACTION]', JSON.stringify(err, null, 2))
      if (err instanceof ValidationError) {
        const errors = err.errors
        return { errors } as Outhers
      }
      return { message: ['Erro ao criar cidade'] }
    }
  }

  async list(): Promise<{ data: LocaleProps[] }> {
    return await this.listUseCase.execute()
  }
}

type Input = LocaleProps

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}
