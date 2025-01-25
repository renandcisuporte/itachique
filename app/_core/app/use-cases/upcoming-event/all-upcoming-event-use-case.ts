import {
  UpcomingEvent,
  UpcomingEventProps
} from '@/core/domain/entity/upcoming-event-entity'
import { UpcomingEventGateway } from '@/core/domain/gateway/upcoming-event-gateway'

export class AllUpcomingEventUseCase {
  constructor(private readonly repository: UpcomingEventGateway) {}

  async execute(): Promise<{ data: UpcomingEventProps[] }> {
    const data = await this.repository.allUpcomingEvent()
    return { data: data.map(this.present) }
  }

  private present(props: UpcomingEvent): UpcomingEventProps {
    return {
      id: props.id,
      title: props.title,
      description: props.description,
      locale: props.locale,
      date: props.date,
      dateISO: props.dateISO,
      galleryImages: props.galleryImages,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt
    }
  }
}
