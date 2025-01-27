import { City } from '@/core/domain/entity/city-entity'

export interface CityGateway {
  all(): Promise<City[]>
  create(input: City): Promise<City>
  update(id: string, input: City): Promise<City>
  delete(id: string): Promise<void>
}
