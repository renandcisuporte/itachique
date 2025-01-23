'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'

import Image from 'next/image'

export function SwiperClient({ data }: { data: any[] }) {
  return (
    <Swiper
      autoplay={{ delay: 5500 }}
      className="h-28 w-[475px]"
      loop
      effect="fade"
      modules={[EffectFade, Autoplay]}
    >
      {data.map((rws) =>
        rws.cover_image.map((item: any) => (
          <SwiperSlide key={item} className="relative">
            <Image
              src={item}
              alt={String(rws.description)}
              fill
              className="object-contain"
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  )
}
