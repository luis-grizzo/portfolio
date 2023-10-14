'use client'

import { useState, useEffect } from 'react'

import { getRandomColor } from '@/utils/colors'

import { ColorContext } from './use-color'

type ColorProviderProps = {
  children: React.ReactNode
}

export const ColorProvider = ({
  children
}: ColorProviderProps): React.ReactElement => {
  const [color, setColor] = useState(getRandomColor())

  useEffect(() => {
    console.log({ color })
  }, [color])

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}
