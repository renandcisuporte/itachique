import { ValidationError } from '@/core/app/errors/validation-error'
import { AllSubCategoryUseCase } from '@/core/app/use-cases/subcategory/all-subcategory-use-case'
import { CreateSubCategoryUseCase } from '@/core/app/use-cases/subcategory/create-subcategory-use-case'
import { DeleteSubCategoryUseCase } from '@/core/app/use-cases/subcategory/delete-subcategory-use-case'
import { UpdateSubCategoryUseCase } from '@/core/app/use-cases/subcategory/update-subcategory-use-case'
import { SubCategoryProps } from '@/core/domain/schemas/subcategory-schema'

export class SubCategoryActionImpl {
  constructor(
    private readonly listUseCase: AllSubCategoryUseCase,
    private readonly createUseCase: CreateSubCategoryUseCase,
    private readonly updateUseCase: UpdateSubCategoryUseCase,
    private readonly deleteUseCase: DeleteSubCategoryUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async save(input: Input): Promise<Outhers & { data?: SubCategoryProps }> {
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

  async list(): Promise<{ data: SubCategoryProps[] }> {
    return await this.listUseCase.execute()
  }
}

type Input = SubCategoryProps

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}
