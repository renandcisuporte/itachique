import { ValidationError } from '@/core/app/errors/validation-error'
import {
  SubCategoryProps,
  SubCategorySchema
} from '@/core/domain/schemas/subcategory-schema'
import { randomUUID } from 'crypto'

export class SubCategory {
  private constructor(private readonly props: SubCategoryProps) {
    this.validate()
  }

  private validate() {
    const result = SubCategorySchema.safeParse(this.props)
    if (!result.success) {
      const error = result.error.flatten()
      throw new ValidationError(error.fieldErrors)
    }
  }

  static create({ name, position }: SubCategoryProps) {
    return new SubCategory({
      id: randomUUID(),
      name,
      position,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: SubCategoryProps) {
    return new SubCategory(props)
  }

  get id() {
    return this.props.id
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
