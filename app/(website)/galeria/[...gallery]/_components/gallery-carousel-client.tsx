'use client'

import { slug } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
export default function GalleryCarouselClient({ posts }: { posts: any[] }) {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={4}
      navigation
      pagination={{
        clickable: true,
        el: 'pagination',
        type: 'bullets',
        bulletClass:
          'py-0.5 cursor-pointer bg-gray-500 flex-1 shrink w-full h-0.5 transition hover:bg-teal-400 transition ease-in-out shadow-lg',
        bulletActiveClass: '!bg-amber-300 active'
      }}
    >
      {posts
        .sort(() => Math.random() - 0.5)
        .map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={`/galeria/${slug(item.postTitle)}/${item.id}/0/0`}
              className="block min-h-72 bg-black pb-6"
            >
              <Image
                src={item.postCoverImage}
                loading="lazy"
                alt={item.postTitle}
                width={200}
                height={200}
                className="h-32 w-full object-cover"
              />
              <p className="p-2 text-center text-sm uppercase text-[#e4e439]">
                {item.postTitle}
              </p>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
