import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { ResizeProvider } from '@/hooks/useResize'

import Loading from './loading'
import RootLayoutClient from './client'

import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend developer',
  description:
    "Luís Grizzo is an experienced frontend developer with a solid track record since 2019. Specialized in leading-edge technologies, he is dedicated to creating high-quality products in every front-end development project. If you are looking for a professional committed to quality, don't hesitate to contact Luís Grizzo, the front-end engineering expert who can turn your digital ideas into reality",
  themeColor: '#db2777'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex flex-col gap-12 lg:gap-0 w-[90vw] lg:h-screen max-w-screen-xl lg:max-h-screen mx-auto lg:overflow-hidden bg-background_color_lightTheme dark:bg-background_color_darkTheme`}
      >
        <ResizeProvider>
          <Suspense fallback={<Loading />}>
            <RootLayoutClient>{children}</RootLayoutClient>
          </Suspense>
        </ResizeProvider>
      </body>
    </html>
  )
}
