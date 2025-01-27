import { Locale } from '@/core/domain/entity/locale-entity'
import { LocaleGateway } from '@/core/domain/gateway/locale-gateway'
import { PrismaClient } from '@prisma/client'

export class LocaleRepositoryPrisma implements LocaleGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.locale.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }

  async update(id: string, input: Locale): Promise<Locale> {
    const data = {
      name: input.name,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.locale.update({
      where: { id },
      data
    })

    return Locale.with({
      id: result.id,
      name: result.name,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async create(input: Locale): Promise<Locale> {
    const data = {
      id: input.id!,
      name: input.name,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!
    }

    const result = await this.prisma.locale.create({
      data
    })

    return Locale.with({
      id: result.id,
      name: result.name,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async all(): Promise<Locale[]> {
    const result = await this.prisma.locale.findMany({
      where: { deleted_at: null }
    })

    return result.map((item) => {
      return Locale.with({
        id: item.id,
        name: item.name,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }
}
