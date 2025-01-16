import { Locale } from '@/core/domain/entity/locale-entity'
import { LocaleGateway } from '@/core/domain/gateway/locale-gateway'
import { PrismaClient } from '@prisma/client'

export class LocaleRepositoryPrisma implements LocaleGateway {
  private constructor(private readonly prisma: PrismaClient) {}

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
