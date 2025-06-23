import { CountGalleryUseCase } from '../../application/use-cases/gallery/count-gallery-use-case'
import { CreateGalleryUseCase } from '../../application/use-cases/gallery/create-gallery-use-case'
import { DeleteGalleryUseCase } from '../../application/use-cases/gallery/delete-gallery-use-case'
import { ListGalleryUseCase } from '../../application/use-cases/gallery/list-gallery-use-case'
import { GalleryProps } from '../../domain/entity/gallery-entity'

export class GalleryActionImpl {
  constructor(
    private readonly listUseCase: ListGalleryUseCase,
    private readonly saveUseCase: CreateGalleryUseCase,
    private readonly deleteUseCase: DeleteGalleryUseCase,
    private readonly countUseCase: CountGalleryUseCase
  ) {}

  async count() {
    return await this.countUseCase.execute()
  }

  async list(postId: string): Promise<{ data: GalleryProps[] }> {
    const result = await this.listUseCase.execute({ postId })
    return { data: result.data }
  }

  async delete(input: Input): Promise<void> {
    await this.deleteUseCase.execute({ id: input.id! })
  }

  async save(input: InputUpload): Promise<Output> {
    try {
      await this.saveUseCase.execute(input)
      return {
        message: ['Galeria criada com sucesso!']
      }
    } catch (err: unknown) {
      console.log('[ERROR POST IMAGE]', JSON.stringify(err, null, 2))
      // if (err instanceof ValidationError) {
      //   const errors = err.errors
      //   return { errors } as Output
      // }
      return { message: ['Erro ao criar galeria!'] }
    }
  }
}

type InputUpload = {
  url: string
  image: string
  postId: string
}

type Input = {
  id?: string
}

type Output = {
  data?: GalleryProps
  message?: string[]
  errors?: Record<string, string[]>
}
