'use client'

import { lg } from '@/config/index'
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
      <Image
        src={chunkedArray?.[page]?.[photo]?.url}
        alt={chunkedArray?.[page]?.[photo]?.image}
        width={lg.width}
        height={lg.height}
      />

      {chunkedArray?.[page] && (
        <div className="flex flex-row items-center justify-center gap-2">
          {chunkedArray?.[page]?.map((item) => (
            <Link
              key={item.id}
              href={`/galeria/${postTitle}/${id}/${page}/${chunkedArray?.[page]?.indexOf(item)}`}
              scroll={false}
            >
              <Image src={item.url} alt={item.image} width={75} height={75} />
            </Link>
          ))}
        </div>
      )}

      {chunkedArray.length > 0 && (
        <div className="flex flex-row items-center justify-center gap-2">
          {chunkedArray.map((_, index) => {
            const isActive = page === index && 'bg-[#e4e439] text-neutral-800'
            return (
              <Link
                key={index}
                scroll={false}
                href={`/galeria/${postTitle}/${id}/${index}/0`}
                className={cn('rounded-md bg-neutral-700 px-4 py-2', isActive)}
              >
                {index + 1}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
