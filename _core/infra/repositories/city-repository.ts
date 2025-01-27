import { City } from '@/core/domain/entity/city-entity'
import { CityGateway } from '@/core/domain/gateway/city-gateway'
import { PrismaClient } from '@prisma/client'

export class CityRepositoryPrisma implements CityGateway {
  constructor(private readonly prisma: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prisma.city.update({
      where: { id },
      data: { deleted_at: new Date() }
    })
  }

  async update(id: string, input: City): Promise<City> {
    const data = {
      city: input.city,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.city.update({
      where: { id },
      data
    })

    return City.with({
      id: result.id,
      city: result.city,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async create(input: City): Promise<City> {
    const data = {
      id: input.id!,
      city: input.city,
      created_at: input.createdAt!,
      updated_at: input.updatedAt!,
      deleted_at: input.deletedAt
    }

    const result = await this.prisma.city.create({
      data
    })

    return City.with({
      id: result.id,
      city: result.city,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }

  async all(): Promise<City[]> {
    const result = await this.prisma.city.findMany({
      where: { deleted_at: null }
    })

    return result.map((item) => {
      return City.with({
        id: item.id,
        city: item.city,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        deletedAt: item.deleted_at
      })
    })
  }
}
