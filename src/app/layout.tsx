import { Suspense } from 'react'
import type { Metadata } from 'next'

import Loading from './loading'
import { poppins } from './fonts'

import { TriggerProvider } from '@/hooks/useTrigger'

import { Navbar, Footer, LittleSunshine } from '@/components/layout'

import { hourInSeconds } from '@/constants/time'

import './globals.css'

export const revalidate = hourInSeconds

export const metadata: Metadata = {
  metadataBase: new URL('https://luisgrizzo.dev'),
  title: 'Luís Grizzo - Software Engineer',
  description:
    "Hi, I'm Luís Grizzo a Software Engineer. Discover my github projects and get in touch through my social medias.",
  themeColor: '#0a0a0a',
  openGraph: {
    title: 'Luís Grizzo - Software Engineer',
    description: 'Turning ideas into reality!',
    url: new URL('https://luisgrizzo.dev')
  },
  twitter: {
    title: 'Luís Grizzo - Software Engineer',
    description: 'Turning ideas into reality!'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={`${poppins.className}`}>
      <body className="relative flex flex-col w-full min-h-dvh bg-neutral-950 text-neutral-50">
        <TriggerProvider>
          <Navbar />

          <Suspense fallback={<Loading />}>{children}</Suspense>

          <Footer />

          <LittleSunshine />
        </TriggerProvider>
      </body>
    </html>
  )
}
