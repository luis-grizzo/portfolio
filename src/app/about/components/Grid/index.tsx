'use client'

import { cloneElement, useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useColor } from '@/hooks/useColor'

import { verticalHidden, verticalVisible } from '@/utils/animations'
import { techs } from '@/utils/techs'

export const Grid = (): React.ReactElement => {
  const gridRef = useRef<HTMLDivElement>(null)

  const { color } = useColor()

  const [isFullLeftScroll, setIsFullLeftScroll] = useState(false)
  const [isFullRightScroll, setIsFullRightScroll] = useState(false)

  const handleScroll = (): void => {
    const offsetWidth = gridRef.current?.offsetWidth ?? 0
    const scrollLeft = gridRef.current?.scrollLeft ?? 0
    const scrollWidth = gridRef.current?.scrollWidth ?? 0

    scrollLeft === 0 ? setIsFullLeftScroll(true) : setIsFullLeftScroll(false)

    offsetWidth + scrollLeft >= scrollWidth
      ? setIsFullRightScroll(true)
      : setIsFullRightScroll(false)
  }

  useEffect(() => {
    handleScroll()

    gridRef.current?.addEventListener('scroll', handleScroll)

    return () => gridRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex relative h-full w-full overflow-hidden">
      <div
        ref={gridRef}
        className="grid grid-cols-[repeat(12,_auto)] lg:grid-cols-[1fr_1fr_1fr] auto-rows-[1fr] gap-6 w-full h-full overflow-y-hidden"
      >
        {techs.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={verticalHidden}
            animate={verticalVisible}
            exit={verticalHidden}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-center w-40 aspect-square lg:aspect-auto lg:w-full rounded-[1.25rem] text-contrast_color_lightTheme dark:text-contrast_color_darkTheme bg-shape_color_lightTheme dark:bg-shape_color_darkTheme hover:bg-${color}-600 transition-colors`}
          >
            {cloneElement(tech.icon, {
              size: 60,
              className: 'gi__icon'
            })}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {!isFullLeftScroll && (
          <motion.div
            key="left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 h-full w-1/6 bg-gradient-to-r from-background_color_lightTheme dark:from-background_color_darkTheme"
          />
        )}

        {!isFullRightScroll && (
          <motion.div
            key="right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 right-0 h-full w-1/6 bg-gradient-to-l from-background_color_lightTheme dark:from-background_color_darkTheme"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
