import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ListPostUseCase } from '@/core/app/use-cases/post/list-post-use-case'
import { PostRepositoryPrisma } from '@/core/infra/repositories/post-repository'
import { prisma } from '@/core/package/prisma'
import { Edit, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

const postRepository = new PostRepositoryPrisma(prisma)
const listPostUseCase = new ListPostUseCase(postRepository)

export default async function Page() {
  const posts = await listPostUseCase.execute({
    q: '',
    page: 1,
    limit: 10
  })

  return (
    <>
      <h1 className="mb-4 text-2xl">Postagem/Eventos</h1>
      <hr />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead>Festa/Evento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link href={`/dashboard/posts/${item.id}/edit`}>
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Trash className="h-5 w-5" />
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
