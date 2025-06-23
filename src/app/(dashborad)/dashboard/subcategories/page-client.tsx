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
import { cn } from '@/libs/utils'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { deleteCategoryAction, saveCategoryAction } from './actions'

type Form = {
  data: {
    id?: string
    name?: string
    position?: number
  }
}

export function PageClientForm({ data }: Form) {
  const { back } = useRouter()
  const [state, formAction] = useFormState(saveCategoryAction, {})

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
        <form action={formAction}>
          <input type="hidden" name="id" value={data?.id} />
          <div
            className={cn(
              'mb-4 w-full [&>input]:text-black',
              state?.errors?.name && errorClass
            )}
          >
            <Label htmlFor="name">Categoria</Label>
            <Input
              id="name"
              type="text"
              name="name"
              defaultValue={data?.name}
            />
            {state?.errors?.name && <small>{state?.errors?.name?.[0]}</small>}
          </div>
          <div className="flex justify-end gap-2">
            <SubmitButton>Salvar</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function PageClientDelete({ data }: Form) {
  const { back } = useRouter()
  const [state, formAction] = useFormState(deleteCategoryAction, {})

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
            Após a remoção, não será possível recuperar {data.name}.
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
