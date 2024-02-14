'use client'

import { Logo } from '@/components'

export default function Loading() {
  return (
    <div className="col-span-full flex items-center justify-center h-full w-full">
      <Logo className="w-32 h-36 animate-pulse" />
    </div>
  )
}
