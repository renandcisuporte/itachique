import {
  Advertisement,
  AdvertisementProps
} from '@/core/domain/entity/advertisement-entity'
import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'
import { ghostArray } from './constants'

export class AllAdvertisementUseCase {
  constructor(private readonly repository: AdvertisementGateway) {}

  async execute(): Promise<{ data: AdvertisementProps[] }> {
    const result = await this.repository.allAdvertisement()
    const resultArray = result.map(this.present)

    return {
      data: ghostArray.map((item, index) => ({
        ...item,
        ...resultArray[index]
      }))
    }
  }

  private present(props: Advertisement): AdvertisementProps {
    return {
      id: props?.id,
      title: props?.title,
      galleryImagesJson: props?.galleryImagesJson,
      link: props?.link,
      position: props?.position,
      description: props?.description,
      isActive: props?.isActive,
      validatedAt: props?.validatedAt,
      createdAt: props?.createdAt,
      updatedAt: props?.updatedAt,
      deletedAt: props?.deletedAt
    }
  }
}
