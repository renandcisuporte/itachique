import { User } from '@/core/domain/entity/user-entity'
import { UserGateway } from '@/core/domain/gateway/user-gateway'
import { PrismaClient } from '@prisma/client'

export class UserRepositoryPrisma implements UserGateway {
  constructor(protected readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        email,
        deleted_at: null
      }
    })

    if (!result) return null

    return User.with({
      id: result.id,
      name: result.name,
      email: result.email,
      password: result.password,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at
    })
  }
}
