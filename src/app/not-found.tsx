import { MdKeyboardReturn } from 'react-icons/md'

import { LinkButton } from '@/components'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 md:gap-8 lg:gap-16 h-[calc(100vh_-_114px_-_88px_-_1px)] container mx-auto mt-[114px] py-8 md:py-16 lg:py-32 px-4">
      <h1 className="text-4xl sm:text-5xl">404</h1>

      <p className="text-xl sm:text-2xl text-center text-neutral-400">
        It seems like there&apos;s nothing here!
      </p>

      <LinkButton href="/" target="_self" icon={<MdKeyboardReturn />}>
        Return Home
      </LinkButton>
    </main>
  )
}
