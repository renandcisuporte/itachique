import { CardEvent } from '@/components/common/card'
import { webSiteAction } from '@/core/main/config/dependencies'
import Image from 'next/image'
import { Container } from '../_components/common/container'

// const meta: Metadata = {
//   title: data.title,
//   applicationName: data.title,
//   keywords: data.keywords,
//   description: data.description,
// };

export default async function Home() {
  const posts = await webSiteAction.list({ page: 1, limit: 8 })

  return (
    <>
      <div className="bg-white py-12">
        <Container>
          <small className="text-xs uppercase md:text-lg">publicidade</small>
          <Image src="/banner.jpg" alt="banner" width={1200} height={200} />
        </Container>
      </div>

      <div className="space-y-8 bg-neutral-900 py-8">
        <Container className="space-y-8">
          <Image
            src="/last-events.png"
            alt="Próximos Eventos"
            width={300}
            height={100}
            className="mx-auto"
          />
          <CardEvent.content>
            {posts.data?.map((item) => (
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
      </div>
    </>
  )
}
