import { cn } from '@/libs/utils'
import Link from 'next/link'

type PaginationProps = {
  q?: string
  order?: string
  page: number
  perPage: number
  totalPage: number
  pathname: string
}

export function Pagination({
  pathname,
  perPage,
  totalPage,
  page,
  q,
  order
}: PaginationProps) {
  const visibleLinks = 5 // Número máximo de links visíveis
  const half = Math.floor(visibleLinks / 2)
  const totalPages = Math.ceil(totalPage / perPage)

  // Calcula o início e o fim da janela
  let start = Math.max(1, page - half)
  let end = Math.min(totalPages, page + half)

  // Ajusta para garantir que sempre mostre o número correto de links
  if (end - start + 1 < visibleLinks) {
    if (start === 1) {
      end = Math.min(totalPages, start + visibleLinks - 1)
    } else if (end === totalPage) {
      start = Math.max(1, end - visibleLinks + 1)
    }
  }

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
      {Array.from({ length: end - start + 1 }).map((_, index) => {
        const pageIndex = start + index
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
      })}

      {/* Link para a próxima página */}
      {page < totalPages && (
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
