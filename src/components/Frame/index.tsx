'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export const Frame = () => {
  const [activeImage, setActiveImage] = useState(0)

  const images = ['/image1.png', '/image2.png', '/image3.png', '/image4.png']

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveImage((prevState) => {
        if (prevState + 1 === images.length) return 0
        else return prevState + 1
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [activeImage])

  return (
    <div className="flex items-end justify-center relative w-full h-full rounded-3xl overflow-hidden before:content-[''] before:bg-pink-600 before:h-[65%] before:w-full before:rounded-3xl">
      {images.map((image, index) => (
        <Image
          key={image}
          width={1000}
          height={1000}
          className={`absolute h-full w-max max-w-none ${
            index !== activeImage && 'top-[100%]'
          }`}
          src={image}
          alt="Luís Grizzo's portrait"
        />
      ))}
    </div>
  )
}
