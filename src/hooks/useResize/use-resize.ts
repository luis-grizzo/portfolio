'use client'

import { createContext, useContext } from 'react'

type UseResizeData = {
  view: 'desktop' | 'mobile'
  viewSize: number
}

export const ResizeContext = createContext<UseResizeData | undefined>(undefined)

export const useResize = (): UseResizeData => {
  const context = useContext(ResizeContext)

  if (!context)
    throw new Error(
      'useResize can only be called inside of a WatcherProvider component'
    )

  return context
}
