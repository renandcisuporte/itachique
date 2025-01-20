import { City } from '@/core/domain/entity/city-entity'

export interface CityGateway {
  all(): Promise<City[]>
}
