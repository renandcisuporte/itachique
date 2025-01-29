import React from 'react'
import '../polyfills'
import { helveticaNeue } from './_font/fonts'
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
