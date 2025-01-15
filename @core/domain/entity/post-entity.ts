import { PostProps } from '../schemas/post-schema'

export class Post {
  private constructor(private readonly props: PostProps) {}
}
