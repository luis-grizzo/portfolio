'use client'

import { useEffect } from 'react'
import { MdKeyboardReturn } from 'react-icons/md'

import { Button } from '@/components'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center gap-4 md:gap-8 lg:gap-16 h-[calc(100vh_-_114px_-_88px_-_1px)] container mx-auto mt-[114px] py-8 md:py-16 lg:py-32 px-4">
      <h1 className="text-4xl sm:text-5xl">Error</h1>

      <p className="text-xl sm:text-2xl text-center text-neutral-400">
        Something went wrong!
      </p>

      <Button icon={<MdKeyboardReturn />} onClick={reset}>
        Retry
      </Button>
    </main>
  )
}
