'use client'

import { SubmitButton } from '@/components/submit-button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { Trash, Undo, Upload } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { galleryActionUpload } from '../../actions'
import { PageClientDelete } from './page-client-delete'

type Props = {
  errors?: any
  message?: any
  data?: any
}

type GalleryProps = {
  url: string
  image: string
  id?: string
  postId?: string
}

export function PageClient({ post }: { post: PostProps }) {
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState<Props>()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [gallery, setGallery] = useState<GalleryProps[]>([])

  const searchParams = useSearchParams()
  const modalDelete = searchParams.get('modal_delete')

  // funcao para enviar os arquivos para o backend
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage({
        message: 'Selecione pelo menos um arquivo para fazer upload.'
      })
      return
    }

    const formData = new FormData()
    formData.append('postId', post.id || '')
    Array.from(selectedFiles).forEach((file) => formData.append('files', file))

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const data = await response.json()
      setMessage({
        message: 'Upload realizado com sucesso.',
        data: data?.data
      })
      revalidatePath(`/dashboard/posts/[form]/upload`)
      setLoading(false)
      return
    }

    setMessage({
      message: 'Erro ao fazer upload.',
      errors: await response.json()
    })
    setLoading(false)
  }

  // Função para lidar com o evento de seleção de arquivos
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files
    if (!fileList) return

    const filesArray = Array.from(fileList)
    const uniqueFiles = filesArray.filter(
      (file) => !selectedFiles.some((f) => f.name === file.name)
    )

    setSelectedFiles((prev) => [...prev, ...uniqueFiles])
  }

  // Função deve tentar remover a imagem da galeria e da galeria do post
  // Função para remover imagem da galeria
  function handleRemoveImage(image: string) {
    if (!confirm('Deseja remover a imagem?')) return
    setSelectedFiles((prev) => prev.filter((file) => file.name !== image))
    setGallery((prev) => prev.filter((item) => item.image !== image))
  }

  const [state, formAction] = useFormState(galleryActionUpload, {})

  useEffect(() => {
    // Atualizar a galeria com URLs temporários
    selectedFiles.forEach((file) => {
      const url = URL.createObjectURL(file)

      setGallery((prevGallery) => {
        const existingImage = prevGallery.some(
          (item) => item.image === file.name
        )
        if (!existingImage) {
          return [
            ...prevGallery,
            {
              id: url,
              image: file.name,
              url
            }
          ]
        }

        return prevGallery
      })

      return () => URL.revokeObjectURL(url) // Limpar URL temporário
    })
  }, [selectedFiles])

  useEffect(() => {
    if (!post?.galleryImage) return
    setGallery(post?.galleryImage)
  }, [post?.galleryImage])

  return (
    <>
      {modalDelete && <PageClientDelete isOpen />}

      {message?.message && (
        <Alert className="mb-4" variant="default">
          <AlertDescription>{message.message}</AlertDescription>
        </Alert>
      )}

      <form
        id="upload-form"
        // onSubmit={handleSubmit}
        action={formAction}
        className="mx-auto flex max-w-5xl flex-row space-x-2"
      >
        <div
          className={`relative flex h-20 flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 ${loading && 'pointer-events-none opacity-50'}`}
        >
          <input
            type="text"
            name="post_id"
            defaultValue={post.id}
            className="text-black"
            hidden
          />
          <Upload className="h-16 w-16" />
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer border p-2 opacity-0"
            onChange={handleFileChange}
            disabled={loading}
            name="files"
          />
        </div>
        <Link
          href={`/dashboard/posts/${post.id}/edit`}
          className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-4"
        >
          <Undo /> <span>Voltar</span>
        </Link>
        <SubmitButton type="submit" className="h-20">
          Enviar
        </SubmitButton>
      </form>
      {gallery && gallery?.length > 0 && (
        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-4 items-center justify-center gap-4">
          {gallery?.map((item) => (
            <li key={item.id} className="relative h-48">
              <Image
                fill
                src={item.url}
                alt={post.title}
                className="z-0 object-cover"
              />
              <div className="absolute right-2 top-2 z-10 cursor-pointer">
                <Button
                  type="button"
                  variant={'destructive'}
                  className="h-6 w-6 fill-white p-4 text-white"
                  asChild
                >
                  {item.id?.includes('blob') ? (
                    <span onClick={() => handleRemoveImage(item.image!)}>
                      <Trash />
                    </span>
                  ) : (
                    <Link
                      href={`/dashboard/posts/${post.id}/upload/?modal_delete=true&image_id=${item.id}`}
                    >
                      <Trash />
                    </Link>
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
