import { AllSubCategoryUseCase } from '../../application/use-cases/subcategory/all-subcategory-use-case'
import { SubCategoryRepositoryPrisma } from '../../infra/repositories/subcategory-repository'
import { prisma } from '../../package/prisma'

export function makeAllSubCategory() {
  const repository = new SubCategoryRepositoryPrisma(prisma)
  const result = new AllSubCategoryUseCase(repository)
  return result
}
