import { AllCategoryUseCase } from '@/core/application/use-cases/category/all-category-use-case'
import { AllCityUseCase } from '@/core/application/use-cases/city/all-city-use-case'
import { AllLocaleUseCase } from '@/core/application/use-cases/locale/all-locale-use-case'
import { AllSubCategoryUseCase } from '@/core/application/use-cases/subcategory/all-subcategory-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { NextResponse } from 'next/server'

export async function GET() {
  const useCaseCity = container.get<AllCityUseCase>(Registry.AllCityUseCase)
  const useCaseCategory = container.get<AllCategoryUseCase>(
    Registry.AllCategoryUseCase
  )
  const useCaseSubCategory = container.get<AllSubCategoryUseCase>(
    Registry.AllSubCategoryUseCase
  )
  const useCaseLocale = container.get<AllLocaleUseCase>(
    Registry.AllLocaleUseCase
  )

  const [
    { data: city },
    { data: category },
    { data: subcategory },
    { data: locale }
  ] = await Promise.all([
    useCaseCity.execute(),
    useCaseCategory.execute(),
    useCaseSubCategory.execute(),
    useCaseLocale.execute()
  ])

  return NextResponse.json({
    city,
    category,
    subcategory,
    locale
  })
}
