import { AuthenticationUseCase } from '@/core/app/use-cases/authentication/authentication-use-case'
import { UserRepositoryPrisma } from '@/core/infra/repositories/user-repository'
import { prisma } from '@/core/package/prisma'

export function makeAuthentication() {
  const repository = new UserRepositoryPrisma(prisma)
  return new AuthenticationUseCase(repository)
}
