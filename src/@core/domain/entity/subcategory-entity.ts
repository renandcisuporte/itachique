import { randomUUID } from 'crypto'
import { ValidationError } from '../../application/errors/validation-error'
import {
  SubCategoryProps,
  SubCategorySchema
} from '../schemas/subcategory-schema'

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
