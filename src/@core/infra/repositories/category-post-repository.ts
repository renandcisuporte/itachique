import { CategoryPost } from '@/core/domain/entity/category-post-entity'
import { CategoryPostGateway } from '@/core/domain/gateway/category-post-gateway'
import { PrismaClient } from '@prisma/client'

export class CategoryPostRepositoryPrisma implements CategoryPostGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async save(input: CategoryPost): Promise<void> {
    await this.prisma.categoryPost.deleteMany({
      where: {
        post_id: input.postId
      }
    })

    await this.prisma.categoryPost.create({
      data: {
        id: input.id,
        category_id: input.categoryId,
        post_id: input.postId
      }
    })
  }
}
