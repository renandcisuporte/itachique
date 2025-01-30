import { AdvertisementClient } from '@/components/advertisement-client'
import { Container } from '@/components/common/container'
import { title } from '@/config'
import { webSiteAction } from '@/core/main/config/dependencies'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Gallery } from './_components/gallery'
import { GalleryCarousel } from './_components/gallery-carousel'

type Props = {
  params: { gallery: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [slug, id, page, photo] = params.gallery
  if (params.gallery.length !== 4) return notFound()

  const { data: posts } = await webSiteAction.find(id)
  if (!posts?.galleryImage?.length) return notFound()

  return {
    title: `${posts?.postTitle} - ${title}`,
    description: posts?.postTitle,
    keywords: `${posts?.categoryName}, ${title}`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/galeria/${slug}/${id}/${page}/${photo}`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    openGraph: {
      title: `${posts?.postTitle} - ${title}`,
      description: posts?.postTitle,
      keywords: `${posts?.categoryName}, ${title}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${posts?.postCoverImage}`,
          width: 1200,
          height: 630,
          alt: posts?.postTitle
        }
      ]
    }
  } as Metadata
}

// export async function generateStaticParams() {
//   const { data: posts } = await webSiteAction.list({ limit: 5 })
//   return posts.map((item) => {
//     return { gallery: [slug(item.postTitle), item.id, '0', '0'] }
//   })
// }

export default async function Page({ params }: Props) {
  const [slug, id, page, photo] = params.gallery
  if (params.gallery.length !== 4) return notFound()

  const [{ data: posts }, { data: advertisements }] = await Promise.all([
    webSiteAction.find(id),
    webSiteAction.listByAds()
  ])
  if (!posts?.galleryImage?.length) return notFound()

  // Garantir que as propagandas sejam embaralhadas
  const shuffleAdsHeader = advertisements?.sort(() => Math.random() - 0.5)?.[0]
  const shuffleAdsFooter = advertisements?.sort(() => Math.random() - 0.5)?.[1]

  return (
    <div className="bg-neutral-900 py-8">
      <Container className="flex flex-col space-y-4">
        <AdvertisementClient
          images={shuffleAdsHeader.galleryImagesJson!}
          link={shuffleAdsHeader.link!}
        />

        <h1
          className={cn(
            'uppercase text-[#e4e439] md:text-4xl',
            mrEavesXLModOTBold.className
          )}
        >
          {posts?.postTitle}
        </h1>

        <p className="p-0">Data: {posts?.postDate}</p>

        {posts?.postLocale && <p className="p-0">Local: {posts?.postLocale}</p>}
        {posts?.postCity && <p className="p-0">Cidade: {posts?.postCity}</p>}

        <Gallery
          id={id}
          postTitle={slug}
          galleryImage={posts?.galleryImage}
          page={+page}
          photo={+photo}
        />

        <AdvertisementClient
          images={shuffleAdsFooter.galleryImagesJson!}
          link={shuffleAdsFooter.link!}
        />

        <h2
          className={cn(
            'uppercase text-[#e4e439] md:text-2xl',
            mrEavesXLModOTBold.className
          )}
        >
          Veja também
        </h2>

        <Suspense fallback={<>Carregando...</>}>
          <GalleryCarousel categoryName={posts?.categoryName} />
        </Suspense>
      </Container>
    </div>
  )
}
