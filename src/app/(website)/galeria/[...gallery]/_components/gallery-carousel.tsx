import { webSiteAction } from '../../../../../@core/main/config/dependencies'
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
  const [{ data: posts }] = await Promise.all([
    webSiteAction.list({
      categoryName,
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
