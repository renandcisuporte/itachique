import { ValidationError } from '@/core/app/errors/validation-error'
import { LocaleProps, LocaleSchema } from '@/core/domain/schemas/locale-schema'
import { randomUUID } from 'crypto'

export class Locale {
  private constructor(private readonly props: LocaleProps) {
    this.validate()
  }

  private validate() {
    const result = LocaleSchema.safeParse(this.props)
    if (!result.success) {
      const error = result.error.flatten()
      throw new ValidationError(error.fieldErrors)
    }
  }

  static create({ name }: LocaleProps) {
    return new Locale({
      id: randomUUID(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: LocaleProps) {
    return new Locale(props)
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get deletedAt() {
    return this.props.deletedAt
  }
}
