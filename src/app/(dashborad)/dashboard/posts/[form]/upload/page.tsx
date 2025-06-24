import { FindPostUseCase } from '@/core/application/use-cases/post/find-post-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
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
  const useCase = container.get<FindPostUseCase>(Registry.FindPostUseCase)

  if (!params.form) {
    return <div>Formulário não encontrado</div>
  }

  const post = await useCase.execute({ id: params.form })

  return <PageClient post={post.data} />
}
