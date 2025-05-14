import { AllCityUseCase } from '@/core/app/use-cases/city/all-city-use-case'
import { CityRepositoryPrisma } from '@/core/infra/repositories/city-repository'
import { prisma } from '@/core/package/prisma'

export function makeAllCity() {
  const repository = new CityRepositoryPrisma(prisma)
  const result = new AllCityUseCase(repository)
  return result
}
