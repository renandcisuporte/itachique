import { Locale } from '@/core/domain/entity/locale-entity'

export interface LocaleGateway {
  all(): Promise<Locale[]>
}
