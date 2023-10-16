import { useState, useEffect } from 'react'

import { ResizeContext } from './use-resize'

type ResizeProviderProps = {
  children: React.ReactNode
}

export const ResizeProvider = ({
  children
}: ResizeProviderProps): React.ReactElement => {
  const [isDesktop, setIsDesktop] = useState(false)

  const handleResize = (): void => setIsDesktop(window.innerWidth >= 1024)

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log({ isDesktop })
  }, [isDesktop])

  return (
    <ResizeContext.Provider value={{ isDesktop }}>
      {children}
    </ResizeContext.Provider>
  )
}
