import { ValidationError } from '@/core/app/errors/validation-error'
import { randomUUID } from 'crypto'
import { PostProps, PostSchema } from '../schemas/post-schema'

export class Post {
  private constructor(private readonly props: PostProps) {
    this.validate()
  }

  private validate() {
    const result = PostSchema.safeParse(this.props)
    if (!result.success) {
      const error = result.error.flatten()
      throw new ValidationError(error.fieldErrors)
    }
  }

  static create({
    title,
    date,
    localeText,
    localeId,
    cityId,
    coverImage
  }: PostProps) {
    return new Post({
      id: randomUUID(),
      title,
      date,
      localeText,
      localeId,
      cityId,
      coverImage,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: PostProps) {
    return new Post(props)
  }

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get date() {
    return new Intl.DateTimeFormat('UTC', {
      year: 'numeric',
      day: '2-digit',
      month: '2-digit',
      timeZone: 'UTC'
    }).format(new Date(this.props.date))
  }

  get dateISO() {
    return new Date(this.props.date).toISOString().split('T')[0]
  }

  get localeText() {
    return this.props.localeText
  }

  get localeId() {
    return this.props.localeId
  }

  get cityText() {
    return this.props.cityText
  }

  get cityId() {
    return this.props.cityId
  }

  get categoryId() {
    return this.props.categoryId
  }

  get categoryName() {
    return this.props.categoryName
  }

  get coverImage() {
    return this.props.coverImage
  }

  get galleryImage() {
    return this.props.galleryImage
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
