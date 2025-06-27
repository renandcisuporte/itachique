import Footer from '@/components/footer'
import Header from '@/components/header'
import { NavHeader } from '@/components/nav-header'
import { WeatherForecast } from '@/components/weather-forecast'
import { DownloadProvider } from '@/contexts/download-context'
import Script from 'next/script'
import React, { Suspense } from 'react'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DownloadProvider>
      <WeatherForecast />

      <Header.root>
        <Header.content>
          <div className="basis-full md:basis-1/3" />
          <div className="basis-full md:basis-1/3">
            <Header.logo />
          </div>
          <div className="w-full flex-1 md:w-1/3" />
        </Header.content>
      </Header.root>

      <NavHeader.root>
        <Suspense fallback={<NavHeader.loading />}>
          <NavHeader.nav />
        </Suspense>
      </NavHeader.root>

      {children}

      <Footer.root>
        <Footer.content>
          <Footer.info />
          <Footer.logo />
          <Footer.social />
        </Footer.content>
        <Footer.content>
          <Footer.copyright />
        </Footer.content>
      </Footer.root>

      {/* <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZDL9384FQ8"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZDL9384FQ8');`}
      </Script> */}
    </DownloadProvider>
  )
}
