'use client'

import { motion } from 'framer-motion'

import { defaultTransition } from '@/utils/animations'

export function Footnote() {
  return (
    <div className="flex items-center justify-center h-[40dvh] py-8">
      <motion.h3
        className="text-4xl sm:text-5xl text-pretty text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={defaultTransition}
      >
        Turning <span className="line-through">ideas</span> into{' '}
        <span className="italic">reality!</span>
      </motion.h3>
    </div>
  )
}
