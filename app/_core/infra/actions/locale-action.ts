import { AllLocaleUseCase } from '@/core/app/use-cases/locale/all-locale-use-case'
import { LocaleProps } from '@/core/domain/schemas/locale-schema'

export class LocaleActionImpl {
  constructor(private readonly listUseCase: AllLocaleUseCase) {}

  async list(): Promise<Output> {
    return await this.listUseCase.execute()
  }

  async save(input: Input): Promise<Output> {
    return {
      message: ['Post criado com sucesso!']
    }
    // try {
    //   if (input.id) {
    //     await this.updateUseCase.execute(input)
    //     return {
    //       message: ['Post atualizado com sucesso!'],
    //       data: { id: input.id }
    //     }
    //   }
    //   await this.createUseCase.execute(input)
    //   return {
    //     message: ['Post criado com sucesso!'],
    //     data: { id: input.id }
    //   }
    // } catch (err: unknown) {
    //   console.log('[ERROR POST ACTION]', JSON.stringify(err, null, 2))
    //   if (err instanceof ValidationError) {
    //     const errors = err.errors
    //     return { errors } as Output
    //   }
    //   return { message: ['Erro ao criar post'] }
    // }
  }
}

type Input = LocaleProps

type Output = {
  data?: LocaleProps | LocaleProps[]
  message?: string[]
  errors?: Record<string, string[]>
}
