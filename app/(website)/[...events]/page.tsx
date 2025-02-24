import { AdvertisementClient } from '@/components/advertisement-client'
import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { Pagination } from '@/components/pagination'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { description, title } from '@/config'
import { webSiteAction } from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {} from 'react'

type Props = {
  params: {
    events: string[]
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
  const { events } = params

  let input = {
    categoryName: '',
    subCategoryName: '',
    postTitle: ''
  }

  if (events[0]) input.categoryName = events[0]
  if (events[1]) input.subCategoryName = events[1]
  if (q) input.postTitle = q

  const posts = await webSiteAction.list(input)

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
  const { events } = params
  const { page = 1, limit = 16, q = '' } = searchParams

  if (events[0] === undefined) return notFound()

  let input = {
    page,
    limit,
    categoryName: '',
    subCategoryName: '',
    postTitle: ''
  }

  if (events[0]) input.categoryName = events[0]
  if (events[1]) input.subCategoryName = events[1]
  if (q) input.postTitle = q

  const [{ data: posts, total }, { data: advertisements }] = await Promise.all([
    webSiteAction.list(input),
    webSiteAction.listByAds()
  ])

  if (!posts.length) return notFound()

  // Garantir que as propagandas sejam embaralhadas
  const shuffledAds = advertisements?.sort(() => Math.random() - 0.5)

  // montar a lista de propagandas
  const ads = Math.ceil(posts.length / 4)

  return (
    <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
      {shuffledAds?.slice(0, ads).map((item, i) => (
        <Container key={item.id}>
          {i === 0 && (
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
          )}

          {item.galleryImagesJson && (
            <AdvertisementClient
              images={item.galleryImagesJson}
              link={item.link}
            />
          )}

          <CardEvent.content>
            {posts?.slice(i * 4, i * 4 + 4)?.map((item) => (
              <CardEvent.item key={item.id} id={item.id} title={item.postTitle}>
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
          q={q}
          page={+page}
          totalPage={total}
          perPage={16}
          pathname={events.join('/')}
        />
      )}
    </div>
  )
}
