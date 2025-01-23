import { CardEvent } from '@/components/common/card'
import { applicationName, description, keywords, title } from '@/config'
import { webSiteAction } from '@/core/main/config/dependencies'
import { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '../_components/common/container'

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
  const posts = await webSiteAction.list({ page: 1, limit: 8 })

  return (
    <>
      <div className="bg-white py-12">
        <Container>
          <small className="text-[10px] uppercase">publicidade</small>
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
