'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { UpcomingEventProps } from '../../_core/domain/entity/upcoming-event-entity'
// import SwiperCore from 'swiper'
import { isMobile } from '@/lib/utils'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { A11y, EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

export function UpcomingEventsClient({
  events,
  direction = 'vertical',
  slides = 3
}: {
  events: UpcomingEventProps[]
  direction?: 'horizontal' | 'vertical'
  slides?: number
}) {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()

  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  if (isMobileDevice) {
    slides = 1
    direction = 'horizontal'
  }

  if (!events) return null

  return (
    <div className="mb-8 bg-neutral-800">
      <h1 className="p-4 text-lg font-extrabold uppercase text-[#e4e439] md:text-2xl">
        Próximos Eventos
      </h1>
      <div className="block border-t border-t-[#e4e439] md:flex md:flex-row md:space-x-2">
        <Swiper
          spaceBetween={0}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          modules={[EffectFade, Thumbs, A11y]}
          autoHeight={false}
          className="h-36 w-full md:h-[355px]"
        >
          {events.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-36 bg-black md:h-[355px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_IMG}${item.galleryImages!}`}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          direction={direction}
          slidesPerView={slides}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, A11y]}
          className="w-full flex-shrink md:h-[355px] md:w-56"
          autoHeight={false}
        >
          {events.map((item) => (
            <SwiperSlide key={item.id} className="bg-black">
              <div className="flex h-full flex-col justify-center p-4">
                <strong>{item.title}</strong>
                <p className="text-xs">Data: {item.dateISO}</p>
                <p className="text-xs">Local: {item.locale}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
