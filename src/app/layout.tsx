import type { Metadata } from 'next'

import { getImage } from '@/services/unsplash'

import { TriggerProvider } from '@/hooks/useTrigger'

import { Navbar, Hero, Footer, LittleSunshine } from '@/components/layout'

import { poppins } from './fonts'

import { dayInSeconds } from '@/constants/time'

import './globals.css'

export const revalidate = dayInSeconds

export const metadata: Metadata = {
  title: 'Luís Grizzo - Front-end engineer',
  description:
    "Hi, I'm a front-end engineer and UI designer. Discover my developed projects and get in touch through my social networks."
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const image = await getImage()

  return (
    <html lang="pt-br" className={`${poppins.className}`}>
      <body className="relative flex flex-col w-full min-h-dvh bg-neutral-950 text-neutral-50">
        <TriggerProvider>
          <Navbar />

          <Hero image={image} />

          {children}

          <Footer />

          <LittleSunshine />
        </TriggerProvider>
      </body>
    </html>
  )
}
