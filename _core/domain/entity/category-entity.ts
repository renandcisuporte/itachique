import { ValidationError } from '@/core/app/errors/validation-error'
import {
  CategoryProps,
  CategorySchema
} from '@/core/domain/schemas/category-schema'
import { randomUUID } from 'crypto'

export class Category {
  private constructor(private readonly props: CategoryProps) {
    this.validate()
  }

  private validate() {
    const result = CategorySchema.safeParse(this.props)
    if (!result.success) {
      const error = result.error.flatten()
      throw new ValidationError(error.fieldErrors)
    }
  }

  static create({ name, position }: CategoryProps) {
    return new Category({
      id: randomUUID(),
      name,
      position,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: CategoryProps) {
    return new Category(props)
  }

  get id() {
    return this.props.id
  }

  get slug() {
    return this.props.slug
  }

  get name() {
    return this.props.name
  }

  get position() {
    return this.props.position
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
