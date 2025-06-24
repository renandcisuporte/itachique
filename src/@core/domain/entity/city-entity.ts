import { randomUUID } from 'crypto'
import { ValidationError } from '../../application/errors/validation-error'
import { CityProps, CitySchema } from '../schemas/city-schema'

export class City {
  private constructor(private readonly props: CityProps) {
    this.validate()
  }

  private validate() {
    const result = CitySchema.safeParse(this.props)
    if (!result.success) {
      const error = result.error.flatten()
      throw new ValidationError(error.fieldErrors)
    }
  }

  static create({ city }: CityProps) {
    return new City({
      id: randomUUID(),
      city,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: CityProps) {
    return new City(props)
  }

  get id() {
    return this.props.id
  }

  get city() {
    return this.props.city
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
