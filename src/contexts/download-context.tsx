'use client'

import React, { createContext, useState } from 'react'

interface DownloadContextProps {
  download: string | null
  setDownload: (download: string) => void
}

const DownloadContext = createContext<DownloadContextProps | undefined>(
  undefined
)

export const DownloadProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [download, setDownload] = useState<string | null>(null)
  return (
    <DownloadContext.Provider value={{ download, setDownload }}>
      {children}
    </DownloadContext.Provider>
  )
}

export const useDownload = () => {
  const context = React.useContext(DownloadContext)
  if (!context) {
    throw new Error(
      'useDownloadContext deve ser usado dentro de um DownloadProvider'
    )
  }
  return context
}
