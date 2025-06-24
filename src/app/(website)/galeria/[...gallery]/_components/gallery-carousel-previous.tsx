import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn } from '@/libs/utils'
import GalleryCarouselClient from './gallery-carousel-client'

export async function GalleryCarouselPrevious({
  categoryName,
  label = 'Vale a pena ver de novo',
  date
}: {
  categoryName: string
  label?: string
  date: string
}) {
  let [day, month, year] = date.split('/').map(Number)
  let datePrevious = new Date(year, month - 1, day)
  datePrevious.setFullYear(datePrevious.getFullYear() - 2)

  const useCase = container.get<AllWebSiteUseCase>(Registry.AllWebSiteUseCase)
  const { data: posts } = await useCase.execute({
    categoryName,
    postDate: datePrevious.toDateString(),
    limit: 20
  })

  return (
    <div>
      <h2
        className={cn(
          'uppercase text-[#e4e439] md:text-2xl',
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
