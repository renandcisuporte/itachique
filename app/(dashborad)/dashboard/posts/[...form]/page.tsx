import { FindPostUseCase } from '@/core/app/use-cases/post/find-post-use-case'
import { PostRepositoryPrisma } from '@/core/infra/repositories/post-repository'
import { prisma } from '@/core/package/prisma'
import { Metadata } from 'next'
import PageClient from './page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

const postRepository = new PostRepositoryPrisma(prisma)
const findPostUseCase = new FindPostUseCase(postRepository)

type Props = {
  params: {
    form: string[]
  }
}

export default async function Page({ params }: Props) {
  let post = null
  if (params.form.pop() === 'edit') {
    post = await findPostUseCase.execute({
      id: params.form[0]
    })
  }

  return (
    <div className="space-y-4">
      <h1 className="mb-4 text-2xl">Cadastro - Postagem/Eventos</h1>
      <hr />
      <PageClient post={post?.data || null} />
    </div>
  )
}
