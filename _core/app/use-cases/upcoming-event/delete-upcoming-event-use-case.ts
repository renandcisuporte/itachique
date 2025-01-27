import { UpcomingEventGateway } from '@/core/domain/gateway/upcoming-event-gateway'
import { unlink } from 'fs/promises'

export class DeleteUpcomingEventUseCase {
  constructor(private readonly upcomingEventRepository: UpcomingEventGateway) {}

  async execute(id: string): Promise<{ data: [] }> {
    const result = await this.upcomingEventRepository.find(id)

    if (result?.galleryImages) await unlink(`./public/${result?.galleryImages}`)

    await this.upcomingEventRepository.delete(id)
    return { data: [] }
  }
}
