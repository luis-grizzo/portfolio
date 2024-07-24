'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoLinkExternal } from 'react-icons/go'

import type { Random } from 'unsplash-js/dist/methods/photos/types'

import { defaultTransition } from '@/utils/animations'

interface HeroProps {
  image: Random
}

export function Hero({ image }: HeroProps) {
  const { scrollYProgress } = useScroll()

  const MotionImage = motion(Image)

  const yAxis = useTransform(scrollYProgress, [0, 1], [-300, 300])
  const depth = useTransform(scrollYProgress, [0, 1], [1.2, 1])

  return (
    <header className="relative flex flex-col items-center justify-center w-full h-[75vh] md:h-[70vh] lg:h-[65vh]  border-b-1 border-neutral-400/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center gap-4 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <motion.h1
            className="text-4xl sm:text-5xl text-pretty"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={defaultTransition}
          >
            Hi, i&apos;m a Front-end Developer.
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-pretty text-neutral-300"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            Welcome to my portfolio, explore my projects and get in touch!
          </motion.p>
        </div>
      </div>

      <span className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-base py-4 text-neutral-300">
        luisgrizzo.dev
      </span>

      <figure className="absolute top-0 left-0 w-full h-full opacity-30 overflow-hidden -z-50">
        <MotionImage
          priority
          src={image.urls.full}
          width={image.width}
          height={image.height}
          alt={image.alt_description ?? 'Generic background image'}
          className="w-full h-[calc(100%_+_300px)] object-cover object-center"
          style={{ y: yAxis, scaleX: depth, scaleY: depth }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={defaultTransition}
        />
      </figure>

      <span className="absolute bottom-8 flex items-center justify-center gap-1.5 w-full px-4 text-xs text-center text-pretty text-neutral-400">
        {'Photo by'}
        <a
          href={`https://unsplash.com/@${image.user.username}?utm_source=Unconscious&utm_medium=referral`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-200 transition-colors"
        >
          {image.user.name}

          <GoLinkExternal className="h-3 w-3" />
        </a>
        {'on'}
        <a
          href="https://unsplash.com/?utm_source=Unconscious&utm_medium=referral"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-200 transition-colors"
        >
          Unsplash
          <GoLinkExternal className="h-3 w-3" />
        </a>
      </span>
    </header>
  )
}
