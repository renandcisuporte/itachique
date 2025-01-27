import { ValidationError } from '@/core/app/errors/validation-error'
import { CreateCategoryPostUseCase } from '@/core/app/use-cases/category-post/create-category-post-use-case'
import { CreatePostUseCase } from '@/core/app/use-cases/post/create-post-use-case'
import { DeletePostUseCase } from '@/core/app/use-cases/post/delete-post-use-case'
import { FindPostUseCase } from '@/core/app/use-cases/post/find-post-use-case'
import { ListPostUseCase } from '@/core/app/use-cases/post/list-post-use-case'
import { UpdatePostUseCase } from '@/core/app/use-cases/post/update-post-use-case'
import { PostProps } from '@/core/domain/schemas/post-schema'

export class PostActionImpl {
  constructor(
    private readonly listUseCase: ListPostUseCase,
    private readonly findUseCase: FindPostUseCase,
    private readonly createUseCase: CreatePostUseCase,
    private readonly updateUseCase: UpdatePostUseCase,
    private readonly deleteUseCase: DeletePostUseCase,
    private readonly categoryPostUseCase: CreateCategoryPostUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async find(id: string): Promise<{ data: PostProps }> {
    return await this.findUseCase.execute({ id })
  }

  async list(params: {
    q?: string
    order?: string
    page: string
    limit: string
  }): Promise<{ data: PostProps[]; total: number }> {
    const { q, order, page, limit } = params
    return await this.listUseCase.execute({
      q,
      order,
      page: +page,
      limit: +limit
    })
  }

  async save(input: Input): Promise<{ data?: { id?: string } } & Output> {
    try {
      if (input.id) {
        await this.updateUseCase.execute(input)
        await this.categoryPostUseCase.execute({
          postId: input.id,
          categoryId: input.categoryId!
        })
        return {
          message: ['Post atualizado com sucesso!'],
          data: { id: input.id }
        }
      }

      const result = await this.createUseCase.execute(input)
      await this.categoryPostUseCase.execute({
        postId: result.data.id!,
        categoryId: input.categoryId!
      })
      return {
        message: ['Post criado com sucesso!'],
        data: { id: result.data.id }
      }
    } catch (err: unknown) {
      console.log('[ERROR POST ACTION]', JSON.stringify(err, null, 2))
      if (err instanceof ValidationError) {
        const errors = err.errors
        return { errors } as Output
      }

      return { message: ['Erro ao criar post'] }
    }
  }
}

type Input = PostProps & { categoryId: string | null }

type Output = {
  message?: string[]
  errors?: Record<string, string[]>
}
