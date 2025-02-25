import { SubCategory } from '@/core/domain/entity/subcategory-entity'
import { SubCategoryGateway } from '@/core/domain/gateway/subcategory-gateway'
import { slug } from '@/lib/utils'
import { PrismaClient } from '@prisma/client'

export class SubCategoryRepositoryPrisma implements SubCategoryGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.subCategory.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }

  async update(id: string, input: SubCategory): Promise<SubCategory> {
    const data = {
      name: input.name,
      slug: slug(input.name),
      position: input.position,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.subCategory.update({
      where: { id },
      data
    })

    return SubCategory.with({
      id: result.id,
      slug: result.slug,
      name: result.name,
      position: result.position,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async create(input: SubCategory): Promise<SubCategory> {
    const data = {
      id: input.id!,
      slug: slug(input.name),
      name: input.name,
      position: input.position,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.subCategory.create({
      data
    })

    return SubCategory.with({
      id: result.id,
      slug: result.slug,
      name: result.name,
      position: result.position,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async all(): Promise<SubCategory[]> {
    const result = await this.prisma.subCategory.findMany({
      where: { deleted_at: null },
      orderBy: { position: 'asc' }
    })

    return result.map((item) => {
      return SubCategory.with({
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
