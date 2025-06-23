import { ValidationError } from '../../application/errors/validation-error'
import { AllCategoryUseCase } from '../../application/use-cases/category/all-category-use-case'
import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category-use-case'
import { DeleteCategoryUseCase } from '../../application/use-cases/category/delete-category-use-case'
import { UpdateCategoryUseCase } from '../../application/use-cases/category/update-category-use-case'
import { CategoryProps } from '../../domain/schemas/category-schema'

export class CategoryActionImpl {
  constructor(
    private readonly listUseCase: AllCategoryUseCase,
    private readonly createUseCase: CreateCategoryUseCase,
    private readonly updateUseCase: UpdateCategoryUseCase,
    private readonly deleteUseCase: DeleteCategoryUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async save(input: Input): Promise<Outhers & { data?: CategoryProps }> {
    try {
      if (input.id) {
        const result = await this.updateUseCase.execute(input)
        return {
          message: ['Atualizado com sucesso!'],
          data: { ...result.data }
        }
      }
      const result = await this.createUseCase.execute(input)
      return {
        message: ['Atualizado com sucesso!'],
        data: { ...result.data }
      }
    } catch (err: unknown) {
      console.log('[ERROR CATEGORY ACTION]', JSON.stringify(err, null, 2))
      if (err instanceof ValidationError) {
        const errors = err.errors
        return { errors } as Outhers
      }
      return { message: ['Erro ao criar categoria'] }
    }
  }

  async list(): Promise<{ data: CategoryProps[] }> {
    return await this.listUseCase.execute()
  }
}

type Input = CategoryProps

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}
