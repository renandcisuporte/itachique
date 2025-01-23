import { webSiteAction } from '@/core/main/config/dependencies'
import { GalleryCarousselClient } from './gallery-carousel-client'

export async function GalleryCarousel({
  categoryName
}: {
  categoryName: string
}) {
  const posts = await webSiteAction.list({
    categoryName,
    limit: 20
  })

  return <GalleryCarousselClient posts={posts.data} />
}
