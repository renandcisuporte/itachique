import { description, title } from '@/config'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {} from 'react'
import { webSiteAction } from '../../../@core/main/config/dependencies'
import { Events } from './_events'
import { UpcomingEvents } from './_upcoming-events'

type Props = {
  params: {
    slug: string[]
  }
  searchParams: {
    q?: string
    page: string
    limit?: string
  }
}

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  const { q = '' } = searchParams
  const { slug } = params

  let input = {
    categoryName: '',
    subCategoryName: '',
    postTitle: ''
  }

  if (slug[0]) input.categoryName = slug[0]
  if (slug[1]) input.subCategoryName = slug[1]
  if (q) input.postTitle = q

  const posts = await webSiteAction.list(input)

  return {
    title: `${
      posts.data.length > 0
        ? `${[posts.data[0].categoryName, posts.data[0].subCategoryName].join(' - ')}: `
        : ''
    } ${title}`,
    description
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = params
  const { page = 1, limit = 16, q = '' } = searchParams

  let input = {
    page,
    limit,
    categoryName: '',
    subCategoryName: '',
    postTitle: ''
  }

  if (slug[0]) input.categoryName = slug[0]
  if (slug[1]) input.subCategoryName = slug[1]
  if (q) input.postTitle = q

  const [
    { data: posts, total },
    { data: upcomingEvents },
    { data: advertisements }
  ] = await Promise.all([
    webSiteAction.list(input),
    webSiteAction.listUpcomingEvents(input),
    webSiteAction.listByAds()
  ])

  if (!posts.length && !upcomingEvents.length) return notFound()

  // Garantir que as propagandas sejam embaralhadas
  const shuffledAds = advertisements?.sort(() => Math.random() - 0.5)

  if (upcomingEvents.length) {
    const ads = Math.ceil(upcomingEvents.length / 4)

    return (
      <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
        <UpcomingEvents
          ads={ads}
          posts={upcomingEvents}
          shuffledAds={shuffledAds}
        />
      </div>
    )
  }

  // montar a lista de propagandas
  const ads = Math.ceil(posts.length / 4)
  return (
    <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
      <Events
        ads={ads}
        events={slug}
        posts={posts}
        shuffledAds={shuffledAds}
        total={total}
        page={+page}
        search={q}
      />
    </div>
  )
}
