'use client'

import { motion } from 'framer-motion'

import { defaultTransition } from '@/utils/animations'

export function Footnote() {
  return (
    <div className="flex items-center justify-center h-[40dvh] py-8">
      <motion.h3
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={defaultTransition}
      >
        turning <strong className="font-medium line-through">ideas</strong> into{' '}
        <strong className="font-medium italic">reality!</strong>
      </motion.h3>
    </div>
  )
}
