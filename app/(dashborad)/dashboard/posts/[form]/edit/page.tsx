import { postAction } from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { PageClient } from '../../_components/page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

type Props = {
  params: {
    form: string
  }
}

export default async function Page({ params }: Props) {
  const { data } = await postAction.find(params.form)
  return <PageClient post={data} />
}
