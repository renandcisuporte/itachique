import { Advertisement } from '@/core/domain/entity/advertisement-entity'

export interface AdvertisementGateway {
  delete(id: string): Promise<void>
  update(id: string, input: Advertisement): Promise<Advertisement>
  create(input: Advertisement): Promise<Advertisement>
  allAdvertisement(): Promise<Advertisement[]>
}
