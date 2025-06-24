import {
  UpcomingEvent,
  UpcomingEventProps
} from '@/core/domain/entity/upcoming-event-entity'
import { UpcomingEventGateway } from '@/core/domain/gateway/upcoming-event-gateway'

export class UpdateUpcomingEventUseCase {
  constructor(private readonly advertisementRepository: UpcomingEventGateway) {}

  async execute(
    input: UpcomingEventProps
  ): Promise<{ data: UpcomingEventProps }> {
    const output = UpcomingEvent.with(input)
    const result = await this.advertisementRepository.update(output.id!, output)
    return { data: this.present(result) }
  }

  private present(props: UpcomingEvent): UpcomingEventProps {
    return {
      id: props.id,
      title: props.title,
      categoryId: props.categoryId,
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
