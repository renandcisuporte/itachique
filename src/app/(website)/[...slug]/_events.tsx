import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { Pagination } from '@/components/pagination'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { slug } from '@/lib/utils'
import Image from 'next/image'
import { AdvertisementProps } from '../../../@core/domain/entity/advertisement-entity'
import { WebSiteProps } from '../../../@core/domain/entity/website-entity'

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
  posts,
  shuffledAds,
  total,
  page,
  search
}: Props) {
  return (
    <>
      {shuffledAds?.slice(0, ads).map((item, i) => (
        <Container key={item.id}>
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
              <Pagination
                q={search}
                page={+page}
                totalPage={total}
                perPage={16}
                pathname={`/${events.join('/')}`}
              />
            </>
          )}

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

      {total > 0 && (
        <Pagination
          q={search}
          page={+page}
          totalPage={total}
          perPage={16}
          pathname={`/${events.join('/')}`}
        />
      )}
    </>
  )
}
