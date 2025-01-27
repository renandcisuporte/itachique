import { CommonError } from './common-error'

export class ValidationError extends CommonError {
  constructor(message: string | object) {
    super(message, 422)
  }
}
