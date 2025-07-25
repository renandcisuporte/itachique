import { Container } from '@/components/common/container'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn } from '@/libs/utils'
import Link from 'next/link'

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
          Galeria não encontrada!
        </h1>
        <p>Parece que você não digitou algo certo.</p>
        <Link href="/">Clique aqui para tentar novamente</Link>
      </Container>
    </div>
  )
}
