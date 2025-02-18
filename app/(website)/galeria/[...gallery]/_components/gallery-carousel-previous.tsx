import { webSiteAction } from '@/core/main/config/dependencies'
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

  const [{ data: posts }] = await Promise.all([
    webSiteAction.list({
      categoryName,
      date: datePrevious,
      limit: 20
    })
  ])

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
