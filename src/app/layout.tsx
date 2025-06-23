import { helveticaNeue } from '@/fonts'
import React from 'react'
import '../../polyfills'
import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={helveticaNeue.className}>{children}</body>
    </html>
  )
}
