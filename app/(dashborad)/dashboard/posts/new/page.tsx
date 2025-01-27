import {
  categoryAction,
  cityAction,
  localeAction
} from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { PageClient } from '../_components/page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

export default async function Page() {
  const [locale, city, category] = await Promise.all([
    localeAction.list(),
    cityAction.list(),
    categoryAction.list()
  ])

  return (
    <PageClient
      locales={locale?.data as []}
      cities={city.data as []}
      categories={category.data as []}
    />
  )
}
