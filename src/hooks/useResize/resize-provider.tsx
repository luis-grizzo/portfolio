'use client'

import { useState, useLayoutEffect } from 'react'

import { ResizeContext } from './use-resize'

type ResizeProviderProps = {
  children: React.ReactNode
}

export const ResizeProvider = ({
  children
}: ResizeProviderProps): React.ReactElement => {
  const [view, setView] = useState<'desktop' | 'mobile'>('mobile')
  const [viewSize, setViewSize] = useState(0)

  const handleResize = (): void => {
    setView(window.innerWidth >= 1024 ? 'desktop' : 'mobile')

    setViewSize(window.innerWidth)
  }

  useLayoutEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <ResizeContext.Provider value={{ view, viewSize }}>
      {children}
    </ResizeContext.Provider>
  )
}
