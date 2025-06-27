import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { AdvertisementProps } from '@/core/domain/entity/advertisement-entity'
import { WebSiteProps } from '@/core/domain/entity/website-entity'
import { slug } from '@/libs/utils'

type Props = {
  posts?: WebSiteProps[]
  shuffledAds?: AdvertisementProps[]
  ads: number
}

export function UpcomingEvents({ ads, posts = [], shuffledAds = [] }: Props) {
  const chunks: { ads: AdvertisementProps; events: WebSiteProps[] }[] = []

  for (let i = 0; i < ads; i++) {
    const ads = shuffledAds[i]
    const events = posts.slice(i * 4, i * 4 + 4)
    if (events.length > 0) chunks.push({ ads, events })
  }

  return (
    <>
      {chunks.map(({ ads: ad, events }, i) => (
        <Container key={ad?.id ?? `ad-${i}`}>
          {ad?.galleryImagesJson && (
            <AdvertisementClient
              images={ad.galleryImagesJson ?? []}
              link={ad.link ?? '#'}
            />
          )}

          <CardEvent.content>
            {events.map((event) => (
              <CardEvent.item
                key={event.id}
                title={event.postTitle}
                url={`/evento/${slug(event.postTitle)}/${event.id}`}
              >
                <CardEvent.image
                  src={event.postCoverImage}
                  alt={event.postTitle}
                />
                <CardEvent.title>{event.postTitle}</CardEvent.title>
                <CardEvent.description>
                  Data: {event.postDate}
                </CardEvent.description>
                {event.postLocale && (
                  <CardEvent.description>
                    Local: {event.postLocale}
                  </CardEvent.description>
                )}
                {event.postCity && (
                  <CardEvent.description>
                    Cidade: {event.postCity}
                  </CardEvent.description>
                )}
              </CardEvent.item>
            ))}
          </CardEvent.content>
        </Container>
      ))}
    </>
  )
}
