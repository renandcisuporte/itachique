import { AllCategoryUseCase } from '@/core/app/use-cases/category/all-category-use-case'
import { CategoryRepositoryPrisma } from '@/core/infra/repositories/category-repository'
import { prisma } from '@/core/package/prisma'

export function makeAllCategory() {
  const repository = new CategoryRepositoryPrisma(prisma)
  const result = new AllCategoryUseCase(repository)
  return result
}
