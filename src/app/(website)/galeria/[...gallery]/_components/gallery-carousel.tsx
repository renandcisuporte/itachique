import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn } from '@/libs/utils'
import GalleryCarouselClient from './gallery-carousel-client'

export async function GalleryCarousel({
  label,
  categoryName
}: {
  label?: string
  categoryName: string
}) {
  const useCase = container.get<AllWebSiteUseCase>(Registry.AllWebSiteUseCase)
  const { data: posts } = await useCase.execute({
    categoryName,
    limit: 20
  })

  return (
    <div>
      <h2
        className={cn(
          'mb-2 uppercase text-[#e4e439] md:text-2xl',
          mrEavesXLModOTBold.className
        )}
      >
        {label}
      </h2>
      <div className="hidden md:block">
        <GalleryCarouselClient posts={posts} perView={5} />
      </div>
      <div className="block md:hidden">
        <GalleryCarouselClient posts={posts} perView={2} />
      </div>
    </div>
  )
}
