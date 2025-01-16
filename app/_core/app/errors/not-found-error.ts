import { CommonError } from '@/core/app/errors/common-error'

export class NotFoundError extends CommonError {
  constructor(message: string | object = 'Registro não encontrado') {
    super(message, 404)
  }
}
