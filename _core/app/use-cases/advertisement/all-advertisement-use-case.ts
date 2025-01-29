import {
  Advertisement,
  AdvertisementProps
} from '@/core/domain/entity/advertisement-entity'
import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'

export class AllAdvertisementUseCase {
  constructor(private readonly repository: AdvertisementGateway) {}

  async execute(): Promise<{ data: AdvertisementProps[] }> {
    const data = await this.repository.allAdvertisement()
    return { data: data.map(this.present) }
  }

  private present(props: Advertisement): AdvertisementProps {
    return {
      id: props.id,
      title: props.title,
      galleryImagesJson: props.galleryImagesJson,
      link: props.link,
      position: props.position,
      description: props.description,
      isActive: props.isActive,
      validatedAt: props.validatedAt,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt
    }
  }
}
