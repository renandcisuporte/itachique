'use client'

import { slug } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function GalleryCarouselClient({
  posts,
  perView = 5
}: {
  posts: any[]
  perView: number
}) {
  if (!posts) return null

  return (
    <div>
      <Swiper
        spaceBetween={12}
        slidesPerView={perView}
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{
          clickable: true,
          el: 'pagination',
          type: 'bullets',
          bulletClass:
            'py-0.5 cursor-pointer bg-gray-500 flex-1 shrink w-full h-0.5 transition hover:bg-teal-400 transition ease-in-out shadow-lg',
          bulletActiveClass: '!bg-amber-300 active'
        }}
      >
        {posts.map((item, index) => (
          <SwiperSlide
            key={`${item.id}-${index}`}
            className="min-h-72 bg-black pb-6"
          >
            <Link
              href={`/galeria/${slug(item.postTitle)}/${item.id}/0/0`}
              className="block"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMG}${item.postCoverImage}`}
                loading="lazy"
                alt={'Veja mais'}
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
    </div>
  )
}
