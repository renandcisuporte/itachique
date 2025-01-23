import { AllCityUseCase } from '@/core/app/use-cases/city/all-city-use-case'
import { CityProps } from '@/core/domain/schemas/city-schema'

export class CityActionImpl {
  constructor(private readonly listUseCase: AllCityUseCase) {}

  async list(): Promise<{
    data: CityProps[]
  }> {
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

type Input = CityProps

type Output = {
  data?: CityProps | CityProps[]
  message?: string[]
  errors?: Record<string, string[]>
}
