import { cityAction, localeAction } from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { PageClient } from '../[form]/_components/page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

export default async function Page() {
  const [locale, city] = await Promise.all([
    localeAction.list(),
    cityAction.list()
  ])

  return <PageClient locales={locale?.data as []} cities={city.data as []} />
}
