import { DetailedHTMLProps, HTMLAttributes, LiHTMLAttributes } from 'react'
import { Link } from './nav-link'

const Content = ({
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul className="sticky top-0 flex flex-col gap-4 p-4" {...rest} />
)

const Item = ({
  ...rest
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
  <li className="flex flex-col gap-4 p-4" {...rest} />
)

export const Nav = {
  content: Content,
  link: Link,
  item: Item
}
