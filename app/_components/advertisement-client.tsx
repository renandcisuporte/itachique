'use client'

import Image from 'next/image'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { A11y, Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type AdvertisementProps = {
  link?: string
  images: string[]
}

// install Swiper modules
SwiperCore.use([EffectFade, A11y, Autoplay])
export function AdvertisementClient({ images, link }: AdvertisementProps) {
  if (!images) return null

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <AdvertisementClient images={images} />
      </a>
    )
  }

  const sortImages = images.sort(() => Math.random() - 0.5)

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      effect="fade"
    >
      {sortImages.map((item: string) => (
        <SwiperSlide key={item}>
          <Image
            src={item}
            loading="lazy"
            alt={item}
            width={1200}
            height={200}
            className="mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
