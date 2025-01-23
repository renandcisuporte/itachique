import { Post } from '@/core/domain/entity/post-entity'

export interface PostGateway {
  create(input: Post): Promise<Post>
  update(id: string, input: Post): Promise<Post>
  delete(id: string): Promise<void>
  findCount(q: string): Promise<number>
  findById(id: string): Promise<Post>
  findAll(
    q: string,
    order: string,
    page: number,
    limit: number
  ): Promise<Post[]>
}
