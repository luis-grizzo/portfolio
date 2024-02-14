'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const images = ['/portrait-1.png', '/portrait-2.png', '/portrait-3.png']

export const Frame = () => {
  const [activeItem, setActiveItem] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveItem((prevState) => {
        if (prevState + 1 === images.length) return 0
        else return prevState + 1
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeItem])

  const MotionImage = motion(Image)

  return (
    <div className="flex items-end justify-center relative w-full h-72 xsm:h-80 lg:h-full rounded-3xl overflow-hidden before:content-[''] before:bg-pink-600 before:h-[65%] before:w-full before:rounded-3xl">
      <AnimatePresence mode="wait">
        {images.map(
          (image, index) =>
            activeItem === index && (
              <MotionImage
                key={image}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '2%', opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.2 }}
                priority
                width={3000}
                height={2000}
                className="absolute h-full w-max max-w-max"
                src={image}
                alt="Luís Grizzo's portrait"
              />
            )
        )}
      </AnimatePresence>
    </div>
  )
}
