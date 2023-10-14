'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { useColor } from '@/hooks/useColor'

import { verticalHidden, verticalVisible } from '@/utils/animations'

export const Frame = () => {
  const { color } = useColor()

  return (
    <motion.div
      initial={verticalHidden}
      animate={verticalVisible}
      exit={verticalHidden}
      className={`flex items-end justify-center relative w-full h-72 xsm:h-96 lg:h-full rounded-3xl overflow-hidden before:content-[''] before:bg-${color}-600 before:h-[65%] before:w-full before:rounded-3xl`}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '2%', opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.2 }}
        className="absolute h-full w-max"
      >
        <Image
          priority
          width={2943}
          height={2022}
          className="h-full w-max"
          src="/portrait.png"
          alt="Luís Grizzo's portrait"
        />
      </motion.div>
    </motion.div>
  )
}
