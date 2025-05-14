import { AllLocaleUseCase } from '@/core/app/use-cases/locale/all-locale-use-case'
import { LocaleRepositoryPrisma } from '@/core/infra/repositories/locale-repository'
import { prisma } from '@/core/package/prisma'

export function makeAllLocale() {
  const repository = new LocaleRepositoryPrisma(prisma)
  const result = new AllLocaleUseCase(repository)
  return result
}
