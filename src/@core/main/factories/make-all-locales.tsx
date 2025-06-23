import { AllLocaleUseCase } from '../../application/use-cases/locale/all-locale-use-case'
import { LocaleRepositoryPrisma } from '../../infra/repositories/locale-repository'
import { prisma } from '../../package/prisma'

export function makeAllLocale() {
  const repository = new LocaleRepositoryPrisma(prisma)
  const result = new AllLocaleUseCase(repository)
  return result
}
