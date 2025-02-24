import {
  categoryAction,
  cityAction,
  localeAction,
  subCategoryAction
} from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { PageClient } from '../_components/page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

export default async function Page() {
  const [locale, city, category, subCategory] = await Promise.all([
    localeAction.list(),
    cityAction.list(),
    categoryAction.list(),
    subCategoryAction.list()
  ])

  return (
    <PageClient
      locales={locale?.data as []}
      cities={city.data as []}
      categories={category.data as []}
      subCategories={subCategory.data as []}
    />
  )
}
