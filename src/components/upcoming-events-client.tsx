'use client'

import { UpcomingEventProps } from '@/core/domain/entity/upcoming-event-entity'
import Image from 'next/image'
import { useEffect, useState } from 'react'
// import SwiperCore from 'swiper'
import { isMobile } from '@/libs/utils'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import {
  A11y,
  Autoplay,
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs
} from 'swiper/modules'
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
          style={{
            '--swiper-navigation-color': '#e4e439',
            '--swiper-pagination-color': '#e4e439'
          }}
          effect="fade"
          spaceBetween={0}
          navigation={true}
          pagination={{ type: 'progressbar' }}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          modules={[EffectFade, Thumbs, A11y, Navigation, Pagination, Autoplay]}
          autoHeight={false}
          className="h-36 w-full md:h-[355px]"
          loop={true}
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
          style={{
            '--swiper-navigation-color': '#e4e439',
            '--swiper-pagination-color': '#e4e439'
          }}
          freeMode={true}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          direction={direction}
          slidesPerView={slides}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, A11y]}
          className="w-full flex-shrink md:h-[355px] md:w-56"
          autoHeight={false}
          navigation={false}
        >
          {events.map((item) => (
            <SwiperSlide key={item.id} className="bg-black">
              <div className="flex h-full cursor-pointer flex-col justify-center p-4">
                <strong>{item.title}</strong>
                <p className="text-xs">
                  Data:{' '}
                  {
                    new Date(item.date!)
                      .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('/')!
                  }
                </p>
                <p className="text-xs">Local: {item.locale}</p>
              </div>
            </SwiperSlide>
          ))}
          {/* <div className="swiper-button-prev !top-5 rotate-90" />
          <div className="swiper-button-next !bottom-5 rotate-90" /> */}
        </Swiper>
      </div>
    </div>
  )
}
