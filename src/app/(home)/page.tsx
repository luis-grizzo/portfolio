import { Metadata } from 'next'
import Link from 'next/link'

import { Button, Frame } from '@/components'

import { getSocialMedia } from '@/utils/socialMedias'

export const metadata: Metadata = {
  title: 'Luís Grizzo - Frontend engineer | Home'
}

export default function Home() {
  const linkedIn = getSocialMedia('linkedin')

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-[calc(40%_-_0.75rem)_calc(60%_-_0.75rem)] items-center gap-6 w-full min-h-[calc(100vh_-_((8rem_*_2)_+_(3rem_*_2)))] lg:h-4/6">
      <Frame />

      <div className="flex flex-col justify-center gap-6">
        <h1 className="text-5xl xsm:text-6xl lg:text-7xl font-light text-contrast_color_lightTheme dark:text-contrast_color_darkTheme">
          Hi, I&apos;m a <br />
          <strong className="font-bold">Front-End Dev</strong> & <br />
          <strong className="font-bold">UI-Designer</strong>
        </h1>

        <p className="text-xl text-text_color_lightTheme dark:text-text_color_darkTheme">
          My name is{' '}
          <a
            href={linkedIn?.url}
            target="_blank"
            className="text-pink-600 font-bold hover:text-pink-900 transition-colors"
          >
            Luís Grizzo
          </a>
          , and this is my website! In the field since 2019, my passion has
          always been creating interfaces and animations. Welcome, and please
          don&apos;t hesitate to get in touch!
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/portfolio">
            <Button variant="primary">My portfolio</Button>
          </Link>

          <Link href="/about">
            <Button variant="secondary">About me</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
