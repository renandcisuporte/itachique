import { UserGateway } from '@/core/domain/gateway/user-gateway'
import { ValidationError } from '@/core/application/errors/validation-error'
import { Authentication } from '@/core/domain/entity/authentication-entity'

export class AuthenticationUseCase {
  constructor(private readonly authRepository: UserGateway) {}

  async execute(data: Input): Promise<Output> {
    const login = Authentication.create(data)

    const result = await this.authRepository.findByEmail(data.email)
    if (!result) throw new ValidationError({ message: ['Dados inválidos'] })

    return {
      data: {
        accessToken: 'token'
      }
    }
  }
}

type Input = {
  email: string
  password: string
}

type Output = {
  data: {
    accessToken: string
  }
}
