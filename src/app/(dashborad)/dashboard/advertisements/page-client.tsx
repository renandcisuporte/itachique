'use client'

import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AdvertisementProps } from '@/core/domain/entity/advertisement-entity'
import { cn } from '@/libs/utils'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { deleteAdvertisementAction, saveAdvertisementAction } from './actions'

type Form = {
  data: AdvertisementProps
}

export function PageClientForm({ data }: Form) {
  const { back } = useRouter()
  const [state, formAction] = useFormState(saveAdvertisementAction, {})

  useEffect(() => {
    if (state.success) back()
  }, [state, back])

  const errorClass = cn(
    '[&>input]:text-red-500 border-red-300 text-red-500 [&>input:focus-visible]:ring-red-300 [&>input]:border-red-500 [&>label]:text-red-500 [&>small]:text-xs [&>small]:text-red-500'
  )

  return (
    <Dialog open={true} modal={true}>
      <DialogContent
        className="text-[#616161] [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogClose asChild>
          <CircleX
            onClick={() => back()}
            className="absolute right-4 top-4 z-10 cursor-pointer"
          />
        </DialogClose>
        <DialogHeader className="mb-1">
          <DialogTitle>Cadastrar/Editar</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="flex flex-row flex-wrap">
          <input type="hidden" name="id" value={data?.id} />
          <div
            className={cn(
              'mb-4 w-full [&>input]:text-black',
              state?.errors?.title && errorClass
            )}
          >
            <Label htmlFor="title">Propaganda</Label>
            <Input
              id="title"
              type="text"
              name="title"
              defaultValue={data?.title}
            />
            {state?.errors?.title && <small>{state?.errors?.title?.[0]}</small>}
          </div>
          <div
            className={cn(
              'mb-4 w-full [&>input]:text-black',
              state?.errors?.link && errorClass
            )}
          >
            <Label htmlFor="link">Link propaganda</Label>
            <Input
              id="link"
              type="text"
              name="link"
              defaultValue={data?.link}
            />
            {state?.errors?.link && <small>{state?.errors?.link?.[0]}</small>}
          </div>
          <div
            className={cn(
              'w-1/33 mb-4 mr-6 [&>input]:text-black',
              state?.errors?.position && errorClass
            )}
          >
            <Label htmlFor="position">Posição</Label>
            <Input
              id="position"
              type="text"
              name="position"
              defaultValue={data?.position}
            />
            {state?.errors?.position && (
              <small>{state?.errors?.position?.[0]}</small>
            )}
          </div>
          <div
            className={cn(
              'w-1/33 mb-4 [&>input]:text-black',
              state?.errors?.validatedAt && errorClass
            )}
          >
            <Label htmlFor="validatedAt">Validade</Label>
            <Input
              id="validatedAt"
              type="date"
              name="validatedAt"
              defaultValue={data?.validatedAt?.toJSON().slice(0, 10)}
            />
            {state?.errors?.validatedAt && (
              <small>{state?.errors?.validatedAt?.[0]}</small>
            )}
          </div>
          <div
            className={cn(
              'mb-4 w-full [&>input]:text-black',
              state?.errors?.description && errorClass
            )}
          >
            <Label htmlFor="description">Descrição da Propaganda</Label>
            <Input
              id="description"
              type="text"
              name="description"
              defaultValue={data?.description}
            />
            {state?.errors?.description && (
              <small>{state?.errors?.description?.[0]}</small>
            )}
          </div>

          <div
            className={cn(
              'mb-4 w-full [&>input]:text-black',
              state?.errors?.galleryImages && errorClass
            )}
          >
            <Label htmlFor="galleryImages">Imagens</Label>
            <Input
              id="galleryImages"
              type="file"
              name="galleryImages"
              accept="image/*"
              multiple
            />
            {state?.errors?.galleryImages && (
              <small>{state?.errors?.galleryImages?.[0]}</small>
            )}
          </div>

          <div className="mt-4 flex flex-1 justify-end gap-2">
            <SubmitButton>Salvar</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function PageClientDelete({ data }: Form) {
  const { back } = useRouter()
  const [state, formAction] = useFormState(deleteAdvertisementAction, {})

  useEffect(() => {
    if (state.success) back()
  }, [state, back])

  return (
    <Dialog open={true} modal={true}>
      <DialogContent
        className="text-[#616161] [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogClose asChild>
          <CircleX
            onClick={() => back()}
            className="absolute right-4 top-4 z-10 cursor-pointer"
          />
        </DialogClose>
        <DialogHeader className="mb-1">
          <DialogTitle>Deseja realmente remover</DialogTitle>
          <DialogDescription>
            Após a remoção, não será possível recuperar {data?.title}.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="flex flex-row items-center justify-end space-x-2"
        >
          <input type="text" name="id" defaultValue={data?.id} hidden />
          <Button variant={'outline'} type="button" onClick={() => back()}>
            Cancela
          </Button>
          <SubmitButton type="submit" variant={'destructive'} isConfirm>
            Confirmar
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
