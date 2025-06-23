import { randomUUID } from 'crypto'

export type CategoryPostProps = {
  id: string
  categoryId: string
  postId: string
}

export class CategoryPost {
  private constructor(private readonly props: CategoryPostProps) {}

  static create({ categoryId, postId }: Omit<CategoryPostProps, 'id'>) {
    return new CategoryPost({
      id: randomUUID(),
      categoryId,
      postId
    })
  }

  static with(props: CategoryPostProps) {
    return new CategoryPost(props)
  }

  get id() {
    return this.props.id
  }

  get categoryId() {
    return this.props.categoryId
  }

  get postId() {
    return this.props.postId
  }
}
