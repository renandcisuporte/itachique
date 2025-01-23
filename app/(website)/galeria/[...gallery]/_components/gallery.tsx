'use client'

import { Container } from '@/components/common/container'
import { WebSiteGalleryProps } from '@/core/domain/entity/website-entity'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  galleryImage: WebSiteGalleryProps[]
  postTitle: string
  id: string
  page: number
  photo: number
}

export function Gallery({ galleryImage, postTitle, id, page, photo }: Props) {
  const chunkSite = 12
  const chunkedArray: WebSiteGalleryProps[][] = []
  for (let i = 0; i < galleryImage.length; i += chunkSite) {
    chunkedArray.push(galleryImage.slice(i, i + chunkSite))
  }

  if (!chunkedArray) return null

  return (
    <>
      <div className="relative mx-auto h-[332px] w-full max-w-[800px] bg-black md:h-[532px]">
        <Image
          src={chunkedArray?.[page]?.[photo]?.url}
          alt={chunkedArray?.[page]?.[photo]?.image}
          loading="lazy"
          fill
          className="object-contain"
        />
      </div>
      {chunkedArray?.[page] && (
        <div className="flex flex-row items-center justify-center gap-2 overflow-x-auto">
          {chunkedArray?.[page]?.map((item) => {
            const isActive =
              chunkedArray?.[page]?.indexOf(item) === photo && 'opacity-100'
            return (
              <Link
                key={item.id}
                href={`/galeria/${postTitle}/${id}/${page}/${chunkedArray?.[page]?.indexOf(item)}`}
                scroll={false}
                className={cn(
                  'relative h-16 w-16 shrink-0 opacity-50',
                  isActive
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
            )
          })}
        </div>
      )}

      {chunkedArray.length > 0 && (
        <Container>
          <div className="flex flex-row flex-wrap items-center justify-center gap-2">
            {chunkedArray.map((_, index) => {
              const isActive = page === index && 'bg-[#e4e439] text-neutral-800'
              return (
                <Link
                  key={index}
                  scroll={false}
                  href={`/galeria/${postTitle}/${id}/${index}/0`}
                  className={cn(
                    'rounded-md bg-neutral-700 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm',
                    isActive
                  )}
                >
                  {index + 1}
                </Link>
              )
            })}
          </div>
        </Container>
      )}
    </>
  )
}
