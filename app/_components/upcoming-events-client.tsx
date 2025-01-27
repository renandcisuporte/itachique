'use client'

import Image from 'next/image'
import { useState } from 'react'
import { UpcomingEventProps } from '../../_core/domain/entity/upcoming-event-entity'
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

  // const sortEvents = events.sort((a, b) => {
  //   const dateA = new Date(a.date!)
  //   const dateB = new Date(b.date!)
  //   return dateB.getTime() - dateA.getTime()
  // })

  return (
    <div
      className="bg-neutral-800 py-4"
      style={{
        marginTop: '0px'
        // backgroundImage:
        //   'url(https://www.pngplay.com/wp-content/uploads/6/Party-Concert-PNG-HD-Quality.png)',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center'
      }}
    >
      <Container>
        <h1 className="text-lg font-extrabold uppercase text-[#e4e439] md:text-2xl">
          Próximos Eventos
        </h1>
        <div className="block border-t border-t-[#e4e439] py-4 md:flex md:flex-row md:space-x-2">
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
                    src={item.galleryImages!}
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
            direction="vertical"
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, A11y]}
            className="h-[355px] w-full flex-shrink md:w-56"
            autoHeight={false}
          >
            {events.map((item) => (
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
