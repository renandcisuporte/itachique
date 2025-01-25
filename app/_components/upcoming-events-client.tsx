'use client'

import { UpcomingEventProps } from '@/core/domain/entity/upcoming-event-entity'
import Image from 'next/image'
import { useState } from 'react'
// import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { A11y, EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Container } from './common/container'

// SwiperCore.use([EffectFade, A11y, Navigation, Autoplay, Thumbs, FreeMode])
export function UpcomingEventsClient({
  events
}: {
  events: UpcomingEventProps[]
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()

  if (!events) return null

  const sortEvents = events.sort((a, b) => {
    const dateA = new Date(a.date!)
    const dateB = new Date(b.date!)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div
      className="bg-neutral-800 py-4"
      style={{
        marginTop: '0px',
        backgroundImage:
          'url(https://www.pngplay.com/wp-content/uploads/6/Party-Concert-PNG-HD-Quality.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container>
        <h1 className="text-lg font-extrabold uppercase text-[#e4e439] md:text-2xl">
          Próximos Eventos
        </h1>
        <div className="flex gap-2 border-t border-t-[#e4e439] py-4">
          <Swiper
            spaceBetween={0}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            modules={[EffectFade, Thumbs, A11y]}
            className="flex-1 bg-black"
            autoHeight={false}
          >
            {sortEvents.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-[355px] w-full bg-black">
                  <Image
                    src={item.galleryImages!}
                    alt={item.title}
                    width={1000}
                    height={355}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            direction="vertical"
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, A11y]}
            className="block h-[375px] w-56 flex-shrink"
            autoHeight={true}
          >
            {sortEvents.map((item) => (
              <SwiperSlide key={item.id} className="bg-black">
                <div className="flex h-full flex-col justify-center p-4">
                  <strong>{item.title}</strong>
                  <p className="text-xs">Data: {item.date as string}</p>
                  <p className="text-xs">Local: {item.locale}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  )
}
