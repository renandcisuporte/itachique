import { description, title } from '@/config'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AllAdvertisementWebSiteUseCase } from '@/core/application/use-cases/website/all-advertisement-website-use-case'
import { AllUpcomingSiteUseCase } from '@/core/application/use-cases/website/all-upcomingsite-use-case'
import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
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

  if (slug[0] && slug[0] !== 'search') input.categoryName = slug[0]
  if (slug[1]) input.subCategoryName = slug[1]
  if (q) input.postTitle = q

  const useCase = container.get<AllWebSiteUseCase>(Registry.AllWebSiteUseCase)
  const posts = await useCase.execute(input)

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
    page: +page,
    limit: +limit,
    categoryName: '',
    subCategoryName: '',
    postTitle: ''
  }

  if (slug[0] && slug[0] !== 'search') input.categoryName = slug[0]
  if (slug[1]) input.subCategoryName = slug[1]
  if (q) input.postTitle = q

  const allWebSiteUseCase = container.get<AllWebSiteUseCase>(
    Registry.AllWebSiteUseCase
  )
  const allUpcomingSiteUseCase = container.get<AllUpcomingSiteUseCase>(
    Registry.AllUpcomingSiteUseCase
  )
  const allAdvertisementWebSiteUseCase =
    container.get<AllAdvertisementWebSiteUseCase>(
      Registry.AllAdvertisementWebSiteUseCase
    )

  const [
    { data: posts, total },
    { data: upcomingEvents },
    { data: advertisements }
  ] = await Promise.all([
    allWebSiteUseCase.execute(input),
    allUpcomingSiteUseCase.execute(input),
    allAdvertisementWebSiteUseCase.execute()
  ])

  if (!posts.length && !upcomingEvents.length) return notFound()

  // Garantir que as propagandas sejam embaralhadas
  const shuffledAds = advertisements?.sort(() => Math.random() - 0.5)

  if (upcomingEvents.length && slug[0] !== 'search') {
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
