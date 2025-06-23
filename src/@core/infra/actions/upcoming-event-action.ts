import { ValidationError } from '../../application/errors/validation-error'
import { AllUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/all-upcoming-event-use-case'
import { AllValidatedUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/all-validated-upcoming-event-use-case'
import { CreateUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/create-upcoming-event-use-case'
import { DeleteUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/delete-upcoming-event-use-case'
import { UpdateUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/update-upcoming-event-use-case'
import { UpcomingEventProps } from '../../domain/entity/upcoming-event-entity'

export class UpcomingEventActionImpl {
  constructor(
    private readonly allUseCase: AllUpcomingEventUseCase,
    private readonly allValidatedUseCase: AllValidatedUpcomingEventUseCase,
    private readonly createUseCase: CreateUpcomingEventUseCase,
    private readonly updateUseCase: UpdateUpcomingEventUseCase,
    private readonly deleteUseCase: DeleteUpcomingEventUseCase
  ) {}

  async delete(id: string): Promise<void> {
    await this.deleteUseCase.execute(id)
  }

  async save(input: Input): Promise<Outhers & { data?: UpcomingEventProps }> {
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

  async list(): Promise<{ data: UpcomingEventProps[] }> {
    const result = await this.allUseCase.execute()

    return {
      ...result
    }
  }

  async listValidated(): Promise<{ data: UpcomingEventProps[] }> {
    const result = await this.allValidatedUseCase.execute()

    return {
      ...result
    }
  }
}

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}

type Input = UpcomingEventProps
