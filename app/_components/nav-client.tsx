'use client'

import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Container } from './common/container'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Nav({ ...rest }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const navRef = useRef<HTMLDivElement>(null)
  const resolveClick = useCallback(() => setOpen(!open), [open])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <Container>
      <MenuIcon
        className="h-12 w-8 cursor-pointer text-white md:hidden"
        onClick={resolveClick}
      />
      <nav
        ref={navRef}
        className={cn(
          'z-10 hidden text-xl md:flex md:justify-evenly md:space-x-2',
          open && 'absolute left-0 top-auto flex w-full flex-col bg-neutral-900'
        )}
        {...rest}
      />
    </Container>
  )
}
