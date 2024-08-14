import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'

import Loading from './loading'
import { poppins } from './fonts'

import { TriggerProvider } from '@/hooks/useTrigger'

import { Navbar, Footer, LittleSunshine } from '@/components'

import { timeUnits } from '@/constants/timeUnits'

import './globals.css'

export const revalidate = timeUnits.hour / 1_000 // hour in seconds

export const metadata: Metadata = {
  metadataBase: new URL('https://luisgrizzo.dev'),
  title: 'Luís Grizzo - Front-end Developer',
  description:
    "Hi, I'm Luís Grizzo a Front-end Developer. Discover my github projects and get in touch through my social medias.",
  openGraph: {
    title: 'Luís Grizzo - Front-end Developer',
    description: 'Turning ideas into reality!',
    url: new URL('https://luisgrizzo.dev'),
    siteName: 'Luís Grizzo'
  },
  twitter: {
    title: 'Luís Grizzo - Front-end Developer',
    description: 'Turning ideas into reality!'
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
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
