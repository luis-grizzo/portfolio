'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { horizontalHidden, horizontalVisible } from '@/utils/animations'

interface TextRenderProps {
  texts: TextProps[]
}

interface TextProps {
  id: number
  paragraph: React.ReactElement
}

export const TextRender = ({ texts }: TextRenderProps) => {
  const textContainerRef = useRef<HTMLDivElement>(null)

  const [isFullScrolled, setIsFullScrolled] = useState(false)
  const [isTopScroll, setIsTopScroll] = useState(false)

  const handleScroll = (): void => {
    const offsetHeight = textContainerRef.current?.offsetHeight ?? 0
    const scrollTop = textContainerRef.current?.scrollTop ?? 0
    const scrollHeight = textContainerRef.current?.scrollHeight ?? 0

    scrollTop === 0 ? setIsTopScroll(true) : setIsTopScroll(false)

    offsetHeight + scrollTop >= scrollHeight
      ? setIsFullScrolled(true)
      : setIsFullScrolled(false)
  }

  useEffect(() => {
    handleScroll()

    textContainerRef.current?.addEventListener('scroll', handleScroll)

    return () =>
      textContainerRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex relative h-[40%] overflow-hidden">
      <div
        ref={textContainerRef}
        className="flex flex-col items-start gap-6 overflow-auto overflow-x-hidden h-full w-full pr-2 text-xl text-text_color_lightTheme dark:text-text_color_darkTheme custom-scroll"
      >
        {texts.map((text, index) => (
          <motion.div
            key={text.id}
            initial={horizontalHidden}
            animate={horizontalVisible}
            exit={horizontalHidden}
            transition={{ delay: (index + 1) * 0.1 }}
          >
            {text.paragraph}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isTopScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 h-1/4 w-[calc(100%_-_0.5rem)] bg-gradient-to-b from-background_color_lightTheme to-transparent dark:from-background_color_darkTheme"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isFullScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 h-1/4 w-[calc(100%_-_0.5rem)] bg-gradient-to-t from-background_color_lightTheme to-transparent dark:from-background_color_darkTheme"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
