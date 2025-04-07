import { randomUUID } from 'crypto'

export type UpcomingEventProps = {
  id?: string
  title: string
  categoryId?: string
  galleryImages?: string
  description?: string
  date: Date | string | null
  dateISO?: string
  locale: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class UpcomingEvent {
  private constructor(private readonly props: UpcomingEventProps) {}

  static create({
    title,
    date,
    categoryId,
    galleryImages,
    locale,
    description
  }: UpcomingEventProps) {
    return new UpcomingEvent({
      id: randomUUID(),
      title,
      date,
      locale,
      categoryId,
      galleryImages,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: UpcomingEventProps) {
    return new UpcomingEvent(props)
  }

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get categoryId() {
    return this.props.categoryId
  }

  get galleryImages() {
    return this.props.galleryImages
  }

  get description() {
    return this.props.description
  }

  get locale() {
    return this.props.locale
  }

  get date() {
    return this.props.date
  }

  get dateISO() {
    return new Date(this.props.date!).toISOString().split('T')[0]
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
