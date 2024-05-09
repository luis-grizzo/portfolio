import { MdKeyboardReturn } from 'react-icons/md'

import { LinkButton, Logo } from '@/components/base'

export default function NotFound() {
  return (
    <main className="flex items-center justify-center gap-4 md:gap-8 lg:gap-16 h-[calc(100vh_-_114px_-_84px_-_1px)] container mx-auto mt-[114px] py-8 md:py-16 lg:py-32 px-4">
      <Logo containerClassName="!h-16" />

      <span className="w-px h-32 bg-neutral-400/10" />

      <div className="flex flex-col gap-4 max-w-44 md:max-w-none">
        <h1 className="text-4xl md:text-5xl lg:text-6xl">404</h1>

        <p className="text-base text-neutral-400">
          It seems like there&apos;s nothing here!
        </p>

        <LinkButton href="/" target="_self" icon={<MdKeyboardReturn />}>
          Return Home
        </LinkButton>
      </div>
    </main>
  )
}
