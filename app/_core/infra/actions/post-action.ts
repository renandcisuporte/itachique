import { ValidationError } from '@/core/app/errors/validation-error'
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
    private readonly deleteUseCase: DeletePostUseCase
  ) {}

  async delete(id: string): Promise<void> {}

  async find(id: string): Promise<{ data: PostProps }> {
    return await this.findUseCase.execute({ id })
  }

  async list(): Promise<{ data: PostProps[] }> {
    return await this.listUseCase.execute({
      q: '',
      page: 1,
      limit: 10
    })
  }

  async save(input: Input): Promise<{ data?: { id?: string } } & Output> {
    try {
      if (input.id) {
        await this.updateUseCase.execute(input)
        return {
          message: ['Post atualizado com sucesso!'],
          data: { id: input.id }
        }
      }

      await this.createUseCase.execute(input)
      return {
        message: ['Post criado com sucesso!'],
        data: { id: input.id }
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

type Input = PostProps

type Output = {
  message?: string[]
  errors?: Record<string, string[]>
}
