import { cn } from '@/lib/utils'
import Link from 'next/link'

type PaginationProps = {
  q?: string
  order?: string
  total: number
  page: number
  pathname: string
}

export function Pagination({
  pathname,
  total,
  page,
  q,
  order
}: PaginationProps) {
  const visibleLinks = 5 // Número máximo de links visíveis
  const half = Math.floor(visibleLinks / 2)

  // Calcula o início e o fim da janela
  const start = Math.max(1, page - half)
  const end = Math.min(total, page + half)

  // Ajusta para sempre mostrar `visibleLinks` quando possível
  const adjustedStart = Math.max(1, Math.min(start, total - visibleLinks + 1))
  const adjustedEnd = Math.min(total, adjustedStart + visibleLinks - 1)

  return (
    <div className="mt-5 flex flex-row flex-wrap items-center justify-center gap-2">
      {/* Link para a página anterior */}
      {page > 1 && (
        <Link
          href={{ pathname, query: { page: page - 1, q, order } }}
          className="rounded-md bg-neutral-700 px-4 py-2"
        >
          &laquo; Anterior
        </Link>
      )}

      {/* Links visíveis */}
      {Array.from({ length: adjustedEnd - adjustedStart + 1 }).map(
        (_, index) => {
          const pageIndex = adjustedStart + index
          const isActive = page === pageIndex && 'bg-[#e4e439] text-neutral-800'
          return (
            <Link
              key={pageIndex}
              href={{ pathname, query: { page: pageIndex, q, order } }}
              className={cn('rounded-md bg-neutral-700 px-4 py-2', isActive)}
            >
              {pageIndex}
            </Link>
          )
        }
      )}

      {/* Link para a próxima página */}
      {page < total && (
        <Link
          href={{ pathname, query: { page: page + 1, q, order } }}
          className="rounded-md bg-neutral-700 px-4 py-2"
        >
          Próxima &raquo;
        </Link>
      )}
    </div>
  )
}
