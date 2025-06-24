import { randomUUID } from 'crypto'
import { ValidationError } from '../../application/errors/validation-error'
import { LocaleProps, LocaleSchema } from '../schemas/locale-schema'

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
