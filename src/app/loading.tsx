'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'

import { Logo } from '@/components'
import { verticalHidden, verticalVisible } from '@/utils/animations'

export default function Loading() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={verticalHidden}
        animate={verticalVisible}
        className="col-span-full flex items-center justify-center h-full w-full"
      >
        <Logo className="w-32 h-36 animate-pulse" />
      </m.div>
    </LazyMotion>
  )
}
