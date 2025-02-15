import { postAction } from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { PageClient } from './page-client'

type Props = {
  params: {
    form: string
  }
}

export const metadata: Metadata = {
  title: 'Upload Postagem/Eventos - Itachique'
}

export default async function Page({ params }: Props) {
  const post = await postAction.find(params.form)

  return <PageClient post={post.data} />
}
