import { Container } from '@/components/common/container'
import { Fragment } from 'react'

export default function Loading() {
  return (
    <div className="space-y-8 bg-neutral-900 pb-8">
      {[0, 1].map((item) => (
        <Fragment key={item}>
          <div className="bg-white py-12">
            <Container>
              <div className="h-32 w-full animate-pulse bg-neutral-400" />
            </Container>
          </div>
          <Container className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="h-96 w-full animate-pulse bg-neutral-400" />
              <div className="h-96 w-full animate-pulse bg-neutral-400" />
              <div className="h-96 w-full animate-pulse bg-neutral-400" />
              <div className="h-96 w-full animate-pulse bg-neutral-400" />
            </div>
          </Container>
        </Fragment>
      ))}
    </div>
  )
}
