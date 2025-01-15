import { ValidationError } from '@/core/application/errors/validation-error'
import { UserProps, UserSchema } from '../schemas/user-schema'

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps) {
    return new User(props)
  }

  static with(props: UserProps) {
    return new User(props)
  }

  static login({ email, password }: UserProps) {
    const isValidated = UserSchema.safeParse({
      email,
      password
    })

    if (!isValidated.success)
      throw new ValidationError(isValidated.error.format())

    return new User({
      email,
      password
    })
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
