'use client'

import { Container } from '@/components/common/container'
import { useDownload } from '@/contexts/download-context'
import { WebSiteGalleryProps } from '@/core/domain/entity/website-entity'
import { chunkGallery, cn } from '@/libs/utils'
import { Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  id: string
  galleryImage: WebSiteGalleryProps[]
  postTitle: string
  page: number
  photo: number
}

const chunkSize = 12
const autoPlayInterval = 4000

function AutoPlay({ play, onClick }: { play: boolean; onClick: () => void }) {
  return (
    <div
      className="flex cursor-pointer flex-row items-center space-x-2 text-xs"
      onClick={onClick}
    >
      {!play ? (
        <Play className="w-4 text-white" />
      ) : (
        <Pause className="w-4 text-white" />
      )}
      <span>Visualização automática</span>
    </div>
  )
}

export function Gallery({
  id,
  galleryImage,
  postTitle,
  page = 0,
  photo = 0
}: Props) {
  const { setDownload } = useDownload()

  const containerRef = useRef<HTMLDivElement>(null) // Referência para capturar eventos de toque

  const [currentPage, setCurrentPage] = useState(page)
  const [currentPhoto, setCurrentPhoto] = useState(photo)
  const [autoPlay, setAutoPlay] = useState(false)

  const chunkedArray = chunkGallery<WebSiteGalleryProps>(
    galleryImage,
    chunkSize
  )

  if (!chunkedArray.length) return null

  function toggleAutoPlay() {
    setAutoPlay((prev) => !prev)
    push(
      `/galeria/${postTitle}/${id}/${currentPage}/${currentPhoto}?play=${!autoPlay}`
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const push = useCallback(
    (url: string) => window.history.pushState(null, '', url),
    []
  )

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
      push(
        `/galeria/${postTitle}/${id}/${currentPage}/${currentPhoto}?play=${autoPlay}`
      )
    }, autoPlayInterval)

    if (isLastPhoto) {
      push(`/galeria/${postTitle}/${id}/0/0?play=${autoPlay}`)
      setCurrentPage(0)
      setCurrentPhoto(0)
    }

    return () => clearInterval(timer)
  }, [autoPlay, currentPage, currentPhoto, chunkedArray, postTitle, id, push])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX = 0
    let endX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      const deltaX = startX - endX

      if (deltaX > 70) {
        // ⬅️ Deslizar para esquerda (próxima foto)
        setCurrentPhoto((prev) => {
          const nextPhoto = prev + 1
          if (nextPhoto >= chunkedArray[currentPage].length) {
            setCurrentPage((prevPage) => (prevPage + 1) % chunkedArray.length)
            return 0
          }
          return nextPhoto
        })
      } else if (deltaX < 70) {
        // ➡️ Deslizar para direita (foto anterior)
        setCurrentPhoto((prev) => {
          if (prev === 0) {
            setCurrentPage((prevPage) =>
              prevPage === 0 ? chunkedArray.length - 1 : prevPage - 1
            )
            return chunkedArray[currentPage].length - 1
          }
          return prev - 1
        })
      }
    }

    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchmove', handleTouchMove)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentPage, chunkedArray])

  setDownload(chunkedArray?.[currentPage]?.[currentPhoto]?.url)

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <AutoPlay play={autoPlay} onClick={toggleAutoPlay} />
        <div
          ref={containerRef}
          className="relative mx-auto h-[332px] w-full max-w-[800px] bg-black md:h-[532px]"
        >
          {chunkedArray?.[currentPage]?.[currentPhoto]?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMG}${chunkedArray?.[currentPage]?.[currentPhoto]?.url}`}
              alt={chunkedArray?.[currentPage]?.[currentPhoto]?.image || ''}
              loading="lazy"
              fill
              className="z-0 object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={100}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 overflow-x-auto md:justify-center">
        {chunkedArray?.[currentPage]?.map((item, index) => (
          <span
            key={item.id}
            onClick={() => {
              push(`/galeria/${postTitle}/${id}/${currentPage}/${index}`)
              setCurrentPhoto(index)
            }}
            className={cn(
              'relative h-16 w-16 shrink-0 cursor-pointer opacity-50',
              index === currentPhoto && 'opacity-100'
            )}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMG}${item.url}`}
              alt={item.image}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={55}
            />
          </span>
        ))}
      </div>
      <Container>
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          {chunkedArray.map((_, index) => (
            <span
              key={index}
              onClick={() => {
                push(`/galeria/${postTitle}/${id}/${index}/0`)
                setCurrentPage(index)
                setCurrentPhoto(0)
              }}
              className={cn(
                'cursor-pointer rounded-md bg-neutral-700 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm',
                currentPage === index && 'bg-[#e4e439] text-neutral-800'
              )}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </Container>
    </>
  )
}
