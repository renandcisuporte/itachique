import { Locale } from '@/core/domain/entity/locale-entity'

export interface LocaleGateway {
  all(): Promise<Locale[]>
  create(input: Locale): Promise<Locale>
  update(id: string, input: Locale): Promise<Locale>
  delete(id: string): Promise<void>
}
