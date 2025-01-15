import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { SwiperClient } from './common/swiper-client'

interface RootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function Root({ ...rest }: RootProps) {
  return <div {...rest} />
}

function Random({ ...rest }: RootProps) {
  return <></>
}

async function InLogo() {
  await new Promise((resolve) => setTimeout(resolve, 2500))
  const result: any[] = []
  return <SwiperClient data={result} />
}

function Loading() {
  return <div className="h-28 w-[475px] animate-pulse bg-slate-300" />
}

export const Advertisements = {
  root: Root,
  inLogo: InLogo,
  loading: Loading,
  random: Random
}
