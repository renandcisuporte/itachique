import { randomUUID } from 'crypto'

export type AdvertisementProps = {
  id?: string
  title: string
  galleryImages?: string
  galleryImagesJson?: string[]
  description?: string
  link?: string
  position: number
  isActive: boolean
  validatedAt: Date | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export class Advertisement {
  private constructor(private readonly props: AdvertisementProps) {}

  static create({
    title,
    galleryImages,
    isActive = false,
    link,
    description,
    validatedAt,
    position = 0
  }: AdvertisementProps) {
    return new Advertisement({
      id: randomUUID(),
      title,
      position,
      isActive,
      description,
      link,
      validatedAt,
      galleryImages,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    })
  }

  static with(props: AdvertisementProps) {
    return new Advertisement(props)
  }

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get galleryImages() {
    return this.props.galleryImages
  }

  get galleryImagesJson() {
    return JSON.parse(this.props.galleryImages as string)
  }

  get description() {
    return this.props.description
  }

  get link() {
    return this.props.link
  }

  get position() {
    return this.props.position
  }

  get isActive() {
    return this.props.isActive
  }

  get validatedAt() {
    return this.props.validatedAt
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
