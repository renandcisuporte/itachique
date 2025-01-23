import { Container } from '@/components/common/container'
import { webSiteAction } from '@/core/main/config/dependencies'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug } from '@/lib/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Gallery } from './_components/gallery'
import { GalleryCarousel } from './_components/gallery-carousel'

export async function generateStaticParams() {
  const posts = await webSiteAction.list({})
  return posts.data.map((item) => {
    return { gallery: [slug(item.postTitle), item.id, '0', '0'] }
  })
}

export default async function Page({
  params
}: {
  params: { gallery: string[] }
}) {
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
          {posts.data?.postCoverImage && (
            <Gallery
              id={id}
              postTitle={slug}
              galleryImage={posts.data.galleryImage}
              page={+page}
              photo={+photo}
            />
          )}
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
            <GalleryCarousel categoryName={posts.data?.categoryName} />
          </Suspense>
        </Container>
      </div>
    </>
  )
}
