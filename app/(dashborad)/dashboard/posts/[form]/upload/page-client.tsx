'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { Download, Trash, Undo } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PageClientDelete } from './page-client-delete'

type GalleryProps = {
  url: string
  image: string
  id?: string
  postId?: string
}

export function PageClient({ post }: { post: PostProps }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<GalleryProps[]>([])

  const searchParams = useSearchParams()
  const modalDelete = searchParams.get('modal_delete')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedFiles(Array.from(files))
      setUploadProgress(Array(files.length).fill(0)) // Inicializa o progresso
    }
  }

  const handleUpload = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const formData = new FormData()
      formData.append('image', file)
      formData.append('postId', post.id || '')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        const url = result.url
        setUploadedFiles((prev) => {
          const existingImage = prev.some((item) => item.image === file.name)
          if (!existingImage) {
            return [
              ...prev,
              {
                id: url,
                image: file.name,
                url
              }
            ]
          }

          return prev
        })
      }

      // Atualiza o progresso
      setUploadProgress((prev) => {
        const updated = [...prev]
        updated[i] = 100 // Marca como concluído
        return updated
      })
    }
  }

  // Função para remover imagem da galeria
  function handleRemoveImage(image: string) {
    if (!confirm('Deseja remover a imagem?')) return
    setSelectedFiles((prev) => prev.filter((file) => file.name !== image))
    setUploadedFiles((prev) => prev.filter((item) => item.image !== image))
  }

  useEffect(() => {
    // Atualizar a galeria com URLs temporários
    selectedFiles.forEach((file) => {
      const url = URL.createObjectURL(file)

      setUploadedFiles((prevGallery) => {
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
    setUploadedFiles(post?.galleryImage)
  }, [post?.galleryImage])

  return (
    <div>
      {modalDelete && <PageClientDelete isOpen />}
      <div className="mx-auto flex max-w-5xl flex-row space-x-2">
        <input type="text" name="post_id" defaultValue={post.id} hidden />
        <Input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          multiple
        />
        <Button variant="outline" className="text-black" asChild>
          <Link href={`/dashboard/posts/${post.id}/edit`}>
            <Undo /> <span>Voltar</span>
          </Link>
        </Button>
        <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
          Upload
        </Button>
      </div>

      <ul className="mt-4 space-y-1 divide-y-[1px] divide-gray-200">
        {uploadedFiles.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-between space-x-2 py-1"
          >
            <Image
              width={275}
              height={275}
              src={`${process.env.NEXT_PUBLIC_BASE_IMG}${item.url}`}
              alt={post.title}
            />
            <span className="flex-1">{item.image}</span>
            <div className="flex-shrink-0 space-x-2">
              <span>
                {uploadProgress[index] && `${uploadProgress[index]}%`}
              </span>
              {!item.id?.includes('blob') && (
                <Button
                  type="button"
                  variant={'download'}
                  className="h-6 w-6 fill-white p-4 text-white"
                  asChild
                >
                  <Link
                    href={`/api/download/?image=${item.url}`}
                    target="_blank"
                  >
                    <Download />
                  </Link>
                </Button>
              )}

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
    </div>
  )
}
