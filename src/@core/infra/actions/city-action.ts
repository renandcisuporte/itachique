import { ValidationError } from '../../application/errors/validation-error'
import { AllCityUseCase } from '../../application/use-cases/city/all-city-use-case'
import { CreateCityUseCase } from '../../application/use-cases/city/create-city-use-case'
import { DeleteCityUseCase } from '../../application/use-cases/city/delete-city-use-case'
import { UpdateCityUseCase } from '../../application/use-cases/city/update-city-use-case'
import { CityProps } from '../../domain/schemas/city-schema'

export class CityActionImpl {
  constructor(
    private readonly listUseCase: AllCityUseCase,
    private readonly createUseCase: CreateCityUseCase,
    private readonly updateUseCase: UpdateCityUseCase,
    private readonly deleteUseCase: DeleteCityUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async save(input: Input): Promise<Output> {
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
      console.log('[ERROR CITY ACTION]', JSON.stringify(err, null, 2))
      if (err instanceof ValidationError) {
        const errors = err.errors
        return { errors } as Output
      }
      return { message: ['Erro ao criar cidade'] }
    }
  }

  async list(): Promise<{
    data: CityProps[]
  }> {
    return await this.listUseCase.execute()
  }
}

type Input = CityProps

type Output = {
  data?: CityProps
  message?: string[]
  errors?: Record<string, string[]>
}
