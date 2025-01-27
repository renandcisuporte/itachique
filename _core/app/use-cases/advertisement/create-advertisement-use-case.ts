import {
  Advertisement,
  AdvertisementProps
} from '@/core/domain/entity/advertisement-entity'
import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'

export class CreateAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementGateway) {}

  async execute(
    input: AdvertisementProps
  ): Promise<{ data: AdvertisementProps }> {
    const output = Advertisement.create(input)
    const result = await this.advertisementRepository.create(output)
    return { data: this.present(result) }
  }

  private present(props: Advertisement): AdvertisementProps {
    return {
      id: props.id,
      title: props.title,
      galleryImagesJson: props.galleryImagesJson,
      position: props.position,
      description: props.description,
      link: props.link,
      isActive: props.isActive,
      validatedAt: props.validatedAt,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt
    }
  }
}
