import { AllCategoryUseCase } from '@/core/app/use-cases/category/all-category-use-case'
import { CategoryProps } from '@/core/domain/schemas/category-schema'

export class CategoryActionImpl {
  constructor(private readonly listUseCase: AllCategoryUseCase) {}

  async list(): Promise<OutputArray> {
    return await this.listUseCase.execute()
  }

  async save(input: Input): Promise<OutputSingle> {
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

type Input = CategoryProps
type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}

type OutputSingle = {
  data?: CategoryProps[]
} & Outhers

type OutputArray = {
  data?: CategoryProps[]
} & Outhers
