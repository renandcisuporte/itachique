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
}
