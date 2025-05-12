import { AllSubCategoryUseCase } from '@/core/app/use-cases/subcategory/all-subcategory-use-case'
import { SubCategoryRepositoryPrisma } from '@/core/infra/repositories/subcategory-repository'
import { prisma } from '@/core/package/prisma'

export function makeAllSubCategory() {
  const repository = new SubCategoryRepositoryPrisma(prisma)
  const result = new AllSubCategoryUseCase(repository)
  return result
}
