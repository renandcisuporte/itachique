import {
  Advertisement,
  AdvertisementProps
} from '@/core/domain/entity/advertisement-entity'
import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'

export class UpdateAdvertisementUseCase {
  constructor(private readonly advertisementRepository: AdvertisementGateway) {}

  async execute(
    input: AdvertisementProps
  ): Promise<{ data: AdvertisementProps }> {
    const output = Advertisement.with(input)
    const result = await this.advertisementRepository.update(output.id!, output)
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
