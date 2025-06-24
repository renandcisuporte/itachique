import { Gallery } from '@/core/domain/entity/gallery-entity'

export interface GalleryGateway {
  find(id: string): Promise<Gallery | null>
  count(): Promise<number>
  all(post_id: string): Promise<Gallery[]>
  delete(id: string): Promise<void>
  save(input: Gallery): Promise<Gallery>
}
