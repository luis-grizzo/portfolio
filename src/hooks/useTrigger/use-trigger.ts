'use client'

import { createContext, useContext } from 'react'

type UseTriggerData = {
  isTemporaryOpen: boolean
  setIsTemporaryOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TriggerContext = createContext<UseTriggerData | undefined>(
  undefined
)

export const useTrigger = (): UseTriggerData => {
  const context = useContext(TriggerContext)

  if (!context)
    throw new Error(
      'useTrigger can only be called inside of a useTrigger component'
    )

  return context
}
