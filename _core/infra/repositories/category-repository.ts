import { Category } from '@/core/domain/entity/category-entity'
import { CategoryGateway } from '@/core/domain/gateway/category-gateway'
import { slug } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'

export class CategoryRepositoryPrisma implements CategoryGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }

  async update(id: string, input: Category): Promise<Category> {
    const data = {
      slug: slug(input.name),
      name: input.name,
      position: input.position,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.category.update({
      where: { id },
      data
    })

    return Category.with({
      id: result.id,
      slug: result.slug,
      name: result.name,
      position: result.position,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async create(input: Category): Promise<Category> {
    const data = {
      id: input.id!,
      slug: slug(input.name),
      name: input.name,
      position: input.position,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.category.create({
      data
    })

    return Category.with({
      id: result.id,
      slug: result.slug,
      name: result.name,
      position: result.position,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async all(): Promise<Category[]> {
    const result = await this.prisma.category.findMany({
      where: { deleted_at: null },
      orderBy: { position: 'asc' }
    })

    return result.map((item) => {
      return Category.with({
        id: item.id,
        slug: item.slug,
        name: item.name,
        position: item.position,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }
}
