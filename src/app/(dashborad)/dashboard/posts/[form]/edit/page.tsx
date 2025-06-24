import { FindPostUseCase } from '@/core/application/use-cases/post/find-post-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
  const useCase = container.get<FindPostUseCase>(Registry.FindPostUseCase)
  const { data } = await useCase.execute({ id: params.form })

  if (!data) {
    return notFound()
  }

  return <PageClient post={data} />
}
