'use client'

import { slug } from '@/libs/utils'
import Image from 'next/image'
import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const id = new Date().getTime()
  if (!posts) return null

  return (
    <div className="relative">
      <ChevronLeft
        className={`chrevron-button-prev-${id} absolute -top-7 right-12 z-50 h-5 w-5 cursor-pointer text-[#e4e439] md:-top-10 md:h-8 md:w-8`}
      />
      <ChevronRight
        className={`chrevron-button-next-${id} absolute -top-7 right-0 z-50 h-5 w-5 cursor-pointer text-[#e4e439] md:-top-10 md:h-8 md:w-8`}
      />

      <Swiper
        loop={true}
        spaceBetween={12}
        slidesPerView={perView}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation={{
          nextEl: `.chrevron-button-next-${id}`,
          prevEl: `.chrevron-button-prev-${id}`
        }}
        pagination={false}
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
