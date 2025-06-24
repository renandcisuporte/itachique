import {
  Advertisement,
  AdvertisementProps
} from '@/core/domain/entity/advertisement-entity'
import { AdvertisementGateway } from '@/core/domain/gateway/advertisement-gateway'

export class AllAdvertisementUseCase {
  constructor(private readonly repository: AdvertisementGateway) {}

  async execute(): Promise<{ data: AdvertisementProps[] }> {
    const result = await this.repository.allAdvertisement()
    const resultArray = result.map(this.present)

    return {
      data: resultArray
    }

    // const lengthArray =
    //   resultArray.length < ghostArray.length
    //     ? ghostArray.length
    //     : resultArray.length

    // return {
    //   data: Array.from({ length: lengthArray }, (_, index) => ({
    //     ...ghostArray[index],
    //     ...resultArray[index]
    //   }))
    // }
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
