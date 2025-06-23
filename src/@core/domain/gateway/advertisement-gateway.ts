import { Advertisement } from '@/core/domain/entity/advertisement-entity'

export interface AdvertisementGateway {
  delete(id: string): Promise<void>
  update(id: string, input: Advertisement): Promise<Advertisement>
  create(input: Advertisement): Promise<Advertisement>
  find(id: string): Promise<Advertisement | null>
  allAdvertisement(): Promise<Advertisement[]>
  allAdvertisementValidated(): Promise<Advertisement[]>
}
