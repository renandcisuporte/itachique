'use client'

import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import { A11y, Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type AdvertisementProps = {
  link?: string
  images: string[]
}

export function AdvertisementClient({ images, link }: AdvertisementProps) {
  if (!images) return null

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
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
      modules={[EffectFade, A11y, Autoplay]}
      className="my-8 max-h-[228px] w-full"
    >
      {sortImages.map((item: string) => (
        <SwiperSlide key={item}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_IMG}${item}`}
            loading="lazy"
            alt={item}
            width={1200}
            height={228}
            className="mx-auto h-auto w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
