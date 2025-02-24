'use client'

import { SubmitButton } from '@/components/submit-button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { CategoryProps } from '@/core/domain/schemas/category-schema'
import { CityProps } from '@/core/domain/schemas/city-schema'
import { LocaleProps } from '@/core/domain/schemas/locale-schema'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { SubCategoryProps } from '@/core/domain/schemas/subcategory-schema'
import { cn } from '@/lib/utils'
import { Undo, Upload, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { savePostAction } from '../actions'

type PageClientProps = {
  post?: PostProps
  locales: LocaleProps[]
  cities: CityProps[]
  categories: CategoryProps[]
  subCategories: SubCategoryProps[]
}

export function PageClient({
  post,
  locales,
  cities,
  categories,
  subCategories
}: PageClientProps) {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const router = useRouter()

  const [citySelected, setCitySelected] = useState({ id: '', city: '' })
  const [localeSelected, setLocaleSelected] = useState({ id: '', name: '' })
  const [categorySelected, setCategorySelected] = useState({ id: '', name: '' })
  const [subCategorySelected, setSubCategorySelected] = useState({
    id: '',
    name: ''
  })

  const [state, formAction] = useFormState(savePostAction, {})

  useEffect(() => {
    if (!post) return
    setCitySelected({ id: post.cityId!, city: post.cityText! })
    setLocaleSelected({ id: post.localeId!, name: post.localeText! })
    setCategorySelected({ id: post.categoryId!, name: post.categoryName! })
    setSubCategorySelected({
      id: post.subCategoryId!,
      name: post.subCategoryName!
    })
  }, [post])

  const errorClass = cn(
    '[&>input]:text-red-500 border-red-300 text-red-500 [&>input:focus-visible]:ring-red-300 [&>input]:border-red-500 [&>label]:text-red-500 [&>small]:text-xs [&>small]:text-red-500'
  )

  return (
    <form className="space-y-4" action={formAction}>
      <input type="hidden" name="id" value={post?.id} />

      {success && (
        <Alert className="cursor-pointer border-lime-100 bg-lime-100 text-lime-900">
          <AlertDescription className="flex items-center justify-between">
            Dados salvo com sucesso!
            <X
              className="ml-2 h-4 w-4"
              onClick={() =>
                router.replace(`/dashboard/posts/${post?.id}/edit`, {
                  scroll: false
                })
              }
            />
          </AlertDescription>
        </Alert>
      )}

      {state?.message && (
        <Alert className="border-lime-100 bg-lime-100 text-lime-900">
          <AlertDescription>{state?.message?.[0]}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Cadastro - Postagem/Eventos</h1>
        <span className="flex items-center justify-between space-x-1">
          <Button asChild variant={'ghost'}>
            <Link href="/dashboard/posts" className="flex items-center gap-2">
              <Undo className="h-4 w-4" /> <span>Voltar</span>
            </Link>
          </Button>
          {post?.id && (
            <Button asChild variant={'ghost'}>
              <Link
                href={`/dashboard/posts/${post?.id}/upload`}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" /> <span>Imagens</span>
              </Link>
            </Button>
          )}
          <SubmitButton>Salvar</SubmitButton>
        </span>
      </div>

      <hr />

      <div className="space-y-4 [&>div>input]:text-[#292929]">
        <div className={cn('w-1/6', state?.errors?.date && errorClass)}>
          <Label htmlFor="date">Data - Evento</Label>
          <Input id="date" type="date" name="date" value={`${post?.date}`} />
          {state?.errors?.date && <small>{state?.errors?.date?.[0]}</small>}
        </div>

        <div className={cn('w-1/2', state?.errors?.title && errorClass)}>
          <Label htmlFor="title">Festa/Evento</Label>
          <Input type="text" id="title" name="title" value={post?.title} />
          {state?.errors?.title && <small>{state?.errors?.title?.[0]}</small>}
        </div>

        {/* categorias */}
        <div className={cn('relative w-1/5')}>
          <input type="hidden" name="categoryId" value={categorySelected?.id} />
          <Label htmlFor="categoryPostId">Categorias</Label>
          <Input
            type="search"
            id="categoryPostId"
            name="categoryPostId"
            placeholder="Pesquise as categorias..."
            value={categorySelected.name}
            onChange={(e) =>
              setCategorySelected({ id: '', name: e.target.value })
            }
            className="peer focus:rounded-b-none"
          />
          <ul className="opacity-1 absolute top-[92%] z-10 h-0 w-full overflow-y-auto rounded-b-lg border-[1px] border-[#333] bg-[#1b1a1a] opacity-0 outline-2 outline-white transition-all duration-500 ease-in-out peer-focus:h-48 peer-focus:opacity-100">
            {categories
              ?.filter((item) => {
                const query = categorySelected.name.toLowerCase()
                return item.name.toLowerCase().includes(query)
              })
              ?.map((item) => (
                <li
                  key={item.id}
                  className="z-10 cursor-pointer p-2 hover:bg-[#1b1010]"
                  onClick={() =>
                    setCategorySelected({ id: item.id!, name: item.name })
                  }
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>

        {/* sub categorias */}
        <div className={cn('relative w-1/5')}>
          <input
            type="hidden"
            name="subCategoryId"
            value={subCategorySelected?.id}
          />
          <Label htmlFor="subCategoryPostId">Sub Categorias</Label>
          <Input
            type="search"
            id="subCategoryPostId"
            name="subCategoryPostId"
            placeholder="Pesquise as subcategorias..."
            value={subCategorySelected.name}
            onChange={(e) =>
              setSubCategorySelected({ id: '', name: e.target.value })
            }
            className="peer focus:rounded-b-none"
          />
          <ul className="opacity-1 absolute top-[92%] z-10 h-0 w-full overflow-y-auto rounded-b-lg border-[1px] border-[#333] bg-[#1b1a1a] opacity-0 outline-2 outline-white transition-all duration-500 ease-in-out peer-focus:h-48 peer-focus:opacity-100">
            {subCategories
              ?.filter((item) => {
                const query = subCategorySelected.name.toLowerCase()
                return item.name.toLowerCase().includes(query)
              })
              ?.map((item) => (
                <li
                  key={item.id}
                  className="z-10 cursor-pointer p-2 hover:bg-[#1b1010]"
                  onClick={() =>
                    setSubCategorySelected({ id: item.id!, name: item.name })
                  }
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>

        {/* local do evento */}
        <div
          className={cn(
            'relative w-2/3',
            state?.errors?.localeId && errorClass
          )}
        >
          <input type="hidden" name="localeId" value={localeSelected.id} />
          <Label htmlFor="localeText">Local Evento</Label>
          <Input
            type="search"
            id="localeText"
            name="localeText"
            placeholder="Ex: Itachique"
            value={localeSelected.name}
            onChange={(e) =>
              setLocaleSelected({ id: '', name: e.target.value })
            }
            className="peer focus:rounded-b-none"
          />
          <ul className="opacity-1 absolute top-[92%] z-10 h-0 w-full overflow-y-auto rounded-b-lg border-[1px] border-[#333] bg-[#1b1a1a] opacity-0 outline-2 outline-white transition-all duration-500 ease-in-out peer-focus:h-48 peer-focus:opacity-100">
            {locales
              .filter((item) => {
                const query = localeSelected.name.toLowerCase()
                return item.name.toLowerCase().includes(query)
              })
              .map((item) => (
                <li
                  key={item.id}
                  className="z-10 cursor-pointer p-2 hover:bg-[#1b1010]"
                  onClick={() =>
                    setLocaleSelected({ id: item.id!, name: item.name })
                  }
                >
                  {item.name}
                </li>
              ))}
          </ul>
          {state?.errors?.localeId && (
            <small>{state?.errors?.localeId?.[0]}</small>
          )}
        </div>

        {/* cidade do evento */}
        <div
          className={cn('relative w-1/4', state?.errors?.cityId && errorClass)}
        >
          <input type="hidden" name="cityId" value={citySelected.id} />
          <Label htmlFor="cityText">Cidade/UF Evento</Label>
          <Input
            type="search"
            id="cityText"
            name="cityText"
            placeholder="Ex: São Paulo/SP"
            value={citySelected.city}
            onChange={(e) => setCitySelected({ id: '', city: e.target.value })}
            className="peer focus:rounded-b-none"
          />
          <ul className="opacity-1 absolute top-[92%] z-10 h-0 w-full overflow-y-auto rounded-b-lg border-[1px] border-[#333] bg-[#1b1a1a] opacity-0 outline-2 outline-white transition-all duration-500 ease-in-out peer-focus:h-48 peer-focus:opacity-100">
            {cities
              .filter((item) => {
                const query = citySelected.city.toLowerCase()
                return item.city.toLowerCase().includes(query)
              })
              .map((item) => (
                <li
                  key={item.id}
                  className="z-10 cursor-pointer p-2 hover:bg-[#1b1010]"
                  onClick={() =>
                    setCitySelected({ id: item.id!, city: item.city })
                  }
                >
                  {item.city}
                </li>
              ))}
          </ul>
          {state?.errors?.cityId && <small>{state?.errors?.cityId?.[0]}</small>}
        </div>

        <div className="flex items-center gap-4">
          {post?.coverImage && (
            <Image
              src={post?.coverImage}
              alt={post?.coverImage}
              width={255}
              height={255}
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <Label htmlFor="cover_image">Imagem de capa</Label>
            <Input type="file" name="coverImage" id="cover_image" />
          </div>
        </div>
      </div>
    </form>
  )
}
