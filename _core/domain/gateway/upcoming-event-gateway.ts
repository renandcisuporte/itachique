import { UpcomingEvent } from '@/core/domain/entity/upcoming-event-entity'

export interface UpcomingEventGateway {
  delete(id: string): Promise<void>
  update(id: string, input: UpcomingEvent): Promise<UpcomingEvent>
  create(input: UpcomingEvent): Promise<UpcomingEvent>
  allUpcomingEvent(): Promise<UpcomingEvent[]>
  allUpcomingEventValidated(): Promise<UpcomingEvent[]>
}
