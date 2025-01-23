import { Category } from '@/core/domain/entity/category-entity'
import { CategoryGateway } from '@/core/domain/gateway/category-gateway'
import { PrismaClient } from '@prisma/client'

export class CategoryRepositoryPrisma implements CategoryGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async all(): Promise<Category[]> {
    const result = await this.prisma.category.findMany({
      where: { deleted_at: null },
      orderBy: { position: 'asc' }
    })

    return result.map((item) => {
      return Category.with({
        id: item.id,
        name: item.name,
        position: item.position,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }
}
