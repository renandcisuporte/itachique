import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { Pagination } from '@/components/pagination'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AdvertisementProps } from '@/core/domain/entity/advertisement-entity'
import { WebSiteProps } from '@/core/domain/entity/website-entity'
import { slug } from '@/libs/utils'
import Image from 'next/image'

type Props = {
  posts?: WebSiteProps[]
  shuffledAds?: AdvertisementProps[]
  ads: number
  total: number
  events: string[]
  page: number
  search?: string
}

export function Events({
  ads,
  events,
  posts = [],
  shuffledAds = [],
  total,
  page,
  search
}: Props) {
  const blocks = Array.from({ length: ads }).map((_, i) => {
    const ad = shuffledAds[i]
    const items = posts.slice(i * 4, i * 4 + 4)
    return { ad, items }
  })

  return (
    <>
      {blocks.map(({ ad, items }, i) => (
        <Container key={ad?.id ?? `block-${i}`}>
          {i === 0 && (
            <>
              <form
                className="mx-auto my-6 w-full items-center justify-end text-neutral-900 md:w-1/2"
                action={`/${events.join('/')}`}
              >
                <Label
                  htmlFor="q"
                  className="text-left text-lg text-white md:text-center"
                >
                  Pesquisar eventos
                </Label>
                <div className="relative flex flex-1 items-center justify-end">
                  <Input
                    id="q"
                    name="q"
                    defaultValue={search}
                    placeholder="Buscar"
                    className="flex-1"
                  />
                  <button
                    type="submit"
                    aria-label="Buscar eventos"
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

              <Pagination
                q={search}
                page={page}
                totalPage={total}
                perPage={16}
                pathname={`/${events.join('/')}`}
              />
            </>
          )}

          {ad?.galleryImagesJson && (
            <AdvertisementClient
              images={ad.galleryImagesJson ?? []}
              link={ad.link ?? '#'}
            />
          )}

          <CardEvent.content>
            {items.map((event) => (
              <CardEvent.item
                key={event.id}
                title={event.postTitle}
                url={`/galeria/${slug(event.postTitle)}/${event.id}/0/0`}
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

      {/* Paginação extra opcional */}
      {total > 16 && (
        <Pagination
          q={search}
          page={page}
          totalPage={total}
          perPage={16}
          pathname={`/${events.join('/')}`}
        />
      )}
    </>
  )
}
