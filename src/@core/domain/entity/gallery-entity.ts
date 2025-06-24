import { randomUUID } from 'crypto'

export type GalleryProps = {
  id?: string
  image: string
  postId: string
  url: string
}

export class Gallery {
  private constructor(private readonly props: GalleryProps) {}

  static create({ image, postId, url }: GalleryProps) {
    return new Gallery({
      id: randomUUID().toString(),
      image,
      postId,
      url
    })
  }

  static with(props: GalleryProps) {
    return new Gallery(props)
  }

  get id() {
    return this.props.id
  }

  get image() {
    return this.props.image
  }

  get postId() {
    return this.props.postId
  }

  get url() {
    return this.props.url
  }
}
