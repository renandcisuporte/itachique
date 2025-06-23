import { AllCategoryUseCase } from '../../application/use-cases/category/all-category-use-case'
import { CategoryRepositoryPrisma } from '../../infra/repositories/category-repository'
import { prisma } from '../../package/prisma'

export function makeAllCategory() {
  const repository = new CategoryRepositoryPrisma(prisma)
  const result = new AllCategoryUseCase(repository)
  return result
}
