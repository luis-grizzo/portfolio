'use client'

import { useEffect, useState } from 'react'

import { TriggerContext } from './use-trigger'

import { fiveSecondsInMilliseconds } from '@/constants/timeMarks'

type TriggerProviderProps = {
  children: React.ReactNode
}

export const TriggerProvider = ({
  children
}: TriggerProviderProps): React.ReactElement => {
  const [isTemporaryOpen, setIsTemporaryOpen] = useState(false)

  useEffect(() => {
    if (isTemporaryOpen) {
      setTimeout(() => {
        setIsTemporaryOpen(false)
      }, fiveSecondsInMilliseconds)
    }
  }, [isTemporaryOpen])

  return (
    <TriggerContext.Provider value={{ isTemporaryOpen, setIsTemporaryOpen }}>
      {children}
    </TriggerContext.Provider>
  )
}
