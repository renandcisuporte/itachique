import { ValidationError } from '../../application/errors/validation-error'
import { AllAdvertisementUseCase } from '../../application/use-cases/advertisement/all-advertisement-use-case'
import { CreateAdvertisementUseCase } from '../../application/use-cases/advertisement/create-advertisement-use-case'
import { DeleteAdvertisementUseCase } from '../../application/use-cases/advertisement/delete-advertisement-use-case'
import { UpdateAdvertisementUseCase } from '../../application/use-cases/advertisement/update-advertisement-use-case'
import { AdvertisementProps } from '../../domain/entity/advertisement-entity'

export class AdvertisementActionImpl {
  constructor(
    private readonly allUseCase: AllAdvertisementUseCase,
    private readonly createUseCase: CreateAdvertisementUseCase,
    private readonly updateUseCase: UpdateAdvertisementUseCase,
    private readonly deleteUseCase: DeleteAdvertisementUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async save(input: Input): Promise<Outhers & { data?: AdvertisementProps }> {
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
      console.log('[ERROR ADVERTISEMENT ACTION]', JSON.stringify(err, null, 2))
      if (err instanceof ValidationError) {
        const errors = err.errors
        return { errors } as Outhers
      }
      return { message: ['Erro ao criar categoria'] }
    }
  }

  async list(): Promise<{ data: AdvertisementProps[] }> {
    const ghostArray: AdvertisementProps[] = [
      {
        id: '1',
        title: '',
        galleryImagesJson: JSON.parse('["/anuncie-952x135.jpg"]'),
        link: '',
        position: 0,
        description: '',
        isActive: false,
        validatedAt: new Date()
      },
      {
        id: '2',
        title: '',
        galleryImagesJson: JSON.parse('["/anuncie-952x135.jpg"]'),
        link: '',
        position: 0,
        description: '',
        isActive: false,
        validatedAt: new Date()
      },
      {
        id: '3',
        title: '',
        galleryImagesJson: JSON.parse('["/anuncie-952x135.jpg"]'),
        link: '',
        position: 0,
        description: '',
        isActive: false,
        validatedAt: new Date()
      },
      {
        id: '4',
        title: '',
        galleryImagesJson: JSON.parse('["/anuncie-952x135.jpg"]'),
        link: '',
        position: 0,
        description: '',
        isActive: false,
        validatedAt: new Date()
      }
    ]
    const result = await this.allUseCase.execute()

    return {
      data: ghostArray.map((item, index) => ({
        ...item,
        ...result.data[index]
      }))
    }
  }
}

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}

type Input = AdvertisementProps
