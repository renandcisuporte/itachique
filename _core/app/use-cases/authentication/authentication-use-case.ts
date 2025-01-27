import { Authentication } from '@/core/domain/entity/authentication-entity'
import { UserGateway } from '@/core/domain/gateway/user-gateway'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { ValidationError } from '../../errors/validation-error'

export class AuthenticationUseCase {
  constructor(private readonly authRepository: UserGateway) {}

  async execute(data: Input): Promise<Output> {
    const auth = Authentication.create(data)
    const result = await this.authRepository.findByEmail(auth.email)
    if (!result) throw new ValidationError({ message: ['Dados inválidos'] })

    if (!this.validatedPassword(auth.password, result.password))
      throw new ValidationError({ message: ['Dados inválidos'] })

    return {
      data: {
        accessToken: this.createToken({
          id: result.id,
          email: result.email,
          name: result.name
        })
      }
    }
  }

  private createToken(data: {}): string {
    return sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        iat: Math.floor(Date.now() / 1000),
        sub: data
      },
      process.env.NEXT_SECRET_SESSION!
    )
  }

  private validatedPassword(password: string, hash: string): boolean {
    return compareSync(password, hash)
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
