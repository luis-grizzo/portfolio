'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import { useTrigger } from '@/hooks/useTrigger'

import { defaultTransition } from '@/utils/animations'

import littleSunshine from '@public/little-sunshine.jpg'

export function LittleSunshine() {
  const { isTemporaryOpen } = useTrigger()

  return (
    <AnimatePresence mode="wait">
      {isTemporaryOpen && (
        <motion.div
          key="overlay"
          className="fixed top-0 left-0 w-dvw h-dvh flex items-center justify-center z-50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={defaultTransition}
        >
          <motion.figure
            className="flex flex-col itens-center justify-center gap-4 border-16 border-neutral-50 bg-neutral-50"
            key="photo"
            initial={{ y: '100%', rotate: '90deg' }}
            animate={{ y: '0%', rotate: '6deg' }}
            exit={{ y: '-100%', rotate: '90deg' }}
            transition={defaultTransition}
          >
            <Image
              priority
              src={littleSunshine}
              alt="Photo of my wife Verônica and my newborn son, Caetano."
              className="object-cover object-center w-48 md:w-60 lg:w-72 aspect-square"
            />

            <figcaption className="flex flex-col items-center gap-2 text-sm font-mono text-neutral-950">
              <span className="flex items-center gap-2">
                Verônica & Caetano &lt;3
              </span>

              <span className="flex items-center gap-2">
                My little sunshine!
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
