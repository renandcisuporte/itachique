import { City } from '@/core/domain/entity/city-entity'
import { CityGateway } from '@/core/domain/gateway/city-gateway'
import { PrismaClient } from '@prisma/client'

export class CityRepositoryPrisma implements CityGateway {
  constructor(private readonly prisma: PrismaClient) {}

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
