import { Suspense } from 'react'
import type { Metadata } from 'next'

import { getImage } from '@/services/unsplash'

import { Navbar, Hero, Footer } from '@/components/layout'

import Loading from './loading'
import { poppins } from './fonts'

import { dayInSeconds } from '@/constants/time'

import './globals.css'

export const revalidate = dayInSeconds

export const metadata: Metadata = {
  title: 'Luís Grizzo - Desenvolvedor front-end',
  description:
    'Olá, meu nome é Luís Grizzo, conheça meu site, meus trabalhos e se conecte comigo em minhas redes sociais!'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const image = await getImage()

  return (
    <html lang="pt-br" className={`${poppins.className}`}>
      <body className="relative flex flex-col w-full min-h-dvh bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 overflow-x-hidden">
        <Navbar />

        <Hero image={image} />

        <Suspense fallback={<Loading />}>{children}</Suspense>

        <Footer />
      </body>
    </html>
  )
}
