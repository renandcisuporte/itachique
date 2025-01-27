'use client'

import { Container } from '@/components/common/container'
import { WebSiteGalleryProps } from '@/core/domain/entity/website-entity'
import { cn } from '@/lib/utils'
import { Pause, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  id: string
  galleryImage: WebSiteGalleryProps[]
  postTitle: string
  page: number
  photo: number
}

const chunkSize = 12
const autoPlayInterval = 4000

// Função auxiliar para dividir a galeria em chunks
const chunkGallery = (gallery: WebSiteGalleryProps[], size: number) => {
  const chunks: WebSiteGalleryProps[][] = []
  for (let i = 0; i < gallery.length; i += size) {
    chunks.push(gallery.slice(i, i + size))
  }
  return chunks
}

export function Gallery({
  id,
  galleryImage,
  postTitle,
  page = 0,
  photo = 0
}: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [currentPage, setCurrentPage] = useState(page)
  const [currentPhoto, setCurrentPhoto] = useState(photo)
  const [autoPlay, setAutoPlay] = useState(params.get('play') === 'true')

  const chunkedArray = chunkGallery(galleryImage, chunkSize)

  if (!chunkedArray.length) return null

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev)
    router.push(
      `/galeria/${postTitle}/${id}/${currentPage}/${currentPhoto}?play=${!autoPlay}`,
      { scroll: false }
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!autoPlay) return

    const isLastPhoto =
      currentPage === chunkedArray.length - 1 &&
      currentPhoto === chunkedArray[currentPage].length - 1

    const timer = setInterval(() => {
      setCurrentPhoto((prevPhoto) => {
        const nextPhoto = prevPhoto + 1
        if (nextPhoto >= chunkedArray[currentPage].length) {
          setCurrentPage((prevPage) => (prevPage + 1) % chunkedArray.length)
          return 0
        }
        return nextPhoto
      })
    }, autoPlayInterval)

    if (isLastPhoto) {
      setCurrentPage(0)
      setCurrentPhoto(0)
      router.push(`/galeria/${postTitle}/${id}/0/0?play=${autoPlay}`, {
        scroll: false
      })
    }

    return () => clearInterval(timer)
  }, [autoPlay, currentPage, currentPhoto, chunkedArray, postTitle, id, router])

  return (
    <>
      <div className="flex flex-row space-x-2">
        {!autoPlay ? (
          <Play
            className="w-6 cursor-pointer text-white"
            onClick={toggleAutoPlay}
          />
        ) : (
          <Pause
            className="w-6 cursor-pointer text-white"
            onClick={toggleAutoPlay}
          />
        )}
      </div>
      <div className="relative mx-auto h-[332px] w-full max-w-[800px] bg-black md:h-[532px]">
        <Image
          src={chunkedArray?.[currentPage]?.[currentPhoto]?.url || ''}
          alt={chunkedArray?.[currentPage]?.[currentPhoto]?.image || ''}
          loading="lazy"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-2 overflow-x-auto">
        {chunkedArray?.[currentPage]?.map((item, index) => (
          <Link
            key={item.id}
            href={`/galeria/${postTitle}/${id}/${currentPage}/${index}`}
            scroll={false}
            className={cn(
              'relative h-16 w-16 shrink-0 opacity-50',
              index === currentPhoto && 'opacity-100'
            )}
          >
            <Image
              src={item.url}
              alt={item.image}
              fill
              loading="lazy"
              className="object-cover"
            />
          </Link>
        ))}
      </div>
      <Container>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          {chunkedArray.map((_, index) => (
            <Link
              key={index}
              scroll={false}
              href={`/galeria/${postTitle}/${id}/${index}/0`}
              className={cn(
                'rounded-md bg-neutral-700 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm',
                currentPage === index && 'bg-[#e4e439] text-neutral-800'
              )}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
