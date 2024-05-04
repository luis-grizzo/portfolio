'use client'

import { motion } from 'framer-motion'

import { defaultTransition } from '@/utils/animations'

export function Footnote() {
  return (
    <div className="flex items-center justify-center h-[40dvh]">
      <motion.h3
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={defaultTransition}
      >
        turning ideas into{' '}
        <strong className="font-medium italic">reality!</strong>
      </motion.h3>
    </div>
  )
}
