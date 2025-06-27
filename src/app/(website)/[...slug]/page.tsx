import { description, title } from '@/config'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AllAdvertisementWebSiteUseCase } from '@/core/application/use-cases/website/all-advertisement-website-use-case'
import { AllUpcomingSiteUseCase } from '@/core/application/use-cases/website/all-upcomingsite-use-case'
import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { buildSearchInput } from '@/libs/utils'
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
  let input = buildSearchInput(params.slug, searchParams)

  const useCase = container.get<AllWebSiteUseCase>(Registry.AllWebSiteUseCase)
  const { data } = await useCase.execute(input)
  const site = data[0]

  return {
    title: site
      ? `${site.categoryName} - ${site.subCategoryName} - ${title}`
      : title,
    description
  }
}

export default async function Page({ params, searchParams }: Props) {
  let input = buildSearchInput(params.slug, searchParams)

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

  if (!(posts?.length || upcomingEvents?.length)) return notFound()

  const shuffledAds = [...advertisements].sort(() => Math.random() - 0.5)
  const adsCount = Math.ceil((posts?.length || upcomingEvents?.length) / 4)

  const Component =
    upcomingEvents?.length && params.slug[0] !== 'search'
      ? UpcomingEvents
      : Events

  return (
    <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
      <Component
        ads={adsCount}
        posts={
          upcomingEvents.length && params.slug[0] !== 'search'
            ? upcomingEvents
            : posts
        }
        shuffledAds={shuffledAds}
        events={params.slug}
        total={total}
        page={Number(searchParams.page ?? 1)}
        search={searchParams.q ?? ''}
      />
    </div>
  )
}
