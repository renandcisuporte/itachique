import { ValidationError } from '@/core/app/errors/validation-error'

import {
  AuthenticationProps,
  AuthenticationSchema
} from '../schemas/authentication-schema'

export class Authentication {
  private constructor(private readonly props: AuthenticationProps) {
    this.validate()
  }

  private validate() {
    const result = AuthenticationSchema.safeParse(this.props)
    if (!result.success) {
      const error = result.error.flatten()
      throw new ValidationError(error.fieldErrors)
    }
  }

  static create({ email, password }: AuthenticationProps) {
    return new Authentication({
      email,
      password
    })
  }

  static with(props: AuthenticationProps) {
    return new Authentication(props)
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }
}
