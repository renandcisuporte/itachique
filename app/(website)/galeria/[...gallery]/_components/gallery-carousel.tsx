import dynamic from 'next/dynamic'
import { webSiteAction } from '../../../../../_core/main/config/dependencies'
// import { GalleryCarouselClient } from './gallery-carousel-client'

const GalleryCarouselClient = dynamic(
  () => import('./gallery-carousel-client'),
  { ssr: false }
)

export default async function GalleryCarousel({
  categoryName
}: {
  categoryName: string
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const posts = await webSiteAction.list({
    categoryName,
    limit: 20
  })

  return (
    <>
      <GalleryCarouselClient posts={posts.data} />
    </>
  )
}
