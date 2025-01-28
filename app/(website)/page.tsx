import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { UpcomingEventsClient } from '@/components/upcoming-events-client'
import { applicationName, description, keywords, title } from '@/config'
import {
  advertisementAction,
  upcomingEventAction,
  webSiteAction
} from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import { Fragment } from 'react'

// deve revalidar a pagina a cada 1 hora
export const revalidate = 3600 // 1 hour

export const metadata: Metadata = {
  title,
  applicationName,
  keywords,
  description,
  metadataBase: new URL(process.env.NEXT_BASE_URL),
  icons: {
    icon: `${process.env.NEXT_BASE_URL}/favicon.ico`,
    shortcut: `${process.env.NEXT_BASE_URL}/favicon-16x16.png`,
    apple: `${process.env.NEXT_BASE_URL}/apple-touch-icon.png`
  },
  openGraph: {
    title,
    description,
    url: process.env.NEXT_BASE_URL,
    siteName: applicationName,
    images: [
      {
        url: `${process.env.NEXT_BASE_URL}/logo.png`,
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
      advertisementAction.list(),
      upcomingEventAction.listValidated()
    ])

  // Garantir que as propagandas sejam embaralhadas
  const shuffledAds = advertisements.sort(() => Math.random() - 0.5)

  return (
    <div className="space-y-8 bg-neutral-900 pb-8">
      {shuffledAds.map((item, i) => (
        <Fragment key={item.id}>
          {item.galleryImagesJson && (
            <div className="bg-white py-4">
              <Container>
                <small className="text-[10px] uppercase tracking-widest">
                  publicidade
                </small>
                <AdvertisementClient
                  images={item.galleryImagesJson}
                  link={item.link}
                />
              </Container>
            </div>
          )}

          {i === 0 && <UpcomingEventsClient events={events} />}

          <Container className="space-y-8">
            <CardEvent.content>
              {posts?.slice(i * 4, i * 4 + 4)?.map((item) => (
                <CardEvent.item
                  key={item.id}
                  id={item.id}
                  title={item.postTitle}
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
        </Fragment>
      ))}
    </div>
  )
}
