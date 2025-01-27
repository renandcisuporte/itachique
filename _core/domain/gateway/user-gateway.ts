import { User } from '@/core/domain/entity/user-entity'

export interface UserGateway {
  findByEmail(email: string): Promise<User | null>
}
