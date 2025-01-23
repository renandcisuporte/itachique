import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { postAction } from '@/core/main/config/dependencies'
import { Edit, Image as ImageLucide, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageClientDelete } from './[form]/_components/page-client-delete'
import { FormSearch } from './_components/form-search'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

type T = {
  [key: string]: string | string[] | undefined
}

type Props = {
  params: T
  searchParams: T
}

export default async function Page({ searchParams }: Props) {
  const {
    page = '1',
    limit = '25',
    q = '',
    order = '[date_desc]',
    modal_delete = 'false',
    post_id = ''
  } = searchParams
  const posts = await postAction.list({
    page: page.toString(),
    order: order.toString(),
    limit: limit.toString(),
    q: q.toString()
  })

  return (
    <>
      {modal_delete === 'open' && <PageClientDelete isOpen={true} />}
      <div className="mb-4 flex items-center justify-between space-x-2">
        <h1 className="text-2xl">Postagem/Eventos</h1>
        <FormSearch />
      </div>
      <hr />
      <Table>
        <TableCaption>
          {posts.total > 0 && (
            <Pagination
              q={q.toString()}
              order={order.toString()}
              pathname={'/dashboard/posts'}
              total={posts.total}
              page={+page}
            />
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={1}>#</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead>Festa/Evento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[1%]">
                <Image
                  src={item.coverImage!}
                  alt={item.title}
                  loading="lazy"
                  width={75}
                  height={75}
                />
              </TableCell>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link href={`/dashboard/posts/${item.id}/upload`}>
                    <ImageLucide className="h-5 w-5" />
                  </Link>
                  <Link href={`/dashboard/posts/${item.id}/edit`}>
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/dashboard/posts/?modal_delete=open&post_id=${item.id}`}
                  >
                    <Trash className="h-5 w-5" />
                  </Link>
                </span>
              </TableCell>
              <TableCell className="w-[1%] whitespace-nowrap text-center">
                {item.date as string}
              </TableCell>
              <TableCell>{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
