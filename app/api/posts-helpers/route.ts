import { makeAllCategory } from '@/core/main/factories/make-all-categories'
import { makeAllCity } from '@/core/main/factories/make-all-cities'
import { makeAllLocale } from '@/core/main/factories/make-all-locales'
import { makeAllSubCategory } from '@/core/main/factories/make-all-sub-categories'
import { NextResponse } from 'next/server'

export async function GET() {
  const useCaseCity = makeAllCity()
  const useCaseCategory = makeAllCategory()
  const useCaseSubCategory = makeAllSubCategory()
  const useCaseLocale = makeAllLocale()

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
