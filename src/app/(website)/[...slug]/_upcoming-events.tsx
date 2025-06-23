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

export function UpcomingEvents({ ads, posts, shuffledAds }: Props) {
  return (
    <>
      {shuffledAds?.slice(0, ads).map((item, i) => (
        <Container key={item.id}>
          {item.galleryImagesJson && (
            <AdvertisementClient
              images={item.galleryImagesJson}
              link={item.link}
            />
          )}

          <CardEvent.content>
            {posts?.slice(i * 4, i * 4 + 4)?.map((item) => (
              <CardEvent.item
                key={item.id}
                title={item.postTitle}
                url={`/evento/${slug(item.postTitle)}/${item.id}`}
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
    </>
  )
}
