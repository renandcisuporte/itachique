import { CardEvent } from '@/components/common/card'
import { Container } from '@/components/common/container'
import { Pagination } from '@/components/pagination'
import { description, title } from '@/config'
import { webSiteAction } from '@/core/main/config/dependencies'
import { slug, slugNormalized } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    events: string
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
  // read route params
  const { events } = params
  const { q = '' } = searchParams

  let input = {
    categoryName: slugNormalized(events),
    postTitle: ''
  }

  if (events === 'search') {
    input.postTitle = q
    input.categoryName = ''
  }

  const posts = await webSiteAction.list(input)
  return {
    title: `${
      posts.data.length > 0 ? `${posts.data[0].categoryName}: ` : ''
    } ${title}`,
    description
  }
}

export async function generateStaticParams() {
  const posts = await webSiteAction.list({ limit: 500 })
  return posts.data.map((item) => {
    return { events: slug(item.categoryName) }
  })
}

export default async function Page({ params, searchParams }: Props) {
  const { events } = params
  const { page = 1, limit = 12, q = '' } = searchParams
  if (events === undefined) return notFound()

  let input = {
    page,
    limit,
    categoryName: slugNormalized(events),
    postTitle: ''
  }

  if (events === 'search') {
    input.postTitle = q
    input.categoryName = ''
  }

  const posts = await webSiteAction.list(input)
  if (!posts.data.length) return notFound()

  return (
    <>
      <div className="bg-white py-12">
        <Container>
          <small className="uppercase">publicidade</small>
          <Image src="/banner.jpg" alt="banner" width={1200} height={200} />
        </Container>
      </div>

      <div className="bg-neutral-900 py-16">
        <Container>
          <CardEvent.content>
            {posts.data?.map((item: any) => (
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

        {posts.total > 0 && (
          <Pagination page={+page} total={posts.total} pathname={events} />
        )}
      </div>
    </>
  )
}
