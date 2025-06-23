import { AuthenticationUseCase } from '../../application/use-cases/authentication/authentication-use-case'
import { UserRepositoryPrisma } from '../../infra/repositories/user-repository'
import { prisma } from '../../package/prisma'

export function makeAuthentication() {
  const repository = new UserRepositoryPrisma(prisma)
  return new AuthenticationUseCase(repository)
}
