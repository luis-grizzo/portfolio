'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

import { defaultTransition } from '@/utils/animations'

import type { Random } from 'unsplash-js/dist/methods/photos/types'

interface HeroProps {
  image: Random
}

export function Hero({ image }: HeroProps) {
  const { scrollYProgress } = useScroll()

  const MotionImage = motion(Image)

  const yAxis = useTransform(scrollYProgress, [0, 1], [-300, 300])
  const depth = useTransform(scrollYProgress, [0, 1], [1.2, 1])

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[75dvh] md:h-[70vh] border-b-1 border-neutral-400/10">
      <figure className="absolute top-0 left-0 w-full h-full opacity-40 overflow-hidden -z-50">
        <MotionImage
          priority
          src={image.urls.raw}
          width={image.width}
          height={image.height}
          alt={image.alt_description ?? ''}
          className="w-full h-[calc(100%_+_300px)] object-cover object-center"
          style={{ y: yAxis, scaleX: depth, scaleY: depth }}
          transition={defaultTransition}
        />
      </figure>

      <span className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-base italic py-4 text-neutral-400">
        luisgrizzo.dev
      </span>

      <div className="flex flex-col justify-center gap-8 container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-pretty font-light"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={defaultTransition}
        >
          Hi, i&apos;m a{' '}
          <strong className="font-medium italic">Front-end Engineer</strong> &{' '}
          <strong className="font-medium italic">UI-Designer.</strong>
        </motion.h1>
      </div>

      <span className="absolute left-8 bottom-8 text-sm text-neutral-400">
        Image by{' '}
        <a
          href={`https://unsplash.com/@${image.user.username}?utm_source=Unconscious&utm_medium=referral`}
          target="_blank"
          rel="noreferrer"
          className="italic text-blue-400 hover:text-blue-600 transition-colors"
        >
          {image.user.name}
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/?utm_source=Unconscious&utm_medium=referral"
          target="_blank"
          rel="noreferrer"
          className="italic text-blue-400 hover:text-blue-600 transition-colors"
        >
          Unsplash
        </a>
      </span>
    </div>
  )
}
