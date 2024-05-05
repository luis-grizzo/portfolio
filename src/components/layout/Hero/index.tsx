'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

import type { Random } from 'unsplash-js/dist/methods/photos/types'

import { defaultTransition } from '@/utils/animations'

interface HeroProps {
  image: Random
}

export function Hero({ image }: HeroProps) {
  const { scrollYProgress } = useScroll()

  const MotionImage = motion(Image)

  const yAxis = useTransform(scrollYProgress, [0, 1], [-300, 300])
  const depth = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[75dvh] md:h-[70vh] border-b-1 border-neutral-400/10">
      <figure className="absolute top-0 left-0 w-full h-full opacity-40 overflow-hidden -z-50">
        <MotionImage
          priority
          src={image.urls.full}
          width={image.width}
          height={image.height}
          alt={image.alt_description ?? ''}
          className="w-full h-[calc(100%_+_300px)] object-cover object-center"
          style={{ y: yAxis, scaleX: depth, scaleY: depth }}
          transition={defaultTransition}
        />
      </figure>

      <span className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-base italic py-4 text-neutral-300">
        luisgrizzo.dev
      </span>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center gap-8 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-pretty md:text-balance font-light"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={defaultTransition}
          >
            Hi, i&apos;m a{' '}
            <strong className="font-medium italic">Front-End Developer</strong>{' '}
            & <strong className="font-medium italic">UI-Designer.</strong>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base text-balance text-neutral-300"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ ...defaultTransition, delay: 0.1 }}
          >
            Explore my developed projects and learn a bit about me, while also
            connecting with me on my social media platforms.
          </motion.p>
        </div>
      </div>

      <span className="absolute left-4 bottom-8 text-sm text-neutral-300">
        Image by{' '}
        <a
          href={`https://unsplash.com/@${image.user.username}?utm_source=Unconscious&utm_medium=referral`}
          target="_blank"
          rel="noreferrer"
          className="italic text-blue-400 hover:text-blue-200 transition-colors"
        >
          {image.user.name}
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/?utm_source=Unconscious&utm_medium=referral"
          target="_blank"
          rel="noreferrer"
          className="italic text-blue-400 hover:text-blue-200 transition-colors"
        >
          Unsplash
        </a>
      </span>
    </div>
  )
}
