import {
  categoryAction,
  cityAction,
  localeAction,
  postAction
} from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { PageClient } from '../_components/page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

type Props = {
  params: {
    form: string
  }
}

export default async function Page({ params }: Props) {
  const [post, locale, city, category] = await Promise.all([
    postAction.find(params.form),
    localeAction.list(),
    cityAction.list(),
    categoryAction.list()
  ])

  return (
    <PageClient
      post={post.data}
      locales={locale?.data as []}
      cities={city.data as []}
      categories={category?.data as []}
    />
  )
}
