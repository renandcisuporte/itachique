import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import GalleryCarouselClient from './gallery-carousel-client'

export async function GalleryCarouselPrevious({
  categoryName,
  date
}: {
  categoryName: string
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
