export abstract class CommonError extends Error {
  public readonly code: number
  public readonly errors: string | object // Propriedade adicional para armazenar o valor original

  protected constructor(message: string | object, code: number = 500) {
    // Garante que `message` seja sempre uma string
    super(typeof message === 'object' ? JSON.stringify(message) : message)

    this.errors = message // Armazena o valor original
    this.code = code
    this.name = this.constructor.name

    // Captura a pilha de erro
    Error.captureStackTrace(this, this.constructor)
  }
}
