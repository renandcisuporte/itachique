import { webSiteAction } from '@/core/main/config/dependencies'
import dynamic from 'next/dynamic'

const GalleryCarouselClient = dynamic(
  () => import('./gallery-carousel-client'),
  { ssr: false }
)

export default async function GalleryCarousel({
  categoryName
}: {
  categoryName: string
}) {
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
