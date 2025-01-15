import { User } from '../entity/user-entity'

export interface UserGateway {
  findByEmail(email: string): Promise<User | null>
}
