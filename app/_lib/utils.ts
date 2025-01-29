import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugNormalized(string: string) {
  return string.normalize('NFD').replace(/[-]/g, ' ').toLowerCase()
}

export function slug(string: unknown) {
  if (typeof string !== 'string') return ''
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w-]+/g, '-') // Remove caracteres não alfanuméricos
    .replace(/-+/g, '-') // Remove múltiplos hífens consecutivos

  // Converte para minúsculas
  // return String(string)
  //   .normalize('NFD') // Decompor caracteres acentuados
  //   .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
  //   .trim()
  //   .toLowerCase()
  //   .replace(/\s+/g, '-') // Substituir espaços por hífens
  //   .replace(/[^\w\-]+/g, '') // Remover caracteres não permitidos
  //   .replace(/\-\-+/g, '-') // Substituir múltiplos hífens consecutivos por um único hífen
  //   .replace(/^-+/, '') // Remover hífens do início
  //   .replace(/-+$/, '') // Remover hífens do final
}
