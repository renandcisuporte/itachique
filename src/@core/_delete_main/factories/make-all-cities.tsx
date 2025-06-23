import { AllCityUseCase } from '../../application/use-cases/city/all-city-use-case'
import { CityRepositoryPrisma } from '../../infra/repositories/city-repository'
import { prisma } from '../../package/prisma'

export function makeAllCity() {
  const repository = new CityRepositoryPrisma(prisma)
  const result = new AllCityUseCase(repository)
  return result
}
