import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 justify-between gap-10 md:grid-cols-2">
      {children}
    </div>
  )
}

function CardItem({
  id,
  title,
  children
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <Link href={`/galeria/${slug(title)}/${id}/0/0`} className="bg-black pb-6">
      {children}
    </Link>
  )
}

function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      {src && (
        <Image
          src={src}
          alt={alt}
          width={500}
          height={132}
          className="h-auto w-full max-w-[500px]"
          loading="lazy"
        />
      )}
    </>
  )
}

function CardTitle({ ...rest }) {
  return (
    <h3
      className={cn(
        'web px-4 text-lg font-extrabold uppercase text-[#e4e439] md:text-2xl',
        mrEavesXLModOTBold.className
      )}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}
      {...rest}
    />
  )
}

function CardDescription({ ...rest }) {
  return <p className="px-4 text-sm font-light" {...rest} />
}

export const CardEvent = {
  content: Card,
  item: CardItem,
  image: CardImage,
  title: CardTitle,
  description: CardDescription
}
