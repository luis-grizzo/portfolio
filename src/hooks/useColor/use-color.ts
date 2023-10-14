'use client'

import { createContext, useContext } from 'react'

type UseColorData = {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const ColorContext = createContext<UseColorData | undefined>(undefined)

export const useColor = (): UseColorData => {
  const context = useContext(ColorContext)

  if (!context)
    throw new Error(
      'useColor can only be called inside of a ColorProvider component'
    )

  return context
}
