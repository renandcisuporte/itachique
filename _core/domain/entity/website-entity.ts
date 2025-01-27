export type WebSiteGalleryProps = {
  id: string
  url: string
  image: string
}

export type WebSiteProps = {
  id: string
  categorySlug?: string
  categoryName: string
  postSlug: string
  postTitle: string
  postDate: string
  postLocale: string
  postCity: string
  postCoverImage: string
  galleryImage: WebSiteGalleryProps[]
  createdAt: Date
  updatedAt: Date
}

export class WebSite {
  private constructor(public readonly props: WebSiteProps) {}

  static with(props: WebSiteProps) {
    return new WebSite(props)
  }

  get id() {
    return this.props.id
  }

  get categorySlug() {
    return this.props.categorySlug
  }

  get categoryName() {
    return this.props.categoryName
  }

  get postSlug() {
    return this.props.postSlug
  }

  get postTitle() {
    return this.props.postTitle
  }

  get postDate() {
    return this.props.postDate
  }

  get postLocale() {
    return this.props.postLocale
  }

  get postCity() {
    return this.props.postCity
  }

  get postCoverImage() {
    return this.props.postCoverImage
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
}
