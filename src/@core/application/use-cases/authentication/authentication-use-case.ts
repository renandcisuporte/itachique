import { ValidationError } from '@/core/application/errors/validation-error'
import { Authentication } from '@/core/domain/entity/authentication-entity'
import { UserGateway } from '@/core/domain/gateway/user-gateway'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class AuthenticationUseCase {
  private readonly secretKey = process.env.NEXT_PUBLIC_KEY
  private readonly expiresIn = process.env.NEXT_PUBLIC_TTL

  constructor(private readonly authRepository: UserGateway) {}

  async execute(data: Input): Promise<Output> {
    const auth = Authentication.create(data)
    const result = await this.authRepository.findByEmail(auth.email)
    if (!result) throw new ValidationError({ message: ['Dados inválidos'] })

    if (!this.validatedPassword(auth.password, result.password))
      throw new ValidationError({ message: ['Dados inválidos'] })

    const accessToken = this.createToken({
      id: result.id,
      email: result.email,
      name: result.name
    })

    return {
      data: {
        accessToken
      }
    }
  }

  private createToken(data: {}): string {
    return sign({ sub: data }, this.secretKey, { expiresIn: this.expiresIn })
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
