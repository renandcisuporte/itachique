import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import GalleryCarouselClient from './gallery-carousel-client'

// import dynamic from 'next/dynamic'
// const GalleryCarouselClient = dynamic(
//   () => import('./gallery-carousel-client'),
//   { ssr: false }
// )

export async function GalleryCarousel({
  categoryName
}: {
  categoryName: string
}) {
  const useCase = container.get<AllWebSiteUseCase>(Registry.AllWebSiteUseCase)
  const { data: posts } = await useCase.execute({
    categoryName,
    limit: 20
  })

  return (
    <>
      <div className="hidden md:block">
        <GalleryCarouselClient posts={posts} perView={5} />
      </div>
      <div className="block md:hidden">
        <GalleryCarouselClient posts={posts} perView={2} />
      </div>
    </>
  )
}
