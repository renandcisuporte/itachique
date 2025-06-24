import {
  Advertisement,
  AdvertisementProps
} from '@/core/domain/entity/advertisement-entity'
import { WebSiteGateway } from '@/core/domain/gateway/website-gateway'

export class AllAdvertisementWebSiteUseCase {
  constructor(private readonly repository: WebSiteGateway) {}

  async execute(): Promise<{ data: AdvertisementProps[] }> {
    const input = {
      title: '',
      galleryImages: '["/anuncie-952x135.jpg"]',
      galleryImagesJson: JSON.parse('["/anuncie-952x135.jpg"]'),
      link: '',
      position: 0,
      description: '',
      isActive: false,
      validatedAt: new Date()
    }

    const ghostAds: Advertisement[] = [
      Advertisement.create(input),
      Advertisement.create(input),
      Advertisement.create(input),
      Advertisement.create(input)
    ]

    const data = (await this.repository.allWebSiteAds()).map(this.present)

    const lengthArray =
      ghostAds.length < data.length ? data.length : ghostAds.length

    return {
      data: Array.from({ length: lengthArray }, (_, index) => ({
        ...data[index],
        ...ghostAds[index]
      }))
    }

    // return {
    //   data: ghostAds.map(this.present).map((item, index) => {
    //     return {
    //       ...item,
    //       ...data[index]
    //     }
    //   })
    // }
  }

  private present(props: Advertisement): AdvertisementProps {
    return {
      id: props.id,
      title: props.title,
      galleryImages: props.galleryImages,
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
