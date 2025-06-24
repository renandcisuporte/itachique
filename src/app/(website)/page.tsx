import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UpcomingEventsClient } from '@/components/upcoming-events-client'
import { applicationName, description, keywords, title } from '@/config'
import { AllValidatedUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/all-validated-upcoming-event-use-case'
import { AllAdvertisementWebSiteUseCase } from '@/core/application/use-cases/website/all-advertisement-website-use-case'
import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { slug } from '@/libs/utils'
import { Metadata } from 'next'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title,
  applicationName,
  keywords,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon-16x16.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_URL}/apple-touch-icon.png`
  },
  openGraph: {
    title,
    description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: applicationName,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: title
      }
    ]
  }
}

export default async function Home() {
  const useCasePosts = container.get<AllWebSiteUseCase>(
    Registry.AllWebSiteUseCase
  )
  const useCaseAds = container.get<AllAdvertisementWebSiteUseCase>(
    Registry.AllAdvertisementWebSiteUseCase
  )
  const useCaseUpcoming = container.get<AllValidatedUpcomingEventUseCase>(
    Registry.AllValidatedUpcomingEventUseCase
  )

  const [{ data: posts }, { data: advertisements }, { data: events }] =
    await Promise.all([
      useCasePosts.execute({ page: 1, limit: 12 }),
      useCaseAds.execute(),
      useCaseUpcoming.execute()
    ])

  // Garantir que as propagandas sejam embaralhadas
  const shuffledAds = advertisements?.sort(() => Math.random() - 0.5)

  return (
    <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
      {shuffledAds?.map((item, i) => (
        <Container key={item.id}>
          {item.galleryImagesJson && (
            <AdvertisementClient
              images={item.galleryImagesJson}
              link={item.link}
            />
          )}

          {i === 0 && (
            <>
              <UpcomingEventsClient events={events} />
              <form
                className="mx-auto w-full items-center justify-end px-4 text-neutral-900 md:w-1/2"
                action="/search"
              >
                <Label
                  htmlFor="q"
                  className="text-left text-lg text-white md:text-center"
                >
                  Pesquisar eventos
                </Label>
                <div className="relative mb-6 flex flex-1 items-center justify-end">
                  <Input name="q" placeholder="Buscar" className="flex-1" />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full w-8"
                  >
                    <Image
                      src="/search.png"
                      width={20}
                      height={20}
                      alt="Search"
                    />
                  </button>
                </div>
              </form>
            </>
          )}

          <CardEvent.content>
            {posts?.slice(i * 4, i * 4 + 4)?.map((item) => (
              <CardEvent.item
                key={item.id}
                title={item.postTitle}
                url={`/galeria/${slug(item.postTitle)}/${item.id}/0/0`}
              >
                <CardEvent.image
                  src={item.postCoverImage}
                  alt={item.postTitle}
                />
                <CardEvent.title>{item.postTitle}</CardEvent.title>
                <CardEvent.description>
                  Data: {item.postDate}
                </CardEvent.description>
                <CardEvent.description>
                  Local: {item.postLocale}
                </CardEvent.description>
                <CardEvent.description>
                  Cidade: {item.postCity}
                </CardEvent.description>
              </CardEvent.item>
            ))}
          </CardEvent.content>
        </Container>
      ))}
    </div>
  )
}
