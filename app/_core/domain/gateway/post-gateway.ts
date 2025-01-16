import { Post } from '@/core/domain/entity/post-entity'

export interface PostGateway {
  create(input: Post): Promise<Post>
  update(id: string, input: Post): Promise<Post>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Post>
  findAll(q: string, page: number, limit: number): Promise<Post[]>
}
