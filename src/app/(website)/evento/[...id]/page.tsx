import { AdvertisementClient } from '@/components/advertisement-client'
import { Container } from '@/components/common/container'
import { ShareButtons } from '@/components/shared-buttons'
import { title } from '@/config'
import { AllAdvertisementWebSiteUseCase } from '@/core/application/use-cases/website/all-advertisement-website-use-case'
import { AllUpcomingSiteUseCase } from '@/core/application/use-cases/website/all-upcomingsite-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug } from '@/libs/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  const useCase = container.get<AllUpcomingSiteUseCase>(
    Registry.AllUpcomingSiteUseCase
  )
  const { data } = await useCase.execute({ id: id[1] })

  return {
    title: `${data[0]?.postTitle} - ${title}`,
    description: ''
  }
}

export default async function Page({ params }: Props) {
  const { id } = params

  const allUpcomingSiteUseCase = container.get<AllUpcomingSiteUseCase>(
    Registry.AllUpcomingSiteUseCase
  )
  const allAdvertisementWebSiteUseCase =
    container.get<AllAdvertisementWebSiteUseCase>(
      Registry.AllAdvertisementWebSiteUseCase
    )

  const [{ data: upcomingEvents }, { data: advertisements }] =
    await Promise.all([
      allUpcomingSiteUseCase.execute({ id: id[1] }),
      allAdvertisementWebSiteUseCase.execute()
    ])

  if (!upcomingEvents?.length) return notFound()
  const event = upcomingEvents[0]

  const shufflesAds = [...(advertisements || [])].sort(
    () => Math.random() - 0.5
  )
  const [shuffleAdsHeader, shuffleAdsFooter] = shufflesAds

  return (
    <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
      <Container>
        <AdvertisementClient
          images={shuffleAdsHeader.galleryImagesJson!}
          link={shuffleAdsHeader.link!}
        />
        <h1
          className={cn(
            'uppercase text-[#e4e439] md:text-4xl',
            mrEavesXLModOTBold.className
          )}
        >
          {event.postTitle}
        </h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="p-0">Data: {event.postDate}</p>
            {event.postLocale && (
              <p className="p-0">Local: {event.postLocale}</p>
            )}
            {event.postCity && <p className="p-0">Cidade: {event.postCity}</p>}
          </div>
          <ShareButtons
            text={event.postTitle}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/evento/${slug(event.postTitle)}/${id}`}
            className="justify-end"
          />
        </div>

        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_IMG}${event.postCoverImage}`}
          width={600}
          height={600}
          className="mx-auto my-6 w-full max-w-[600px]"
          alt="Share"
        />

        <div
          className="flex flex-col items-center justify-end"
          dangerouslySetInnerHTML={{
            __html: event.subCategoryName || ''
          }}
        />

        <AdvertisementClient
          images={shuffleAdsFooter.galleryImagesJson!}
          link={shuffleAdsFooter.link!}
        />
      </Container>
    </div>
  )
}
