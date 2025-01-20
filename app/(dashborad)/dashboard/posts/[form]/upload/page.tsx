import { postAction } from '@/core/main/config/dependencies'
import { PageClient } from './page-client'

type Props = {
  params: {
    form: string
  }
}

export default async function Page({ params }: Props) {
  const post = await postAction.find(params.form)

  return <PageClient post={post.data} />
}
