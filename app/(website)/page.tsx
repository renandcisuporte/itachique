import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { UpcomingEventsClient } from '@/components/upcoming-events-client'
import { applicationName, description, keywords, title } from '@/config'
import {
  upcomingEventAction,
  webSiteAction
} from '@/core/main/config/dependencies'
import { slug } from '@/lib/utils'
import { Metadata } from 'next'

// deve revalidar a pagina a cada 1 minutos
// export const revalidate = 60
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
  const [{ data: posts }, { data: advertisements }, { data: events }] =
    await Promise.all([
      webSiteAction.list({ page: 1, limit: 12 }),
      webSiteAction.listByAds(),
      upcomingEventAction.listValidated()
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

          {i === 0 && <UpcomingEventsClient events={events} />}

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
