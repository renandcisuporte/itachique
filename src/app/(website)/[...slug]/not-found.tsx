import { Container } from '@/components/common/container'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { mrEavesXLModOTBold } from '../../../font/fonts'

export default function NotFound() {
  return (
    <div className="space-y-8 bg-neutral-900 py-8 text-center">
      <Container className="space-y-8">
        <h1
          className={cn(
            'p-3 text-3xl font-bold uppercase text-[#e4e439]',
            mrEavesXLModOTBold.className
          )}
        >
          Ops...!
        </h1>
        <p>Parece que você não existe eventos aqui...</p>
        <Link href="/">Clique aqui para tentar novamente</Link>
      </Container>
    </div>
  )
}
