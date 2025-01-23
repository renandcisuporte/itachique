import { Container } from '@/components/common/container'
import { title } from '@/config'
import { webSiteAction } from '@/core/main/config/dependencies'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug } from '@/lib/utils'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Gallery } from './_components/gallery'

const GalleryCarouselSSR = dynamic(
  () => import('./_components/gallery-carousel'),
  { ssr: false }
)

type Props = {
  params: { gallery: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [slug, id, page, photo] = params.gallery
  if (params.gallery.length !== 4) return notFound()

  const posts = await webSiteAction.find(id)
  if (!posts.data?.galleryImage.length) return notFound()

  return {
    title: `${posts.data.postTitle} - ${title}`,
    description: posts.data.postTitle,
    keywords: `${posts.data.categoryName}, ${title}`,
    url: `${process.env.NEXT_BASE_URL}/galeria/${slug}/${id}/${page}/${photo}`,
    metadataBase: new URL(process.env.NEXT_BASE_URL),
    openGraph: {
      title: `${posts.data.postTitle} - ${title}`,
      description: posts.data.postTitle,
      keywords: `${posts.data.categoryName}, ${title}`,
      images: [
        {
          url: `${process.env.NEXT_BASE_URL}${posts.data.postCoverImage}`,
          width: 1200,
          height: 630,
          alt: posts.data.postTitle
        }
      ]
    }
  } as Metadata
}

export async function generateStaticParams() {
  const posts = await webSiteAction.list({ limit: 500 })
  return posts.data.map((item) => {
    return { gallery: [slug(item.postTitle), item.id, '0', '0'] }
  })
}

export default async function Page({ params }: Props) {
  const [slug, id, page, photo] = params.gallery
  if (params.gallery.length !== 4) return notFound()

  const posts = await webSiteAction.find(id)
  if (!posts.data?.galleryImage.length) return notFound()

  return (
    <>
      <div className="bg-white py-12">
        <Container>
          <small className="text-xs uppercase md:text-lg">publicidade</small>
          <Image src="/banner.jpg" alt="banner" width={1200} height={200} />
        </Container>
      </div>

      <div className="bg-neutral-900 py-16">
        <Container className="flex flex-col space-y-4">
          {/* <div className="flex flex-col justify-between space-y-2"> */}
          <h1
            className={cn(
              'uppercase text-[#e4e439] md:text-4xl',
              mrEavesXLModOTBold.className
            )}
          >
            {posts.data?.postTitle}
          </h1>
          <p className="p-0">Data: {posts.data?.postDate}</p>
          {posts.data?.postLocale && (
            <p className="p-0">Local: {posts.data?.postLocale}</p>
          )}
          {posts.data?.postCity && (
            <p className="p-0">Cidade: {posts.data?.postCity}</p>
          )}
          <Gallery
            id={id}
            postTitle={slug}
            galleryImage={posts.data.galleryImage}
            page={+page}
            photo={+photo}
          />
        </Container>
      </div>

      <div className="bg-white py-12">
        <Container>
          <small className="text-xs uppercase md:text-lg">publicidade</small>
          <Image src="/banner.jpg" alt="banner" width={1200} height={200} />
        </Container>
      </div>

      <div className="bg-neutral-900 py-16">
        <Container className="flex flex-col space-y-4">
          <h2
            className={cn(
              'uppercase text-[#e4e439] md:text-2xl',
              mrEavesXLModOTBold.className
            )}
          >
            Veja também
          </h2>
        </Container>
        <Container className="space-y-4">
          <Suspense fallback={<p>Carregando...</p>}>
            <GalleryCarouselSSR categoryName={posts.data?.categoryName} />
          </Suspense>
        </Container>
      </div>
    </>
  )
}
