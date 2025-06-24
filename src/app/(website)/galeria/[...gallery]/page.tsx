import { AdvertisementClient } from '@/components/advertisement-client'
import { Container } from '@/components/common/container'
import { ShareButtons } from '@/components/shared-buttons'
import { title } from '@/config'
import { AllAdvertisementWebSiteUseCase } from '@/core/application/use-cases/website/all-advertisement-website-use-case'
import { FindWebSiteUseCase } from '@/core/application/use-cases/website/find-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug as fncSlug } from '@/libs/utils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Gallery } from './_components/gallery'
import { GalleryCarousel } from './_components/gallery-carousel'
import { GalleryCarouselPrevious } from './_components/gallery-carousel-previous'

type Props = {
  params: { gallery: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [slug, id, page, photo] = params.gallery
  if (params.gallery.length !== 4) return notFound()

  const useCase = container.get<FindWebSiteUseCase>(Registry.FindWebSiteUseCase)
  const { data: posts } = await useCase.execute({ id })
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
          url: `${process.env.NEXT_PUBLIC_BASE_IMG}${posts?.postCoverImage}`,
          width: 1200,
          height: 630,
          alt: posts?.postTitle
        }
      ]
    }
  } as Metadata
}

export default async function Page({ params }: Props) {
  const [slug, id, page, photo] = params.gallery
  if (params.gallery.length !== 4) return notFound()

  const findWebSiteUseCase = container.get<FindWebSiteUseCase>(
    Registry.FindWebSiteUseCase
  )
  const allAdvertisementWebSiteUseCase =
    container.get<AllAdvertisementWebSiteUseCase>(
      Registry.AllAdvertisementWebSiteUseCase
    )

  const [{ data: posts }, { data: advertisements }] = await Promise.all([
    findWebSiteUseCase.execute({ id }),
    allAdvertisementWebSiteUseCase.execute()
  ])
  if (!posts?.galleryImage?.length) return notFound()

  // Garantir que as propagandas sejam embaralhadas
  const shuffleAdsHeader = advertisements?.sort(() => Math.random() - 0.5)?.[0]
  const shuffleAdsMiddle = advertisements?.sort(() => Math.random() - 0.5)?.[1]
  const shuffleAdsFooter = advertisements?.sort(() => Math.random() - 0.5)?.[2]

  return (
    <div className="bg-neutral-900 py-8 [&>div:first-child]:-mt-8">
      <Container className="flex flex-col space-y-8">
        <AdvertisementClient
          images={shuffleAdsHeader.galleryImagesJson!}
          link={shuffleAdsHeader.link!}
        />
        <div>
          <h1
            className={cn(
              'uppercase text-[#e4e439] md:text-4xl',
              mrEavesXLModOTBold.className
            )}
          >
            {posts?.postTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div>
              <p className="p-0">Data: {posts?.postDate}</p>
              {posts?.postLocale && (
                <p className="p-0">Local: {posts?.postLocale}</p>
              )}
              {posts?.postCity && (
                <p className="p-0">Cidade: {posts?.postCity}</p>
              )}
            </div>
            <ShareButtons
              text={posts?.postTitle}
              url={`${process.env.NEXT_PUBLIC_BASE_URL}/galeria/${slug}/${id}/0/0`}
              className="justify-end"
            />
          </div>

          <div className="space-y-4">
            <Gallery
              id={id}
              postTitle={slug}
              galleryImage={posts?.galleryImage}
              page={+page}
              photo={+photo}
            />
          </div>
        </div>

        <AdvertisementClient
          images={shuffleAdsMiddle.galleryImagesJson!}
          link={shuffleAdsMiddle.link!}
        />

        <Suspense fallback={<>Carregando...</>}>
          <GalleryCarousel
            categoryName={fncSlug(posts?.categoryName)}
            label="Vale a pena ver de novo"
          />
        </Suspense>

        <AdvertisementClient
          images={shuffleAdsFooter.galleryImagesJson!}
          link={shuffleAdsFooter.link!}
        />

        <Suspense fallback={<>Carregando...</>}>
          <GalleryCarouselPrevious
            categoryName={fncSlug(posts?.categoryName)}
            date={posts?.postDate}
            label="Veja também"
          />
        </Suspense>
      </Container>
    </div>
  )
}
