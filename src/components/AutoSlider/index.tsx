'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { timeUnits } from '@/constants/timeUnits'

import { defaultTransition } from '@/utils/animations'

interface AutoSliderProps {
  children: React.ReactNode
}

type FullScrollTypes = 'left' | 'right' | null

export function AutoSlider({ children }: AutoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [fullScrolled, setFullScrolled] = useState<FullScrollTypes>('left')

  function handleScroll() {
    const { current: container } = containerRef
    const { current: content } = contentRef

    if (container && content) {
      let value!: FullScrollTypes

      if (container.scrollLeft === 0) value = 'left'
      else if (
        container.scrollLeft ===
        content.clientWidth - container.clientWidth
      )
        value = 'right'
      else value = null

      setFullScrolled(value)
    }
  }

  function handleAnimation() {
    const { current: container } = containerRef
    const { current: content } = contentRef

    if (container && content) {
      let destination!: number

      if (container.scrollLeft === 0)
        destination = content.clientWidth - container.clientWidth
      else destination = 0

      container.scrollTo({
        left: destination,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const { current: container } = containerRef

    if (container) container.addEventListener('scroll', handleScroll)

    const timer = setInterval(handleAnimation, timeUnits.second * 3)

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)

      clearInterval(timer)
    }
  }, [])

  return (
    <div className="relative w-full">
      <AnimatePresence mode="popLayout">
        {fullScrolled !== 'left' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={defaultTransition}
            key="left"
            data-testid="left-fade"
            className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-neutral-950 z-50"
          />
        )}

        {fullScrolled !== 'right' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={defaultTransition}
            key="right"
            data-testid="right-fade"
            className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-neutral-950 z-50"
          />
        )}
      </AnimatePresence>

      <div ref={containerRef} role="tabpanel" className="overflow-hidden -z-50">
        <div
          ref={contentRef}
          role="tablist"
          className="flex items-center gap-4 w-min"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
